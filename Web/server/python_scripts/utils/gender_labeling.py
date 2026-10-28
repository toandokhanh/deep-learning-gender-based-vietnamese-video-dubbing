import os
from pydub import AudioSegment
from inaSpeechSegmenter import Segmenter
import re
import tempfile  # Add this import


def predict_gender(audio_path):
    try:
        segmenter = Segmenter()
        segments = segmenter(audio_path)
        labels = {"female": 0, "male": 0}

        for segment in segments:
            label, _, _ = segment
            if label in ["female", "male"]:
                labels[label] += 1

        total_labels = labels["male"] + labels["female"]

        if total_labels > 0:
            probability_male = labels["male"] / total_labels
            predicted_label = 1 if probability_male > 0.5 else 0
        else:
            predicted_label = 1  # or any default value you prefer

        return predicted_label
    except Exception as e:
        print(f"An error occurred while segmenting the audio: {e}")
        return 1


def time_to_ms(time_str):
    time_components = re.split("[:,]", time_str)

    h, m, s, ms = map(int, time_components)

    return (h * 3600 + m * 60 + s) * 1000 + ms


def split_and_predict(subtitle_path, audio_path):
    with open(subtitle_path, "r") as f:
        subtitles = f.read().splitlines()

    new_subtitles = []
    for i in range(0, len(subtitles), 4):
        if i + 1 >= len(subtitles):
            break

        start_time, end_time = subtitles[i + 1].split(" --> ")

        start_time_ms = time_to_ms(start_time)
        end_time_ms = time_to_ms(end_time)

        audio_segment = AudioSegment.from_wav(audio_path)
        segment = audio_segment[start_time_ms:end_time_ms]

        if i + 2 < len(subtitles) and subtitles[i + 2].strip():
            temp_audio_path = tempfile.NamedTemporaryFile(
                suffix=".wav", delete=False
            ).name
            segment.export(temp_audio_path, format="wav")
            predicted_label = predict_gender(temp_audio_path)
            os.remove(temp_audio_path)

            new_subtitles.append(
                f"{i // 4 + 1}\n{subtitles[i + 1]}\n({predicted_label}){subtitles[i + 2]}\n"
            )

    output_path = os.path.splitext(subtitle_path)[0] + "_gender_labeled.srt"
    with open(output_path, "w") as f:
        f.write("\n".join(new_subtitles))

    return output_path


def label_srt_file(input_file_path, label):
    output_file_path = input_file_path.replace(".srt", "_gender_labeled.srt")

    with open(input_file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    with open(output_file_path, "w", encoding="utf-8") as file:
        for line in lines:
            if re.match(r"^\d+$", line.strip()) or re.match(
                r"\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}", line.strip()
            ):
                file.write(line)
            else:
                if line.strip():
                    file.write(f"{label}{line}")
                else:
                    file.write(line)

    return output_file_path
