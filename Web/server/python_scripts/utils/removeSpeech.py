import os
from spleeter.separator import Separator

# def removeSpeech(audioFile, directory=''):
#     # Tạo một đối tượng Separator với 2 bóng nhưng không có giọng nói
#     separator = Separator('spleeter:2stems')
#     # Phân tách giọng nói và âm thanh xung quanh từ file âm thanh
#     separator.separate_to_file(audioFile, directory='')

def removeSpeech(audioFile):
    # Tạo một đối tượng Separator với 2 bóng nhưng không có giọng nói
    separator = Separator('spleeter:2stems')
    # Lấy thư mục chứa file âm thanh
    directory = os.path.dirname(audioFile)
    # Tạo đường dẫn của thư mục đích
    destination = os.path.join(directory, os.path.splitext(os.path.basename(audioFile))[0])
    # Phân tách giọng nói và âm thanh xung quanh từ file âm thanh và lưu vào thư mục đích
    separator.separate_to_file(audioFile, directory)
    # Tạo đường dẫn của file accompaniment
    output_file_path = os.path.join(destination, 'accompaniment.wav')
    return output_file_path

# Sử dụng hàm
# output_path = removeSpeech('1.wav')
# print(output_path)
