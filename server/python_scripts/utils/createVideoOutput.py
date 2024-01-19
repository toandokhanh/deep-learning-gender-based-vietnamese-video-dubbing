import os

def createAudiodescribed(file_in, file_srt):
    # Trích xuất đường dẫn và tên file từ file_in
    video_path, video_filename = os.path.split(file_in)

    # Tạo tên file_out dựa trên đường dẫn và tên file của file_in
    file_out = os.path.join(video_path, f"{os.path.splitext(video_filename)[0]}_explanation.mp4")


    # Tùy chỉnh phụ đề với back ground màu đen và chữ trắng
    subtitle_options = "force_style='Fontsize=20,PrimaryColour=&H00FFFFFF,BackColour=&H80000000,BorderStyle=3,Outline=1,Shadow=0'"
    # Sử dụng ffmpeg để thêm phụ đề với các tùy chỉnh trên
    os.system(f'ffmpeg -y -i "{file_in}" -vf "subtitles=\'{file_srt}\':{subtitle_options},scale=1280:720" "{file_out}"')

    return file_out

def createSubtitle(file_in, file_srt):
    # Trích xuất đường dẫn và tên file từ file_in
    video_path, video_filename = os.path.split(file_in)

    # Tạo tên file_out dựa trên đường dẫn và tên file của file_in
    file_out = os.path.join(video_path, f"{os.path.splitext(video_filename)[0]}_subtitle.mp4")


    # Tùy chỉnh phụ đề với background màu đen và chữ trắng
    subtitle_options = "force_style='Fontsize=20,PrimaryColour=&H00FFFFFF,BackColour=&H80000000,BorderStyle=3,Outline=1,Shadow=0'"

    # Sử dụng ffmpeg để thêm phụ đề với các tùy chỉnh trên
    os.system(f'ffmpeg -y -i "{file_in}" -vf "subtitles=\'{file_srt}\':{subtitle_options},scale=1280:720" "{file_out}"')

    return file_out
# Gọi hàm với các tham số
# createSubtitle('../test3/test2_final.mp4', '../test3/test2.srt')