# import re
# from pydub import AudioSegment
# from inaSpeechSegmenter import Segmenter
# import subprocess

# def split_audio(input_audio, subtitles_file):
#     # Đọc nội dung của file srt
#     with open(subtitles_file, 'r') as f:
#         subtitles = f.read().split('\n\n')

#     # Tạo một đối tượng Segmenter
#     segmenter = Segmenter()

#     # Duyệt qua từng đoạn subtitle, tách audio tương ứng và nhận dạng giới tính
#     for idx, subtitle in enumerate(subtitles):
#         # Lấy thời gian bắt đầu và kết thúc từ subtitle
#         match_start = re.search(r'(\d+:\d+:\d+,\d+)', subtitle)
#         match_end = re.search(r'(\d+:\d+:\d+,\d+)', subtitle[match_start.end():]) if match_start else None

#         if match_start and match_end:
#             start_time = match_start.group(1)
#             end_time = match_end.group(1)

#             # Chuyển đổi thời gian thành giây
#             start_seconds = sum(x * int(t) for x, t in zip([3600, 60, 1], start_time.replace(',', ':').split(':')))
#             end_seconds = sum(x * int(t) for x, t in zip([3600, 60, 1], end_time.replace(',', ':').split(':')))

#             # Tách audio từ file gốc
#             audio_segment = AudioSegment.from_wav(input_audio)
#             audio_chunk = audio_segment[start_seconds * 1000:end_seconds * 1000]

#             # Lưu audio chunk vào một tạm thời
#             temp_audio_file = f'temp_audio_{idx}.wav'
#             audio_chunk.export(temp_audio_file, format="wav")

#             # Nhận dạng giới tính sử dụng inaSpeechSegmenter
#             results = segmenter(temp_audio_file)

#             # Gắn nhãn vào file srt trước text
#             gender_label = '(0)' if results[0][2] == 'F' else '(1)'
#             subtitles[idx] = f"{gender_label}{subtitles[idx]}"

#             # Xóa tệp audio tạm thời
#             subprocess.run(["rm", temp_audio_file])

#     # Ghi lại file srt đã được gắn nhãn
#     with open('labeled_subtitles.srt', 'w') as f:
#         f.write('\n\n'.join(subtitles))


# # Thực hiện hàm trên với file âm thanh của bạn
# split_audio("../../data/test2_output.wav", "../../data/test2_output_translated.srt")


# import os
# from inaSpeechSegmenter import Segmenter

# def predict_gender(audio_path):
#     # Tạo một đối tượng Segmenter
#     segmenter = Segmenter()

#     # Chia đoạn âm thanh trong tệp âm thanh
#     segments = segmenter(audio_path)

#     # Lặp qua các đoạn và xác định nhãn đa dạng nhất
#     labels = {}
#     for segment in segments:
#         label, _, _ = segment
#         # Đếm số lượng nhãn 'female' và 'male'
#         if label in ['female', 'male']:
#             if label not in labels:
#                 labels[label] = 0
#             labels[label] += 1

#     # Xác định nhãn dự đoán
#     if 'female' in labels and 'male' in labels:
#         # Chọn nhãn có số lượng lớn hơn
#         predicted_label = 0 if labels['female'] > labels['male'] else 1
#     elif 'female' in labels:
#         predicted_label = 0
#     elif 'male' in labels:
#         predicted_label = 1
#     else:
#         # Không xác định được giới tính
#         predicted_label = None

#     return predicted_label

# # Ví dụ sử dụng hàm
# audio_path = '../../data/test2_output.wav'  # Thay đổi đường dẫn này đến tệp âm thanh của bạn
# result = predict_gender(audio_path)

# if result is not None:
#     gender = 'female' if result == 0 else 'male'
#     print(f"Giới tính dự đoán: {gender}")
# else:
#     print("Không thể xác định giới tính.")


# import os
# from inaSpeechSegmenter import Segmenter

# def predict_gender(audio_path):
#     # Tạo một đối tượng Segmenter
#     segmenter = Segmenter()

#     # Chia đoạn âm thanh trong tệp âm thanh
#     segments = segmenter(audio_path)

#     # Lặp qua các đoạn và xác định nhãn đa dạng nhất
#     labels = {}
#     for segment in segments:
#         label, _, _ = segment
#         # Đếm số lượng nhãn 'female' và 'male'
#         if label in ['female', 'male']:
#             if label not in labels:
#                 labels[label] = 0
#             labels[label] += 1

