import os
from typing import Iterator, TextIO
from moviepy.editor import VideoFileClip

def read_video_info(filename):
    """
    Lấy thông tin của video theo đường dẫn filename.
    Return tuple (dung_luong, thoi_gian) dưới dạng chuỗi str.
    """

    if os.path.exists(filename):
        clip = VideoFileClip(filename)
        duration = clip.duration
        size = os.stat(filename).st_size / 1024 # Chuyển từ byte sang KB
        return str(int(size)), str(duration)
    else:
        print("Không tìm thấy file!")

def str2bool(string):
    string = string.lower()
    str2val = {"true": True, "false": False}

    if string in str2val:
        return str2val[string]
    else:
        raise ValueError(
            f"Expected one of {set(str2val.keys())}, got {string}")


def format_timestamp(seconds: float, always_include_hours: bool = False):
    assert seconds >= 0, "non-negative timestamp expected"
    milliseconds = round(seconds * 1000.0)

    hours = milliseconds // 3_600_000
    milliseconds -= hours * 3_600_000

    minutes = milliseconds // 60_000
    milliseconds -= minutes * 60_000

    seconds = milliseconds // 1_000
    milliseconds -= seconds * 1_000

    hours_marker = f"{hours:02d}:" if always_include_hours or hours > 0 else ""
    return f"{hours_marker}{minutes:02d}:{seconds:02d},{milliseconds:03d}"


def write_srt(transcript: Iterator[dict], file: TextIO):
    for i, segment in enumerate(transcript, start=1):
        print(
            f"{i}\n"
            f"{format_timestamp(segment['start'], always_include_hours=True)} --> "
            f"{format_timestamp(segment['end'], always_include_hours=True)}\n"
            f"{segment['text'].strip().replace('-->', '->')}\n",
            file=file,
            flush=True,
        )


def filename(path):
    return os.path.splitext(os.path.basename(path))[0]


def mp4_to_wav(filename):
    base_path, file_name = os.path.split(filename)
    name = os.path.splitext(file_name)[0]
    output = os.path.join(base_path, f"{name}.wav")
    
    os.system(f'ffmpeg -i {filename} -ar 44100 {output}')
    
    return output


def noise_deepfilternet(file):
    base_path, file_name = os.path.split(file)
    print('base_path')
    print(base_path)
    print('file_name')
    print(file_name)
    name = os.path.splitext(file_name)[0]
    print('name')
    print(name)
    output = os.path.join(base_path, f"{name}_DeepFilterNet3.wav")
    os.system('deepFilter {} -o {}'.format(file, base_path))
    print("Đã giảm tiếng ồn DeepFilterNet")
    print('')
    return output