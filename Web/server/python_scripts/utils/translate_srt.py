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


# import re
# import os
# from translate import Translator

# def parse_srt(file_content):
#     pattern = re.compile(r'(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n(.*?)\n\n', re.DOTALL)
#     return pattern.findall(file_content)

# def translate_text(text, dest_lang):
#     translator = Translator(to_lang=dest_lang)
#     translation = translator.translate(text)
#     return translation

# def translate_and_save_srt(file_path, dest_lang='vi'):
#     with open(file_path, 'r', encoding='utf-8') as file:
#         content = file.read()

#     srt_entries = parse_srt(content)
#     translated_entries = []

#     for entry in srt_entries:
#         index, start, end, text = entry
#         translated_text = translate_text(text, dest_lang)
#         translated_entries.append((index, start, end, translated_text))

#     # Generate output file path
#     base_path, file_name = os.path.split(file_path)
#     output_file = os.path.join(base_path, f"{os.path.splitext(file_name)[0]}_translated.srt")

#     # Save translated SRT
#     with open(output_file, 'w', encoding='utf-8') as file:
#         for entry in translated_entries:
#             index, start, end, text = entry
#             file.write(f"{index}\n{start} --> {end}\n{text}\n\n")

#     return output_file


# from translate import Translator
# import re
# import os

# def parse_srt(file_content):
#     pattern = re.compile(r'(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n(.*?)\n\n', re.DOTALL)
#     return pattern.findall(file_content)

# def translate_text(text, src_lang, dest_lang):
#     translator = Translator(from_lang=src_lang, to_lang=dest_lang)
#     return translator.translate(text)

# def translate_and_save_srt(file_path, src_lang='en', dest_lang='vi'):
#     with open(file_path, 'r', encoding='utf-8') as file:
#         content = file.read()
    
#     srt_entries = parse_srt(content)
#     translated_entries = []

#     for entry in srt_entries:
#         index, start, end, text = entry
#         translated_text = translate_text(text, src_lang, dest_lang)
#         translated_entries.append((index, start, end, translated_text))
    
#     # Generate output file path
#     base_path, file_name = os.path.split(file_path)
#     output_file = os.path.join(base_path, f"{os.path.splitext(file_name)[0]}_translated.srt")

#     # Save translated SRT
#     with open(output_file, 'w', encoding='utf-8') as file:
#         for entry in translated_entries:
#             index, start, end, text = entry
#             file.write(f"{index}\n{start} --> {end}\n{text}\n\n")

#     return output_file


# # Example usage
# translated_srt_path = translate_and_save_srt('result2/test1.srt')
# print(f"Translated SRT saved at: {translated_srt_path}")


# from translate import Translator
# import re

# def parse_srt(file_content):
#     pattern = re.compile(r'(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n(.*?)\n\n', re.DOTALL)
#     return pattern.findall(file_content)

# def translate_text(text, src_lang, dest_lang):
#     translator = Translator(from_lang=src_lang, to_lang=dest_lang)
#     return translator.translate(text)

# def translate_srt(file_path, src_lang='en', dest_lang='vi'):
#     with open(file_path, 'r', encoding='utf-8') as file:
#         content = file.read()
    
#     srt_entries = parse_srt(content)
#     translated_entries = []

#     for entry in srt_entries:
#         index, start, end, text = entry
#         translated_text = translate_text(text, src_lang, dest_lang)
#         translated_entries.append((index, start, end, translated_text))
    
#     return translated_entries

# def save_translated_srt(translated_entries, output_file):
#     with open(output_file, 'w', encoding='utf-8') as file:
#         for entry in translated_entries:
#             index, start, end, text = entry
#             file.write(f"{index}\n{start} --> {end}\n{text}\n\n")

# # Example usage

# translated_entries = translate_srt('result2/test1.srt')
# save_translated_srt(translated_entries, 'translated_srt_file.srt')




# # from libretranslatepy import LibreTranslateAPI
# # import re

# # def parse_srt(srt_content):
# #     pattern = re.compile(r'(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n(.*?)\n\n', re.DOTALL)
# #     return pattern.findall(srt_content)

# # def translate_text(text, src_lang='en', dest_lang='vi'):
# #     lt = LibreTranslateAPI("https://libretranslate.de")
# #     return lt.translate(text, src_lang, dest_lang)

# # def translate_srt(srt_content, src_lang='en', dest_lang='vi'):
# #     srt_entries = parse_srt(srt_content)
# #     translated_entries = []

# #     for index, start, end, text in srt_entries:
# #         translated_text = translate_text(text, src_lang, dest_lang)
# #         translated_entries.append((index, start, end, translated_text))
    
# #     return translated_entries

# # def main():
# #     input_srt_file = 'result2/test1.srt'
# #     output_srt_file = 'translated_srt_fileaaa.srt'

# #     with open(input_srt_file, 'r', encoding='utf-8') as file:
# #         srt_content = file.read()

# #     translated_entries = translate_srt(srt_content)

# #     with open(output_srt_file, 'w', encoding='utf-8') as file:
# #         for index, start, end, text in translated_entries:
# #             file.write(f"{index}\n{start} --> {end}\n{text}\n\n")

# # if __name__ == "__main__":
# #     main()


# # from libretranslatepy import LibreTranslateAPI

# # def check_language_support(api_url, language_code):
# #     lt = LibreTranslateAPI(api_url)
# #     supported_languages = lt.languages()
# #     return any(lang['code'] == language_code for lang in supported_languages)

# # # Checking if Vietnamese is supported
# # api_url = "https://libretranslate.de"
# # language_code = "vi"  # Vietnamese language code
# # is_supported = check_language_support(api_url, language_code)

# # print(is_supported)
