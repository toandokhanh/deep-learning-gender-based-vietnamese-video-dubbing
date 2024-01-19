from flask import Flask, request, jsonify
import subprocess
import json
import re
app = Flask(__name__)

@app.route('/api/createSubtitleV1', methods=['POST'])
def subtitlev1():
    # Nhận dữ liệu từ request
    data = request.get_json()
    video = data.get('video')
    sourceLanguage = data.get('sourceLanguage')
    rate = data.get('rate')
    volume = data.get('volume')
    gender = data.get('gender')
    adSubtitle = data.get('adSubtitle')
    type = data.get('type')

    # Gọi script Python từ Flask
    command = f'python3 {type}.py ../public/videos/{video} --l_in {sourceLanguage}'
    
    # Thêm các tham số có giá trị không phải None vào lệnh
    if rate is not None:
        command += f' -r {rate}'
    if volume is not None:
        command += f' -v {volume}'
    if gender is not None:
        command += f' --gender {gender}'
    if adSubtitle is not None:
        command += f' --ad_subtitle_en={adSubtitle}'

    print('command')
    print(command)
    try:
        # Thực hiện lệnh và nhận output
        result = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)
        
        # Tìm vị trí của chuỗi JSON trong output và chỉ lấy phần đó
        json_start = result.find('{')
        json_end = result.rfind('}') + 1
        json_data = result[json_start:json_end]

        # Chuyển đổi chuỗi JSON thành dictionary
        result_dict = json.loads(json_data)

        # Trả về kết quả dưới dạng JSON
        return jsonify(result_dict), 200
    except subprocess.CalledProcessError as e:
        # Xử lý lỗi nếu có
        error_message = f"Error executing command: {e.output}"
        return jsonify({"error": error_message}), 500


        
if __name__ == '__main__':
    app.run(port=6000) 
    app.run(debug=True)