#     # Xác định nhãn dự đoán
#     if 'female' in labels and 'male' in labels:
#         # Chọn nhãn có số lượng lớn hơn
#         predicted_label = 0 if labels['female'] > labels['male'] else 1
#         # Xác suất tương ứng với nhãn dự đoán
#         probability = labels['female'] / (labels['female'] + labels['male'])
#     elif 'female' in labels:
#         predicted_label = 0
#         probability = 1.0  # 100% xác suất nếu chỉ có nhãn 'female'
#     elif 'male' in labels:
#         predicted_label = 1
#         probability = 1.0  # 100% xác suất nếu chỉ có nhãn 'male'
#     else:
#         # Không xác định được giới tính
#         predicted_label = None
#         probability = None

#     return predicted_label, probability

# # Ví dụ sử dụng hàm
# audio_path = '../../data/test1.wav'  # Thay đổi đường dẫn này đến tệp âm thanh của bạn
# result, prob = predict_gender(audio_path)

# if result is not None:
#     gender = 'female' if result == 0 else 'male'
#     print(f"Giới tính dự đoán: {gender}")
#     print(f"Xác suất: {prob:.2%}")
# else:
#     print("Không thể xác định giới tính.")



# import os
# from inaSpeechSegmenter import Segmenter

# def predict_gender(audio_path):
#     # Tạo một đối tượng Segmenter
#     segmenter = Segmenter()

#     # Chia đoạn âm thanh trong tệp âm thanh
#     segments = segmenter(audio_path)

#     # In ra tổng kết quả của thư viện nhận dạng giới tính
#     print("Tổng kết quả của thư viện nhận dạng giới tính:")
#     for segment in segments:
#         label, start_time, end_time = segment
#         print(f"Thời điểm: {start_time} - {end_time}, Giới tính: {label}")

#     # Lặp qua các đoạn và xác định nhãn đa dạng nhất
#     labels = {'female': 0, 'male': 0}
#     for segment in segments:
#         label, _, _ = segment
#         # Đếm số lượng nhãn 'female' và 'male'
#         if label in ['female', 'male']:
#             labels[label] += 1

#     # Xác định nhãn dự đoán và xác suất
#     if labels['male'] > labels['female']:
#         probability = labels['male'] / (labels['male'] + labels['female'])
#         predicted_label = 1 if probability > 0.5 else 0
#     else:
#         probability = labels['female'] / (labels['male'] + labels['female'])
#         predicted_label = 0 if probability > 0.5 else 1

#     return predicted_label, probability

# # Ví dụ sử dụng hàm
# audio_path = '../../data/test2_output.wav'  # Thay đổi đường dẫn này đến tệp âm thanh của bạn
# result, prob = predict_gender(audio_path)

# if result is not None:
#     gender = 'female' if result == 0 else 'male'
#     print(f"Giới tính dự đoán: {gender}")
#     print(f"Xác suất: {prob:.2%}")
# else:
#     print("Không thể xác định giới tính.")

# import os
# from inaSpeechSegmenter import Segmenter

# def predict_gender(audio_path):
#     segmenter = Segmenter()
#     segments = segmenter(audio_path)
#     labels = {'female': 0, 'male': 0}
#     for segment in segments:
#         label, _, _ = segment
#         if label in ['female', 'male']:
#             labels[label] += 1

#     if labels['male'] > labels['female']:
#         probability = labels['male'] / (labels['male'] + labels['female'])
#         predicted_label = 1 if probability > 0.5 else 0
#     else:
#         probability = labels['female'] / (labels['male'] + labels['female'])
#         predicted_label = 0 if probability > 0.5 else 1

#     return predicted_label



import os
from pydub import AudioSegment
from inaSpeechSegmenter import Segmenter
import re
import tempfile  # Add this import
# def predict_gender(audio_path):
#     segmenter = Segmenter()
#     segments = segmenter(audio_path)
#     labels = {'female': 0, 'male': 0}
#     for segment in segments:
#         label, _, _ = segment
#         if label in ['female', 'male']:
#             labels[label] += 1

#     if labels['male'] > labels['female']:
#         probability = labels['male'] / (labels['male'] + labels['female'])
#         predicted_label = 1 if probability > 0.5 else 0
#     else:
#         probability = labels['female'] / (labels['male'] + labels['female'])
#         predicted_label = 0 if probability > 0.5 else 1

#     return predicted_label

# def predict_gender(audio_path):
#     segmenter = Segmenter()
#     segments = segmenter(audio_path)
#     labels = {'female': 0, 'male': 0}
    
#     for segment in segments:
#         label, _, _ = segment
#         if label in ['female', 'male']:
#             labels[label] += 1

#     total_labels = labels['male'] + labels['female']
    
#     if total_labels > 0:
#         probability_male = labels['male'] / total_labels
#         predicted_label = 1 if probability_male > 0.5 else 0
#     else:
#         # Handle the case when there are no labels
#         predicted_label = 1  # or any default value you prefer

#     return predicted_label

