import argparse
from moviepy.editor import VideoFileClip, AudioFileClip
from pydub import AudioSegment
import os

def process_audio(input_path1, input_path2, ms_start=0):
    sound1 = AudioSegment.from_file(input_path1, format="wav")
    sound2 = AudioSegment.from_file(input_path2, format="wav")
    # Decrease the volume of the first input audio by 6 dB
    quieter = sound1 - 9
    # Assuming the translated audio file has the same name with "_translated" added
    output_path = os.path.splitext(input_path1)[0] + "_audiodescribed.wav"
    # If the translated audio file has a different naming convention, update the output_path accordingly
    # Overlay the quieter audio on the second input audio starting from ms_start milliseconds
    overlay = quieter.overlay(sound2, position=ms_start)
    # Export the final audio file
    overlay.export(output_path, format="wav")
    return output_path

# def process_audio(input_path1, input_path2, ms_start=0):
#     # Load the audio files
#     sound1 = AudioSegment.from_file(input_path1, format="wav")

#     # Check if input_path2 has MP3 extension
#     if input_path2.lower().endswith('.mp3'):
#         # Load MP3 file and convert to WAV
#         sound2 = AudioSegment.from_file(input_path2, format="mp3").set_frame_rate(44100)
#     else:
#         # Load WAV file
#         sound2 = AudioSegment.from_file(input_path2, format="wav")

#     # Decrease the volume of the first input audio by 6 dB
#     quieter = sound1 - 6

#     # Overlay the quieter audio on the second input audio starting from ms_start milliseconds
#     # If the overlay extends beyond the length of sound2, it will be truncated
#     output_sound = sound2.overlay(quieter, position=ms_start)

#     # Assuming the translated audio file has the same name with "_final" added
#     output_path = os.path.splitext(os.path.basename(input_path1))[0] + "_final.wav"

#     # Export the final audio file
#     output_sound.export(output_path, format="wav")

#     return output_path


def merge_video_and_audio(video_path, audio_path):
    # Load video clip
    video_clip = VideoFileClip(video_path)

    # Load audio clip
    audio_clip = AudioFileClip(audio_path)

    # Thêm âm thanh vào video mà không cắt độ dài
    video_clip = video_clip.set_audio(audio_clip)

    # Xác định đường dẫn cho video đầu ra
    output_path = os.path.splitext(video_path)[0] + "_audiodescribed.mp4"

    # Ghi video mới
    video_clip.write_videofile(output_path, codec="libx264", audio_codec="aac")

    return output_path 

# def main():
#     parser = argparse.ArgumentParser(description="Merge video and audio with optional audio processing.")
#     parser.add_argument("-w1", "--input_audio_path1", required=True, help="Path to the original audio (wav).")
#     parser.add_argument("-w2", "--input_audio_path2", required=True, help="Path to the translated audio (wav).")
#     parser.add_argument("-v", "--input_video_path", required=True, help="Path to the input video (mp4).")
#     parser.add_argument("-ms", "--ms_start", type=int, default=0, help="Start time in milliseconds for overlaying the audio on the video.")

#     args = parser.parse_args()

#     # Example usage:
#     final_wav_path = process_audio(args.input_audio_path1, args.input_audio_path2, args.ms_start)
#     print("Final output audio file:", final_wav_path)

#     final_output_path = merge_video_and_audio(args.input_video_path, final_wav_path)
#     print("Final output video file:", final_output_path)

# if __name__ == "__main__":
#     main()
