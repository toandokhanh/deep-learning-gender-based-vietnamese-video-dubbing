import re
import os
from googletrans import Translator

def parse_srt(file_content):
    pattern = re.compile(r'(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n(.*?)\n\n', re.DOTALL)
    return pattern.findall(file_content)

# def translate_text(text, dest_lang):
#     translator = Translator()
#     translation = translator.translate(text, dest=dest_lang)
#     return translation.text

def translate_text(text, dest_lang):
    translator = Translator()
    try:
        translation = translator.translate(text, dest=dest_lang)
        return translation.text
    except Exception as e:
        print(f"Translation failed: {e}")
        return 

def translate_and_save_srt(file_path, dest_lang='vi'):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    srt_entries = parse_srt(content)
    translated_entries = []

    for entry in srt_entries:
        index, start, end, text = entry
        translated_text = translate_text(text, dest_lang)
        translated_entries.append((index, start, end, translated_text))

    # Generate output file path
    base_path, file_name = os.path.split(file_path)
    output_file = os.path.join(base_path, f"{os.path.splitext(file_name)[0]}_translated.srt")

    # Save translated SRT
    with open(output_file, 'w', encoding='utf-8') as file:
        for entry in translated_entries:
            index, start, end, text = entry
            file.write(f"{index}\n{start} --> {end}\n{text}\n\n")

    return output_file


# Example usage
# translated_srt_path = translate_and_save_srt('f76326c7_phap.srt')
# print(f"Translated SRT saved at: {translated_srt_path}")
