import pysrt
import os

def srt_to_txt(file,out_file,name):
    subs = pysrt.open(file)
    with open(out_file+'/'+name+'.txt','w',encoding='utf-8') as f:
        for sub in subs:
            f.write(sub.text.lower()+' ')



def srt_to_txt_v2(input_srt_path):
    if not os.path.exists(input_srt_path):
        print(f"File {input_srt_path} không tồn tại.")
        return
    file_name, _ = os.path.splitext(os.path.basename(input_srt_path))

    output_txt_path = os.path.join(os.path.dirname(input_srt_path), f"{file_name}.txt")

    try:
        subs = pysrt.open(input_srt_path)

        with open(output_txt_path, 'w', encoding='utf-8') as f:
            for sub in subs:
                f.write(sub.text.lower() + ' ')

        print(f"Chuyển đổi thành công. File txt được lưu tại: {output_txt_path}")
        return output_txt_path

    except Exception as e:
        print(f"Lỗi khi chuyển đổi: {e}")
