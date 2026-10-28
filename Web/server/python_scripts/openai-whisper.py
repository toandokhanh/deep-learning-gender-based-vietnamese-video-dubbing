from security import youtube_url


from security import youtube_url


import os
from datetime import datetime
import ffmpeg
import whisper
import argparse
import warnings
import tempfile
import utils.translate_srt as translate_srt
import utils.overlay_audio_on_video as overlay_audio_on_video
import utils.gender_labeling as gender_labeling
import utils.SRTToWAV as SRTToWAV
import utils.createVideoOutput as createVideoOutput
from utils.srtToTxt import srt_to_txt_v2
from utils.removeSpeech import removeSpeech
from utils.utils import (
    filename,
    str2bool,
    write_srt,
    mp4_to_wav,
    noise_deepfilternet,
    read_video_info,
)
from yt_dlp import YoutubeDL
from security import youtube_url
import json
from time import gmtime, strftime
import logging

logging.basicConfig(
    filename="logfile.log", level=logging.ERROR, format="%(asctime)s - %(message)s"
)


def main():
    parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument(
        "video", nargs="+", type=str, help="paths to video files to transcribe"
    )
    parser.add_argument(
        "-r", "--rate", type=int, default=10, help="Rate for speech (default: 0)"
    )
    parser.add_argument(
        "-v", "--volume", type=int, default=50, help="Volume for speech (default: 50)"
    )
    parser.add_argument(
        "-ms",
        "--ms_start",
        type=int,
        default=0,
        help="Start time in milliseconds for overlaying the audio on the video.",
    )
    parser.add_argument(
        "-noise",
        "--algorithm_noise",
        type=str2bool,
        default=False,
        help="Chọn thuật toán giảm nhiễu",
    )
    parser.add_argument(
        "--model",
        default="small",
        choices=whisper.available_models(),
        help="name of the Whisper model to use",
    )
    parser.add_argument(
        "--output_dir",
        "-o",
        type=str,
        default=".",
        help="directory to save the outputs",
    )
    parser.add_argument(
        "--output_srt",
        type=str2bool,
        default=False,
        help="whether to output the .srt file along with the video files",
    )
    parser.add_argument(
        "--srt_only",
        type=str2bool,
        default=True,
        help="only generate the .srt file and not create overlayed video",
    )
    parser.add_argument(
        "--subtitle_vi",
        type=str2bool,
        default=True,
        help="create videos with Vietnamese subtitles?",
    )
    parser.add_argument(
        "--ad_subtitle_en",
        type=str2bool,
        default=False,
        help="Create a voice-over video with English subtitles?",
    )
    parser.add_argument(
        "--retain_sound", type=str2bool, default=True, help="retain the original sound"
    )
    parser.add_argument(
        "--verbose",
        type=str2bool,
        default=False,
        help="whether to print out the progress and debug messages",
    )
    parser.add_argument(
        "--gender",
        type=str,
        default="auto",
        choices=["auto", "female", "male"],
        help="Gender recognition for Text To Speech model",
    )
    parser.add_argument(
        "--task",
        type=str,
        default="transcribe",
        choices=["transcribe", "translate"],
        help="whether to perform X->X speech recognition ('transcribe') or X->English translation ('translate')",
    )
    parser.add_argument(
        "--l_in",
        type=str,
        default="auto",
        choices=[
            "auto",
            "af",
            "am",
            "ar",
            "as",
            "az",
            "ba",
            "be",
            "bg",
            "bn",
            "bo",
            "br",
            "bs",
            "ca",
            "cs",
            "cy",
            "da",
            "de",
            "el",
            "en",
            "es",
            "et",
            "eu",
            "fa",
            "fi",
            "fo",
            "fr",
            "gl",
            "gu",
            "ha",
            "haw",
            "he",
            "hi",
            "hr",
            "ht",
            "hu",
            "hy",
            "id",
            "is",
            "it",
            "ja",
            "jw",
            "ka",
            "kk",
            "km",
            "kn",
            "ko",
            "la",
            "lb",
            "ln",
            "lo",
            "lt",
            "lv",
            "mg",
            "mi",
            "mk",
            "ml",
            "mn",
            "mr",
            "ms",
            "mt",
            "my",
            "ne",
            "nl",
            "nn",
            "no",
            "oc",
            "pa",
            "pl",
            "ps",
            "pt",
            "ro",
            "ru",
            "sa",
            "sd",
            "si",
            "sk",
            "sl",
            "sn",
            "so",
            "sq",
            "sr",
            "su",
            "sv",
            "sw",
            "ta",
            "te",
            "tg",
            "th",
            "tk",
            "tl",
            "tr",
            "tt",
            "uk",
            "ur",
            "uz",
            "vi",
            "yi",
            "yo",
            "zh",
        ],
        help="What is the origin language of the video? If unset, it is detected automatically.",
    )

    time_text = str(strftime("%Y%m%d_%H%M%S", gmtime()))
    start_time = datetime.now()
    args = parser.parse_args().__dict__
    path = args.pop("video")
    input_arg = path[0]
    model_name: str = args.pop("model")
    output_dir: str = args.pop("output_dir")
    output_srt: bool = args.pop("output_srt")
    srt_only: bool = args.pop("srt_only")
    subtitle_vi: bool = args.pop("subtitle_vi")
    ad_subtitle_en: bool = args.pop("ad_subtitle_en")
    algorithm_noise: bool = args.pop("algorithm_noise")
    retain_sound: bool = args.pop("retain_sound")
    language: str = args.pop("l_in")
    gender: str = args.pop("gender")
    rate: int = args.pop("rate")
    volume: int = args.pop("volume")
    ms_start: int = args.pop("ms_start")
    os.makedirs(output_dir, exist_ok=True)

    logging.error(
        "Command: python3 openai-whisper.py %s --l_in %s -r %d -v %d --ad_subtitle_en %r --retain_sound %r -noise %r --gender %s",
        path,
        language,
        rate,
        volume,
        ad_subtitle_en,
        retain_sound,
        algorithm_noise,
        gender,
    )
    if input_arg.startswith("https://www.youtube.com"):
        video_path = download_youtube_video(input_arg, "../public/videos")
        path[0] = video_path
        input_arg = video_path
    root_path = os.path.dirname(input_arg) + "/"
    output_dir = root_path

    if model_name.endswith(".en"):
        warnings.warn(
            f"{model_name} is an English-only model, forcing English detection."
        )
        args["language"] = "en"
    elif language != "auto":
        args["language"] = language

    path_wav = mp4_to_wav(input_arg)
    if algorithm_noise:
        path_wav_handled = noise_deepfilternet(path_wav)
    else:
        path_wav_handled = path_wav

    model = whisper.load_model(model_name)
    audios = {input_arg: path_wav_handled}
    srt_path = get_subtitles(
        audios,
        output_srt or srt_only,
        output_dir,
        lambda audio_path: model.transcribe(audio_path, **args),
    )

    if srt_only:
        path_txt = srt_to_txt_v2(srt_path)
        path_srt_translated = translate_srt.translate_and_save_srt(srt_path)
        if gender == "auto":
            srt_labeled = gender_labeling.split_and_predict(
                path_srt_translated, path_wav_handled
            )
        if gender == "female":
            srt_labeled = gender_labeling.label_srt_file(path_srt_translated, "(0)")
        if gender == "male":
            srt_labeled = gender_labeling.label_srt_file(path_srt_translated, "(1)")

        captions = SRTToWAV.process_srt(srt_labeled)
        output_audio_path = SRTToWAV.text_to_speech(captions, srt_labeled, rate, volume)
        if retain_sound:
            audiodescribed_wav_path = overlay_audio_on_video.process_audio(
                path_wav, path_wav, output_audio_path, ms_start, retain_sound
            )
        else:
            audio_removed_speech = removeSpeech(path_wav)
            audiodescribed_wav_path = overlay_audio_on_video.process_audio(
                path_wav,
                audio_removed_speech,
                output_audio_path,
                ms_start,
                retain_sound,
            )

        audiodescribed_video_path = overlay_audio_on_video.merge_video_and_audio(
            input_arg, audiodescribed_wav_path
        )
        ad_subtitle_video_path = None
        if ad_subtitle_en:
            ad_subtitle_video_path = createVideoOutput.createAudiodescribed(
                audiodescribed_video_path, srt_path
            )
        if subtitle_vi:
            subtitle_video_path = createVideoOutput.createSubtitle(
                input_arg, path_srt_translated
            )
        capacity, time = read_video_info(input_arg)
        end_time = datetime.now()
        time_difference = end_time - start_time
        seconds = time_difference.total_seconds()
        result = {
            "date_time": time_text,
            "path_video": input_arg,
            "capacity": capacity,
            "time": time,
            "sourceLanguage": language,
            "audio_original": path_wav,
            "srt_original": srt_path,
            "audio_filtered": path_wav_handled,
            "srt_translated": path_srt_translated,
            "srt_labeled": srt_labeled,
            "audio_described": output_audio_path,
            "audio_overlay_described": audiodescribed_wav_path,
            "videoSubtitle": subtitle_video_path,
            "video_explanation": audiodescribed_video_path,
            "video_explanation_sub": ad_subtitle_video_path,
            "execution_time": str(seconds),
        }
        logging.error("Result: %s", result)
        return result


