# # from flask import Flask, request, jsonify
# # import subprocess
# # import json
# # import re
# # app = Flask(__name__)

# # @app.route('/api/createSubtitleV1', methods=['POST'])
# # def subtitlev1():
# #     data = request.get_json()
# #     video = data.get('video')
# #     sourceLanguage = data.get('sourceLanguage')
# #     rate = data.get('rate')
# #     volume = data.get('volume')
# #     gender = data.get('gender')
# #     noise = data.get('noise')
# #     retainSound = data.get('retainSound')
# #     adSubtitle = data.get('adSubtitle')
# #     type = data.get('type')

# #     if video.startswith('https://www.youtube.com'):
# #         command = f'python3 {type}.py {video}'
# #     else:
# #         command = f'python3 {type}.py ../public/videos/{video}'
    
# #     if sourceLanguage is not None:
# #         command += f' --l_in {sourceLanguage}'
# #     if rate is not None:
# #         command += f' -r {rate}'
# #     if volume is not None:
# #         command += f' -v {volume}'
# #     if gender is not None:
# #         command += f' --gender {gender}'
# #     if noise is not None:
# #         command += f' -noise={noise}'
# #     if adSubtitle is not None:
# #         command += f' --ad_subtitle_en={adSubtitle}'
# #     if retainSound is not None:
# #         command += f' --retain_sound={retainSound}'
# #     print('command')
# #     print(command)
# #     try:
# #         result = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)
# #         json_start = result.find('{')
# #         json_end = result.rfind('}') + 1
# #         json_data = result[json_start:json_end]
# #         print('---json_data---')
# #         print(json_data)
# #         result_dict = json.loads(json_data)
# #         return jsonify(json_data), 200
# #     except subprocess.CalledProcessError as e:
# #         error_message = f"Error executing command: {e.output}"
# #         return jsonify({"error": error_message}), 500

# # if __name__ == '__main__':
# #     app.run(port=6000) 
# #     app.run(debug=True)



# from flask import Flask, request, jsonify
# import subprocess
# import json
# import re
# app = Flask(__name__)

# @app.route('/api/createSubtitleV1', methods=['POST'])
# def subtitlev1():
#     data = request.get_json()
#     video = data.get('video')
#     sourceLanguage = data.get('sourceLanguage')
#     rate = data.get('rate')
#     volume = data.get('volume')
#     gender = data.get('gender')
#     noise = data.get('noise')
#     retainSound = data.get('retainSound')
#     adSubtitle = data.get('adSubtitle')
#     type = data.get('type')

#     if video.startswith('https://www.youtube.com'):
#         command = f'python3 {type}.py {video}'
#     else:
#         command = f'python3 {type}.py ../public/videos/{video}'
    
#     if sourceLanguage is not None:
#         command += f' --l_in {sourceLanguage}'
#     if rate is not None:
#         command += f' -r {rate}'
#     if volume is not None:
#         command += f' -v {volume}'
#     if gender is not None:
#         command += f' --gender {gender}'
#     if noise is not None:
#         command += f' -noise={noise}'
#     if adSubtitle is not None:
#         command += f' --ad_subtitle_en={adSubtitle}'
#     if retainSound is not None:
#         command += f' --retain_sound={retainSound}'
#     print('command')
#     print(command)
#     result = subprocess.check_output(command, shell=True, text=True).strip()
#     result_list = result.split(', ')
#     keys = [
#         'date_time',
#         'path_video',
#         'capacity',
#         'time',
#         'sourceLanguage',
#         'audio_original',
#         'srt_original',
#         'audio_filtered',
#         'srt_translated',
#         'srt_labeled',
#         'audio_described',
#         'audio_overlay_described',
#         'videoSubtitle',
#         'video_explanation',
#         'video_explanation_sub',
#         'execution_time'
#     ]
#     result_dict = {keys[i]: result_list[i] for i in range(len(keys))}
#     # Extract JSON data
#     # json_start = result.find('{')
#     # json_end = result.rfind('}') + 1
#     # json_data = result[json_start:json_end]
#     print('result_dict')
#     print(result_dict)
#     return result_dict
#     # try:
#     #     result = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)
#     #     print('--result--')
#     #     print(result)
#     #     json_start = result.find('{')
#     #     json_end = result.rfind('}') + 1
#     #     json_data = result[json_start:json_end]
#     #     print('--json_data--')
#     #     print(json_data)
#     #     result_dict = json.loads(json_data)
#     #     print('--result_dict--')
#     #     print(result_dict)
#     #     return jsonify(result_dict), 200
#     # except subprocess.CalledProcessError as e:
#     #     error_message = f"Error executing command: {e.output}"
#     #     print('--error--')
#     #     print(error_message)
#     #     return jsonify({"error": error_message}), 500
#     # try:
#         # result = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)
#     #     result = subprocess.check_output(command, shell=True, text=True).strip()
#     #     result_list = result.split(', ')
#     #     keys = [
#     #         'date_time',
#     #         'path_video',
#     #         'capacity',
#     #         'time',
#     #         'sourceLanguage',
#     #         'audio_original',
#     #         'srt_original',
#     #         'audio_filtered',
#     #         'srt_translated',
#     #         'srt_labeled',
#     #         'audio_described',
#     #         'audio_overlay_described',
#     #         'videoSubtitle',
#     #         'video_explanation',
#     #         'video_explanation_sub',
#     #         'execution_time'
#     #     ]
#     #     result_dict = {keys[i]: result_list[i] for i in range(len(keys))}
#     #     # Extract JSON data
#     #     # json_start = result.find('{')
#     #     # json_end = result.rfind('}') + 1
#     #     # json_data = result[json_start:json_end]
#     #     print('result_dict')
#     #     print(result_dict)
#     #     return result_dict
#     # except subprocess.CalledProcessError as e:
#     #     error_message = f"Error executing command: {e.output}"
#     #     print('--error--')
#     #     print(error_message)
        
