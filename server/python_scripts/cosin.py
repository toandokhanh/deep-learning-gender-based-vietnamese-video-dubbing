# import argparse
# import string
# import re

# def remove_punctuation(text):
#     # Loại bỏ dấu câu từ văn bản
#     translator = str.maketrans("", "", string.punctuation)
#     return text.translate(translator)

# def jaccard_similarity(str1, str2):
#     # Tiền xử lý: loại bỏ dấu câu và chuyển đổi văn bản thành chữ thường
#     str1 = remove_punctuation(str1.lower())
#     str2 = remove_punctuation(str2.lower())

#     # Tách thành tập từ
#     a = set(str1.split())
#     b = set(str2.split())

#     # Tính toán độ tương đồng Jaccard
#     intersection = len(a.intersection(b))
#     union = len(a) + len(b) - intersection
#     similarity = intersection / union

#     return similarity

# def read_srt_file(file_path):
#     # Đọc nội dung từ file SRT
#     with open(file_path, 'r', encoding='utf-8') as file:
#         content = file.read()
#     return content

# def convert_srt_to_text(file_path):
#     # Đọc nội dung từ file SRT, loại bỏ các mốc thời gian và số thứ tự
#     content = read_srt_file(file_path)

#     # Sử dụng biểu thức chính quy để lọc ra chỉ văn bản từ mỗi dòng
#     text_only = re.sub(r'\d+\s*\n*\s*\d+:\d+:\d+,\d+ --> \d+:\d+:\d+,\d+\n*', '', content)

#     return remove_punctuation(text_only)

# def main():
#     # Sử dụng argparse để đọc đường dẫn file từ tham số dòng lệnh
#     parser = argparse.ArgumentParser(description="Calculate Jaccard Similarity between two SRT files.")
#     parser.add_argument("file_path1", help="Path to the first SRT file")
#     parser.add_argument("file_path2", help="Path to the second SRT file")
#     args = parser.parse_args()

#     # Đọc và so sánh độ tương đồng
#     text1 = convert_srt_to_text(args.file_path1)
#     text2 = convert_srt_to_text(args.file_path2)

#     similarity_score = jaccard_similarity(text1, text2)
#     print(args.file_path1, text1, args.file_path2, text2, similarity_score)

# if __name__ == "__main__":
#     main()


# file_path1 = "../public/videos/Selena Gomez Believe in Yourself Motivational Speech with English Subtitles [English (auto-generated)] [DownloadYoutubeSubtitles.com].srt"
# file_path2 = "../public/videos/6120fb97_output.srt"



import argparse
import string
import re

def remove_punctuation(text):
    # Loại bỏ dấu câu từ văn bản
    translator = str.maketrans("", "", string.punctuation)
    return text.translate(translator)

def jaccard_similarity(str1, str2):
    # Tiền xử lý: loại bỏ dấu câu và chuyển đổi văn bản thành chữ thường
    str1 = remove_punctuation(str1.lower())
    str2 = remove_punctuation(str2.lower())

    # Tách thành tập từ
    a = set(str1.split())
    b = set(str2.split())

    # Tính toán độ tương đồng Jaccard
    intersection = len(a.intersection(b))
    union = len(a) + len(b) - intersection
    similarity = intersection / union

    return similarity

def read_srt_file(file_path):
    # Đọc nội dung từ file SRT
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    return content

def convert_srt_to_text(file_path):
    # Đọc nội dung từ file SRT, loại bỏ các mốc thời gian và số thứ tự
    content = read_srt_file(file_path)

    # Sử dụng biểu thức chính quy để lọc ra chỉ văn bản từ mỗi dòng
    text_only = re.sub(r'\d+\s*\n*\s*\d+:\d+:\d+,\d+ --> \d+:\d+:\d+,\d+\n*', '', content)

    return remove_punctuation(text_only)

def main():
    # Sử dụng argparse để đọc đường dẫn file từ tham số dòng lệnh
    parser = argparse.ArgumentParser(description="Calculate Jaccard Similarity between two SRT files.")
    parser.add_argument("file_path1", help="Path to the first SRT file")
    parser.add_argument("file_path2", help="Path to the second SRT file")
    args = parser.parse_args()

    # Đọc và so sánh độ tương đồng
    text1 = convert_srt_to_text(args.file_path1)
    text2 = convert_srt_to_text(args.file_path2)

    # Thu gọn text1 và text2 thành một đoạn
    text1 = ' '.join(text1.split())
    text2 = ' '.join(text2.split())

    # Tính toán độ tương đồng
    similarity_score = jaccard_similarity(text1, text2)

    # Lưu log vào file txt
    log_file_path = "similarity_log.txt"
    with open(log_file_path, 'a', encoding='utf-8') as log_file:
        log_file.write(f"{args.file_path1} | {text1} | {args.file_path2} | {text2} | {similarity_score}\n")

if __name__ == "__main__":
    main()