def predict_gender(audio_path):
    try:
        segmenter = Segmenter()
        segments = segmenter(audio_path)
        labels = {'female': 0, 'male': 0}
        
        for segment in segments:
            label, _, _ = segment
            if label in ['female', 'male']:
                labels[label] += 1

        total_labels = labels['male'] + labels['female']
        
        if total_labels > 0:
            probability_male = labels['male'] / total_labels
            predicted_label = 1 if probability_male > 0.5 else 0
        else:
            # Handle the case when there are no labels
            predicted_label = 1  # or any default value you prefer

        return predicted_label
    except Exception as e:
        print(f"An error occurred while segmenting the audio: {e}")
        return 1



def time_to_ms(time_str):
    # Split time_str using either colon or comma
    time_components = re.split('[:,]', time_str)
    
    # Extract hours, minutes, seconds, and milliseconds
    h, m, s, ms = map(int, time_components)

    # Convert to milliseconds
    return (h * 3600 + m * 60 + s) * 1000 + ms

# def split_and_predict(subtitle_path, audio_path):
#     # Read subtitle file
#     with open(subtitle_path, 'r') as f:
#         subtitles = f.read().splitlines()

#     # Process each subtitle
#     new_subtitles = []
#     for i in range(0, len(subtitles), 4):
#         start_time, end_time = subtitles[i+1].split(' --> ')
        
#         # Convert time to milliseconds
#         start_time_ms = time_to_ms(start_time)
#         end_time_ms = time_to_ms(end_time)

#         # Split audio segment
#         audio_segment = AudioSegment.from_wav(audio_path)
#         segment = audio_segment[start_time_ms:end_time_ms]

#         # Skip empty lines
#         if subtitles[i+2].strip():
#             # Save the audio segment to a temporary WAV file
#             temp_audio_path = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
#             segment.export(temp_audio_path, format="wav")
#             # Predict gender label
#             predicted_label = predict_gender(temp_audio_path)
#             # Remove the temporary audio file
#             os.remove(temp_audio_path)

#             # Update subtitle with label
#             new_subtitles.append(f'{i//4 + 1}\n{subtitles[i+1]}\n({predicted_label}){subtitles[i+2]}\n')

#     # Save updated subtitles
#     output_path = os.path.splitext(subtitle_path)[0] + '_gender_labeled.srt'
#     with open(output_path, 'w') as f:
#         f.write('\n'.join(new_subtitles))


#     return output_path


def split_and_predict(subtitle_path, audio_path):
    # Read subtitle file
    with open(subtitle_path, 'r') as f:
        subtitles = f.read().splitlines()

    # Process each subtitle
    new_subtitles = []
    for i in range(0, len(subtitles), 4):
        # Check if there are enough lines in subtitles
        if i + 1 >= len(subtitles):
            break

        start_time, end_time = subtitles[i+1].split(' --> ')
        
        # Convert time to milliseconds
        start_time_ms = time_to_ms(start_time)
        end_time_ms = time_to_ms(end_time)

        # Split audio segment
        audio_segment = AudioSegment.from_wav(audio_path)
        segment = audio_segment[start_time_ms:end_time_ms]

        # Skip empty lines
        if i + 2 < len(subtitles) and subtitles[i+2].strip():
            # Save the audio segment to a temporary WAV file
            temp_audio_path = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
            segment.export(temp_audio_path, format="wav")
            # Predict gender label
            predicted_label = predict_gender(temp_audio_path)
            # Remove the temporary audio file
            os.remove(temp_audio_path)

            # Update subtitle with label
            new_subtitles.append(f'{i//4 + 1}\n{subtitles[i+1]}\n({predicted_label}){subtitles[i+2]}\n')

    # Save updated subtitles
    output_path = os.path.splitext(subtitle_path)[0] + '_gender_labeled.srt'
    with open(output_path, 'w') as f:
        f.write('\n'.join(new_subtitles))

    return output_path

def label_srt_file(input_file_path, label):
    output_file_path = input_file_path.replace('.srt', '_gender_labeled.srt')
    
    with open(input_file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    with open(output_file_path, 'w', encoding='utf-8') as file:
        for line in lines:
            # Kiểm tra nếu dòng hiện tại là số thứ tự hoặc dòng thời gian
            if re.match(r'^\d+$', line.strip()) or re.match(r'\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}', line.strip()):
                file.write(line)
            else:
                # Chỉ thêm label vào nếu dòng có nội dung
                if line.strip():
                    file.write(f"{label}{line}")
                else:
                    file.write(line)

    return output_file_path

# if __name__ == "__main__":
#     subtitle_path = 'test2_v2_output_translated.srt'  # Replace with the path to your subtitle file
#     audio_path = 'test2_output.wav'  # Replace with the path to your audio file

#     split_and_predict(subtitle_path, audio_path)

