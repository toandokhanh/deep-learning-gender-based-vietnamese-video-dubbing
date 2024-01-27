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

        result_dict = json.loads(json_data)

        return jsonify(result_dict), 200
    except subprocess.CalledProcessError as e:
        error_message = f"Error executing command: {e.output}"
        return jsonify({"error": error_message}), 500


if __name__ == '__main__':
    app.run(port=6000) 
    app.run(debug=True)