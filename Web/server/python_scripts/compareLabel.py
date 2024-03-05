# import re
# import argparse
# from sklearn.metrics import classification_report

# # Function to extract labels from the SRT content
# def extract_labels_from_srt(file_path):
#     with open(file_path, 'r', encoding='utf-8') as file:
#         return [int(label) for label in re.findall(r'\((0|1)\)', file.read())]

# def compare_labels_and_calculate_accuracy(correct_srt_path, predicted_srt_path, log_file_path):
#     # Extract labels from SRT files
#     correct_labels = extract_labels_from_srt(correct_srt_path)
#     predicted_labels_temp = extract_labels_from_srt(predicted_srt_path)

#     # Ensure both lists have the same length
#     min_length = min(len(correct_labels), len(predicted_labels_temp))
#     correct_labels = correct_labels[:min_length]
#     predicted_labels_temp = predicted_labels_temp[:min_length]

#     # Check if there are more than one unique label in either correct_labels or predicted_labels_temp
#     unique_labels = set(correct_labels + predicted_labels_temp)
#     if len(unique_labels) > 1:
#         # Generate classification report only when there are multiple unique labels
#         report = classification_report(correct_labels, predicted_labels_temp, digits=4, zero_division=1)
#     else:
#         # If there is only one unique label, print a message to log_file
#         report = f"Only one unique label ({list(unique_labels)[0]}), skipping classification report."

#     # Open log file for writing
#     with open(log_file_path, 'w', encoding='utf-8') as log_file:
#         # Write file names and classification report to log file
#         log_file.write(f"{correct_srt_path}| {predicted_srt_path} |\n")
#         log_file.write(report + '\n\n')

# def main():
#     parser = argparse.ArgumentParser(description='Compare labels in two SRT files and calculate accuracy.')
#     parser.add_argument('correct_srt_path', help='Path to the correct SRT file.')
#     parser.add_argument('predicted_srt_path', help='Path to the predicted SRT file.')

#     args = parser.parse_args()

#     # Create a default log file path based on the input files
#     log_file_path = "comparison_log.txt"

#     compare_labels_and_calculate_accuracy(args.correct_srt_path, args.predicted_srt_path, log_file_path)

# if __name__ == "__main__":
#     main()
import os
import re
import argparse
from sklearn.metrics import classification_report

# Function to extract labels from the SRT content
def extract_labels_from_srt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return [int(label) for label in re.findall(r'\((0|1)\)', file.read())]

def find_matching_srt_files(correct_dir, predicted_dir):
    matching_files = []
    correct_files = os.listdir(correct_dir)
    predicted_files = os.listdir(predicted_dir)
    
    for correct_file in correct_files:
        if correct_file.endswith(".srt"):
            for predicted_file in predicted_files:
                if predicted_file.endswith(".srt") and correct_file == predicted_file:
                    matching_files.append((os.path.join(correct_dir, correct_file), os.path.join(predicted_dir, predicted_file)))
    return matching_files

def compare_labels_and_calculate_accuracy(correct_srt_path, predicted_srt_path, log_file_path):
    # Extract labels from SRT files
    correct_labels = extract_labels_from_srt(correct_srt_path)
    predicted_labels_temp = extract_labels_from_srt(predicted_srt_path)

    # Ensure both lists have the same length
    min_length = min(len(correct_labels), len(predicted_labels_temp))
    correct_labels = correct_labels[:min_length]
    predicted_labels_temp = predicted_labels_temp[:min_length]

    # Check if there are more than one unique label in either correct_labels or predicted_labels_temp
    unique_labels = set(correct_labels + predicted_labels_temp)
    if len(unique_labels) > 1:
        # Generate classification report only when there are multiple unique labels
        report = classification_report(correct_labels, predicted_labels_temp, digits=4, zero_division=1)
    else:
        # If there is only one unique label, print a message to log_file
        report = f"Only one unique label ({list(unique_labels)[0]}), skipping classification report."

    # Open log file for writing
    with open(log_file_path, 'a', encoding='utf-8') as log_file:
        # Write file names and classification report to log file
        log_file.write(f"{correct_srt_path}| {predicted_srt_path} |\n")
        log_file.write(report + '\n\n')

def main():
    parser = argparse.ArgumentParser(description='Compare labels in two SRT files and calculate accuracy.')
    parser.add_argument('correct_dir', help='Path to the directory containing correct SRT files.')
    parser.add_argument('predicted_dir', help='Path to the directory containing predicted SRT files.')
    parser.add_argument('--log_file', default="comparison_log.txt", help='Path to the log file.')

    args = parser.parse_args()

    matching_files = find_matching_srt_files(args.correct_dir, args.predicted_dir)

    for correct_srt_path, predicted_srt_path in matching_files:
        compare_labels_and_calculate_accuracy(correct_srt_path, predicted_srt_path, args.log_file)

if __name__ == "__main__":
    main()
