import os
import re
import subprocess
from pydub import AudioSegment
from datetime import datetime

# Hàm để chuyển đổi thời gian từ string sang milliseconds
def time_to_milliseconds(time_str):
    datetime_obj = datetime.strptime(time_str, '%H:%M:%S,%f')
    return (datetime_obj.hour * 3600 + datetime_obj.minute * 60 + datetime_obj.second) * 1000 + datetime_obj.microsecond // 1000

# Hàm để xử lý file SRT
def process_srt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    subtitles = []
    for line in lines:
        if '-->' in line:
            times = re.findall(r'\d{2}:\d{2}:\d{2},\d{3}', line)
            start_time = time_to_milliseconds(times[0])
            end_time = time_to_milliseconds(times[1])
        elif line.strip().isdigit() or not line.strip():
            continue
        else:
            voice_label = line[1]
            text = line[3:].strip()
            voice = 'vi-VN-NamMinhNeural' if voice_label == '1' else 'vi-VN-HoaiMyNeural'
            subtitles.append((start_time, end_time, text, voice))

    return subtitles

# Hàm để chuyển đổi text sang speech và kết hợp thành một file âm thanh duy nhất
def text_to_speech(subtitles, input_file, rate=10, volume=50):
    output_file = os.path.splitext(input_file)[0] + '_output'  # Tạo tên file đầu ra dựa trên tên file đầu vào
    combined_audio = AudioSegment.silent(duration=0)
    for start_time, end_time, text, voice in subtitles:
        edge_tts_command = [
            "edge-tts",
            "--voice", voice,
            "--text", text,
            "--rate", f"+{str(rate)}%",
            "--volume", f"+{str(volume)}%",
            "--write-media", "temp.mp3",
        ]
        subprocess.run(edge_tts_command, capture_output=True, text=True, shell=False)
        audio = AudioSegment.from_mp3("temp.mp3")
        
        # Thêm âm thanh vào vị trí thích hợp
        silence_duration = start_time - len(combined_audio)
        if silence_duration > 0:
            combined_audio += AudioSegment.silent(duration=silence_duration)
        combined_audio += audio

    combined_audio.export(output_file+'.wav', format='wav')

    if os.path.exists("temp.mp3"):
        os.remove("temp.mp3")  
    return output_file+'.wav'






# # Sử dụng hàm
# input_file_path = '../data/data1/test1_translated.srt'
# subtitles = process_srt(input_file_path)
# a = text_to_speech(subtitles, input_file_path)
# print(a)

# Sử dụng hàm
# print(label_srt_file('../data/data1/test1.srt', '(0)'))