#     #     return jsonify({"error": error_message}), 500



# if __name__ == '__main__':
#     app.run(port=6000) 
#     app.run(debug=True)
# # --------------------------------END--------------------------------
# # {
# #     "date_time": "20240305_030921",    
# #     "path_video": "../public/videos/7c5e00a5.mp4",
# #     "capacity": "10269",
# #     "time": "264.06",
# #     "sourceLanguage": "en",
# #     "audio_original": "../public/videos/7c5e00a5.wav",
# #     "srt_original": "../public/videos/7c5e00a5_output.srt",
# #     "audio_filtered": "../public/videos/7c5e00a5_output.wav",
# #     "srt_translated": "../public/videos/7c5e00a5_output_translated.srt",      
# #     "srt_labeled": "../public/videos/7c5e00a5_output_translated_gender_labeled.srt",
# #     "audio_described": "../public/videos/7c5e00a5_output_translated_gender_labeled_output.wav",
# #     "audio_overlay_described": "../public/videos/7c5e00a5_audiodescribed.wav",
# #     "videoSubtitle": "../public/videos/7c5e00a5_subtitle.mp4",
# #     "video_explanation": "../public/videos/7c5e00a5_audiodescribed.mp4",      
# #     "video_explanation_sub": "../public/videos/7c5e00a5_audiodescribed_explanation.mp4",
# #     "execution_time": "261.463369"     
# # }

# # --json_data--
# # {
# #     "date_time": "20240305_030921",    
# #     "path_video": "../public/videos/7c5e00a5.mp4",
# #     "capacity": "10269",
# #     "time": "264.06",
# #     "sourceLanguage": "en",
# #     "audio_original": "../public/videos/7c5e00a5.wav",
# #     "srt_original": "../public/videos/7c5e00a5_output.srt",
# #     "audio_filtered": "../public/videos/7c5e00a5_output.wav",
# #     "srt_translated": "../public/videos/7c5e00a5_output_translated.srt",      
# #     "srt_labeled": "../public/videos/7c5e00a5_output_translated_gender_labeled.srt",
# #     "audio_described": "../public/videos/7c5e00a5_output_translated_gender_labeled_output.wav",
# #     "audio_overlay_described": "../public/videos/7c5e00a5_audiodescribed.wav",
# #     "videoSubtitle": "../public/videos/7c5e00a5_subtitle.mp4",
# #     "video_explanation": "../public/videos/7c5e00a5_audiodescribed.mp4",      
# #     "video_explanation_sub": "../public/videos/7c5e00a5_audiodescribed_explanation.mp4",
# #     "execution_time": "261.463369"     
# # }
# # --result_dict--
# # {'date_time': '20240305_030921', 'path_video': '../public/videos/7c5e00a5.mp4', 'capacity': '10269', 'time': '264.06', 'sourceLanguage': 'en', 'audio_original': '../public/videos/7c5e00a5.wav', 'srt_original': '../public/videos/7c5e00a5_output.srt', 'audio_filtered': '../public/videos/7c5e00a5_output.wav', 'srt_translated': '../public/videos/7c5e00a5_output_translated.srt', 'srt_labeled': '../public/videos/7c5e00a5_output_translated_gender_labeled.srt', 'audio_described': '../public/videos/7c5e00a5_output_translated_gender_labeled_output.wav', 'audio_overlay_described': '../public/videos/7c5e00a5_audiodescribed.wav', 'videoSubtitle': '../public/videos/7c5e00a5_subtitle.mp4', 'video_explanation': '../public/videos/7c5e00a5_audiodescribed.mp4', 'video_explanation_sub': '../public/videos/7c5e00a5_audiodescribed_explanation.mp4', 'execution_time': '261.463369'}
    

