import subprocess
from pydub import AudioSegment
import os


def process_audio(
    input_path_dir, input_path1, input_path2, ms_start=0, retain_sound=True
):
    sound1 = AudioSegment.from_file(input_path1, format="wav")
    sound2 = AudioSegment.from_file(input_path2, format="wav")

    if retain_sound:
        quieter = sound1 - 9  # thuyết minh
    else:
        quieter = sound1 - 1  # lồng tiếng

    output_path = os.path.splitext(input_path_dir)[0] + "_audiodescribed.wav"
    overlay = quieter.overlay(sound2, position=ms_start)
    overlay.export(output_path, format="wav")
    return output_path


def merge_video_and_audio(video_path, audio_path):
    output_path = os.path.splitext(video_path)[0] + "_audiodescribed.mp4"
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            video_path,
            "-i",
            audio_path,
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "libx264",
            "-c:a",
            "aac",
            output_path,
        ],
        check=True,
        timeout=1800,
    )
    return output_path
