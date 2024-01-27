import re
import argparse
from sklearn.metrics import classification_report

# Function to extract labels from the SRT content
def extract_labels_from_srt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return [int(label) for label in re.findall(r'\((0|1)\)', file.read())]

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
    with open(log_file_path, 'w', encoding='utf-8') as log_file:
        # Write file names and classification report to log file
        log_file.write(f"{correct_srt_path}| {predicted_srt_path} |\n")
        log_file.write(report + '\n\n')

def main():
    parser = argparse.ArgumentParser(description='Compare labels in two SRT files and calculate accuracy.')
    parser.add_argument('correct_srt_path', help='Path to the correct SRT file.')
    parser.add_argument('predicted_srt_path', help='Path to the predicted SRT file.')

    args = parser.parse_args()

    # Create a default log file path based on the input files
    log_file_path = "comparison_log.txt"

    compare_labels_and_calculate_accuracy(args.correct_srt_path, args.predicted_srt_path, log_file_path)

if __name__ == "__main__":
    main()