# #     {
# #     "date_time": "20240305_052828",
# #     "path_video": "../public/videos/0eb55100.mp4",
# #     "capacity": "10269",
# #     "time": "264.06",
# #     "sourceLanguage": "auto",
# #     "audio_original": "../public/videos/0eb55100.wav",
# #     "srt_original": "../public/videos/0eb55100.srt",
# #     "audio_filtered": "../public/videos/0eb55100.wav",
# #     "srt_translated": "../public/videos/0eb55100_translated.srt",
# #     "srt_labeled": "../public/videos/0eb55100_translated_gender_labeled.srt",
# #     "audio_described": "../public/videos/0eb55100_translated_gender_labeled_output.wav",
# #     "audio_overlay_described": "../public/videos/0eb55100_audiodescribed.wav",
# #     "videoSubtitle": "../public/videos/0eb55100_subtitle.mp4",
# #     "video_explanation": "../public/videos/0eb55100_audiodescribed.mp4",  
# #     "video_explanation_sub": "../public/videos/0eb55100_audiodescribed_explanation.mp4",
# #     "execution_time": "729.340097"
# # }
    
# #     {
# #     "date_time": "20240305_054449",
# #     "path_video": "../public/videos/682affdf.mp4",
# #     "capacity": "10269",
# #     "time": "264.06",
# #     "sourceLanguage": "en",
# #     "audio_original": "../public/videos/682affdf.wav",
# #     "srt_original": "../public/videos/682affdf_output.srt",
# #     "audio_filtered": "../public/videos/682affdf_output.wav",
# #     "srt_translated": "../public/videos/682affdf_output_translated.srt",  
# #     "srt_labeled": "../public/videos/682affdf_output_translated_gender_labeled.srt",
# #     "audio_described": "../public/videos/682affdf_output_translated_gender_labeled_output.wav",
# #     "audio_overlay_described": "../public/videos/682affdf_audiodescribed.wav",
# #     "videoSubtitle": "../public/videos/682affdf_subtitle.mp4",
# #     "video_explanation": "../public/videos/682affdf_audiodescribed.mp4",  
# #     "video_explanation_sub": "../public/videos/682affdf_audiodescribed_explanation.mp4",
# #     "execution_time": "217.623877"
# # }

from flask import Flask, request, jsonify
import subprocess
import json
import re
app = Flask(__name__)

@app.route('/api/createSubtitleV1', methods=['POST'])
def subtitlev1():
    data = request.get_json()
    video = data.get('video')
    sourceLanguage = data.get('sourceLanguage')
    rate = data.get('rate')
    volume = data.get('volume')
    gender = data.get('gender')
    noise = data.get('noise')
    retainSound = data.get('retainSound')
    adSubtitle = data.get('adSubtitle')
    type = data.get('type')

    if video.startswith('https://www.youtube.com'):
        command = f'python3 {type}.py {video}'
    else:
        command = f'python3 {type}.py ../public/videos/{video}'
    
    if sourceLanguage is not None:
        command += f' --l_in {sourceLanguage}'
    if rate is not None:
        command += f' -r {rate}'
    if volume is not None:
        command += f' -v {volume}'
    if gender is not None:
        command += f' --gender {gender}'
    if noise is not None:
        command += f' -noise={noise}'
    if adSubtitle is not None:
        command += f' --ad_subtitle_en={adSubtitle}'
    if retainSound is not None:
        command += f' --retain_sound={retainSound}'
    print('command')
    print(command)
    try:
        result = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)
        json_start = result.find('{')
        json_end = result.rfind('}') + 1
        json_data = result[json_start:json_end]

        # Tìm vị trí của dấu `{` đầu tiên trong chuỗi JSON
        first_bracket_index = json_data.find("{")

        # Nếu tìm thấy dấu `{` đầu tiên, tiếp tục tìm vị trí của dấu `}` đầu tiên
        if first_bracket_index != -1:
            bracket_count = 0
            for i in range(first_bracket_index, len(json_data)):
                if json_data[i] == '{':
                    bracket_count += 1
                elif json_data[i] == '}':
                    bracket_count -= 1
                    if bracket_count == 0:
                        last_bracket_index = i + 1
                        break

        # Nếu tìm thấy cả dấu `{` đầu tiên và `}` đầu tiên, chỉ lấy phần JSON
        if first_bracket_index != -1 and last_bracket_index != -1:
            json_data = json_data[first_bracket_index:last_bracket_index]

        print('json_data:')
        print(json_data)
        print('json_data:')
        # Parse chuỗi JSON thành dictionary
        result_dict = json.loads(json_data)
        print('result_dict:')
        print(result_dict)
        print('result_dict:')

        return jsonify(result_dict), 200
    except subprocess.CalledProcessError as e:
        error_message = f"Error executing command: {e.output}"
        return jsonify({"error": error_message}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(port=6000) 
    app.run(debug=True)