def get_audio(paths):
    temp_dir = tempfile.gettempdir()

    audio_paths = {}

    for path in paths:
        output_path = os.path.join(temp_dir, f"{filename(path)}.wav")

        ffmpeg.input(path).output(output_path, acodec="pcm_s16le", ac=1, ar="16k").run(
            quiet=True, overwrite_output=True
        )

        audio_paths[path] = output_path

    return audio_paths


def get_subtitles(
    audio_paths: list, output_srt: bool, output_dir: str, transcribe: callable
):
    subtitles_path = {}

    for path, audio_path in audio_paths.items():
        srt_path = output_dir if output_srt else tempfile.gettempdir()
        srt_path = os.path.join(srt_path, f"{filename(path)}.srt")
        warnings.filterwarnings("ignore")
        result = transcribe(audio_path)
        warnings.filterwarnings("default")

        with open(srt_path, "w", encoding="utf-8") as srt:
            write_srt(result["segments"], file=srt)

        subtitles_path[path] = srt_path
    return srt_path


def download_youtube_video(url, path):
    url = youtube_url(url)
    os.makedirs(path, exist_ok=True)
    options = {
        "format": "best[ext=mp4]",
        "noplaylist": True,
        "outtmpl": os.path.join(path, "%(id)s.%(ext)s"),
        "socket_timeout": 30,
        "retries": 2,
        "quiet": True,
    }
    with YoutubeDL(options) as downloader:
        info = downloader.extract_info(url, download=True)
        return downloader.prepare_filename(info)


if __name__ == "__main__":
    result = main()
    print(json.dumps(result, indent=4))
