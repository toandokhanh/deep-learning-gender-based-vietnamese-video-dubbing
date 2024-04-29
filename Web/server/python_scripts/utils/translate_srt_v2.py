import re
import os
import requests

def parse_srt(file_content):
    pattern = re.compile(r'(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n(.*?)\n\n', re.DOTALL)
    return pattern.findall(file_content)

def translate_text(text, dest_lang, api_key):
    url = "https://translation.googleapis.com/language/translate/v2"
    params = {
        "key": api_key,
        "q": text,
        "target": dest_lang
    }
    response = requests.post(url, params=params)
    if response.status_code == 200:
        translated_text = response.json()["data"]["translations"][0]["translatedText"]
        return translated_text
    else:
        print(f"Translation failed with status code: {response.status_code}")
        return None

def translate_and_save_srt(file_path, dest_lang='vi', api_key=None):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    srt_entries = parse_srt(content)
    translated_entries = []

    for entry in srt_entries:
        index, start, end, text = entry
        translated_text = translate_text(text, dest_lang, api_key)
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
api_key = "AIzaSyDbxSjEn7i7rD7BXK3Nhy5WKVVhUBIzYeQ"
translated_srt_path = translate_and_save_srt('f76326c7_phap.srt', api_key=api_key)
print(f"Translated SRT saved at: {translated_srt_path}")