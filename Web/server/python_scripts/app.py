from pathlib import Path
import subprocess
import threading
from flask import Flask, request, jsonify
from security import (
    authorized,
    load_env,
    filename,
    language,
    choice,
    media_path,
    run_script,
)

HERE = Path(__file__).resolve().parent
load_env(HERE.parent / ".env")
app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 1024 * 1024
job_lock = threading.Lock()


@app.before_request
def authenticate_worker():
    if not authorized(request.headers.get("X-Service-Token")):
        return jsonify(error="Worker authentication required"), 401


@app.errorhandler(ValueError)
def invalid_input(error):
    return jsonify(error=str(error)), 400


@app.errorhandler(subprocess.SubprocessError)
def processing_failed(error):
    app.logger.warning("Media processing failed (%s)", type(error).__name__)
    return jsonify(error="Media processing failed"), 502


@app.errorhandler(OSError)
def file_error(error):
    return jsonify(error="Media file is unavailable"), 400


from security import youtube_url
import json


@app.post("/api/createSubtitleV1")
def subtitle():
    data = request.get_json() or {}
    kind = choice(data.get("type"), {"google-cloud", "openai-whisper"})
    video = data.get("video")
    if not isinstance(video, str):
        raise ValueError("Invalid video")
    if video.startswith("https://"):
        source = youtube_url(video)
    else:
        video = filename(video)
        if not media_path(HERE.parent / "public/videos", video, ".mp4").is_file():
            raise ValueError("Video not found")
        source = "../public/videos/" + video
    args = [source, "--l_in", language(data.get("sourceLanguage", "auto"))]
    for field, flag in [("rate", "-r"), ("volume", "-v")]:
        value = str(data.get(field, "auto"))
        if value != "auto" and (not value.isdigit() or not 0 <= int(value) <= 200):
            raise ValueError("Invalid voice option")
        args += [flag, value]
    args += ["--gender", choice(data.get("gender", "auto"), {"auto", "male", "female"})]
    for field, flag in [
        ("noise", "-noise"),
        ("adSubtitle", "--ad_subtitle_en"),
        ("retainSound", "--retain_sound"),
    ]:
        value = data.get(field, False)
        if not isinstance(value, bool):
            raise ValueError("Invalid boolean processing option")
        args += [flag + "=" + str(value)]
    if not job_lock.acquire(blocking=False):
        return jsonify(error="Worker is busy"), 429
    try:
        output = run_script(HERE, kind + ".py", args)
        decoder = json.JSONDecoder()
        for pos, char in enumerate(output):
            if char == "{":
                try:
                    value, _ = decoder.raw_decode(output[pos:])
                    if isinstance(value, dict) and "date_time" in value:
                        return jsonify(value)
                except ValueError:
                    pass
        raise ValueError("Unexpected worker result")
    finally:
        job_lock.release()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=6000)
