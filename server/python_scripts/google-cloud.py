import argparse
import os,sys
from regex import F
from datetime import datetime
import utils.srtToTxt as srt_to_txt #handle_save_log.py
from utils.srtToTxt import srt_to_txt
import noisereduce as nr
import soundfile as sf
import librosa
from noisereduce.generate_noise import band_limited_noise
import time
import pytube
import uuid
import re
from utils.utils import str2bool, read_video_info
import subtitle.createsub as createsub # 01
import utils.gender_labeling as gender_labeling #02
import utils.SRTToWAV as SRTToWAV #03
import utils.overlay_audio_on_video as overlay_audio_on_video #04
import utils.createVideoOutput as createVideoOutput #05
import json
from time import gmtime, strftime

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('source_path', 
                        help="Path to the video or audio file to subtitle", nargs='?') 
    parser.add_argument('-r', '--rate', type=int, default=10, 
                        help='Rate for speech (default: 10)') 
    parser.add_argument('-v', '--volume', type=int, default=50, 
                        help='Volume for speech (default: 50)')
    parser.add_argument("-ms", "--ms_start", type=int, default=0, 
                        help="Start time in milliseconds for overlaying the audio on the video.")
    parser.add_argument("--ad_subtitle_en", type=str2bool, default=False, 
                        help="Create a voice-over video with English subtitles?")
    parser.add_argument("--retain_sound", type=str2bool, default=True, 
                        help="retain the original sound")
    parser.add_argument('-s', '--l_in',default="en", 
                        help='---> truyền ngôn ngữ file đầu vào')
    parser.add_argument('-d', '--l_out',default="vi",
                        help='---> truyền ngôn ngữ file cần xuất')
    parser.add_argument('-txt', '--file_txt', 
                        help='---> chuyển về folder srt thành txt để so sánh độ chính xác')
    parser.add_argument('-noise','--algorithm_noise',default="deep",
                        help="---> Chọn thuật toán giảm nhiễu")
    parser.add_argument('-n','--new_name',
                        help="---> Đặt lại với tên mới")
    parser.add_argument("--gender", type=str, default="auto", choices=[
                            "auto", "female", "male"], help="Gender recognition for Text To Speech model")

    args = parser.parse_args()

    try: 
        newname = args.new_name
        noises = args.algorithm_noise
        # file_output = args.dir_op
        lang_in = args.l_in
        lang_out = args.l_out
        path_txt = args.file_txt
        ad_subtitle_en: bool = args.ad_subtitle_en
    except:
        print('')
    
    time_text = str(strftime("%Y%m%d_%H%M%S", gmtime())) 
    folder = time_text
    # os.mkdir(folder)
    # os.mkdir(folder)
    # checkfolder(folder)
    # start_time = time.time()
    start_time = datetime.now()
    # directory = args.source_path
    video_input = args.source_path # video gốc
    if video_input.startswith('https://www.youtube.com'):
        video_path = download_youtube_video(video_input, '../public/videos')
        print("Video youtube đã được lưu vào: "+ video_path)
        video_input = video_path

    # Lấy ra đường dẫn chứa file
    path = os.path.dirname(video_input) + '/' 
    # Lấy ra tên file nhập vào có cả duôi file
    file = os.path.basename(video_input)

    # Lấy ra tên file
    name1 = os.path.splitext(file)
    name = name1[0]
    
    
    # if not (os.path.exists(path)):
    #     os.mkdir(path) 
    mp4_to_wav(path+file,path,name)
    if not newname:
        newname = name
    
    if noises:
        # Giảm nhiễu dùng thuật toán deepfilter
        if noises == 'deep':
            noise_deepfilternet(path+name+'.wav',path)
            deep = '_DeepFilterNet3.wav'
            rename(path+name+deep,path+newname+'_output.wav')
            # wav_to_flac(path+newname+'.wav',path+newname+'.flac')

            pass
        # Giải thuật giảm nhiễu Noisereduce (không cố định)
        elif noises == 'noise':
            noise_reduce(path+name+'.wav',path+newname+'_output.wav')
            # wav_to_flac(path+newname+'.wav',path+newname+'.flac')
        else:
        # Không chọn giải thuật
            rename(path+name+'.wav',path+newname+'.wav')
            pass
    source = path+newname+'_output.wav'
    # Tạo phụ đề
    createsub.main(source,lang_in,lang_out)
    if path_txt:
        srt_to_txt(path+newname+'_output.srt',path_txt,newname)
    else:
        srt_to_txt(path+newname+'_output.srt',path,newname)
    # Gộp phụ đề với FFmpeg
    srt_output = '';
    if lang_in == lang_out:
        if name != newname:
            videoOutput(path+file,path+newname+'_output.srt',path+newname+'.mp4')
        else:
            videoOutput(path+file,path+newname+'_output.srt',path+newname+'_subtitle.mp4')
            srt_output = path+newname+'_output.srt'
    else:
        if name != newname:
            videoOutput(path+file,path+newname+'_output_translated.srt',path+newname+'.mp4')
        else:
            videoOutput(path+file,path+newname+'_output_translated.srt',path+newname+'_subtitle.mp4')
            srt_output = path+newname+'_output_translated.srt'
    
    
    wav_input = path+newname+'.wav' # audio gốc
    wav_output = path+newname+'_output.wav' # audio đã lọc nhiễu
    video_output = path+newname+'_subtitle.mp4' # video phụ đề
    path_txt = path+name+'.txt'
    srt_original = path+newname+'_output.srt'
    srt_output = srt_output # file phụ đề (.srt)
    print("Hoàn thành bước tạo phụ đề")
    # srt_labeled = gender_labeling.split_and_predict(srt_output, wav_output)
    # print("path srt đã được gắn nhãn: "+ srt_labeled)
    if args.gender == 'auto':
        # gender classification and labels
        srt_labeled = gender_labeling.split_and_predict(srt_output, wav_output)
        print("path srt đã được gắn nhãn tự động phân loại: "+ srt_labeled)
    if args.gender == 'female':
        srt_labeled = gender_labeling.label_srt_file(srt_output, "(0)")
        print("path srt đã được gắn nhãn nữ: "+ srt_labeled)
    if args.gender == 'male':
        srt_labeled = gender_labeling.label_srt_file(srt_output, "(1)")
        print("path srt đã được gắn nhãn nam: "+ srt_labeled)


    captions = SRTToWAV.process_srt(srt_labeled)
    output_audio_path = SRTToWAV.text_to_speech(captions, srt_labeled, args.rate, args.volume)
    print(f"path wav thuyết minh: {output_audio_path}")

    audiodescribed_wav_path = overlay_audio_on_video.process_audio(wav_input, output_audio_path, args.ms_start, args.retain_sound)
    print("path wav thuyết minh được phủ với wav gốc:", audiodescribed_wav_path)
    
    audiodescribed_video_path = overlay_audio_on_video.merge_video_and_audio(video_input, audiodescribed_wav_path)
    print("path video thuyết minh:", audiodescribed_video_path)
    print("Hoàn thành bước 4 tạo video thuyết minh")
    ad_subtitle_video_path= None
    if ad_subtitle_en:
        ad_subtitle_video_path  = createVideoOutput.createAudiodescribed(audiodescribed_video_path, path+newname+'_output.srt')
        print("path video thuyết minh có phụ đề:", ad_subtitle_video_path)
        print("Hoàn thành bước 5 tạo video thuyết minh có phụ đề")

    capacity, time = read_video_info(video_input)
    end_time = datetime.now()
    print("Thời gian thực thi là: "+ str(end_time-start_time))
    return {
            "date_time": time_text,
            "path_video": video_input,
            "capacity": capacity,
            "time": time,
            "sourceLanguage": lang_in,
            "audio_original": wav_input,
            "srt_original": srt_original,
            "audio_filtered": wav_output,
            "srt_translated":srt_output,
            "srt_labeled": srt_labeled,
            "audio_described":output_audio_path,
            "audio_overlay_described":audiodescribed_wav_path,
            "videoSubtitle": video_output,
            "video_explanation":audiodescribed_video_path,
            "video_explanation_sub":ad_subtitle_video_path,
            "execution_time" : str(end_time-start_time)
            }
    
def mp4_to_wav(filename,output,name):
    os.system('ffmpeg -i {} -ar 44100 {}/{}.wav'.format(filename,output,name))

def noise_deepfilternet(file,file_out):
    os.system('deepFilter {} -o {}'.format(file,file_out))
    print("Đã giảm tiếng ồn DeepFilterNet")
    print('')


def noise_reduce(file,file_out):
    y, sr = librosa.load(file)
    reduced_noise = nr.reduce_noise(y = y, sr=sr, thresh_n_mult_nonstationary=2,stationary=False)
    sf.write(file_out,reduced_noise, sr, subtype='PCM_24')
    print('')

def rename(filename,newname): 
    os.rename(filename, newname)



def wav_to_flac(filename,output):
    os.system('ffmpeg -y -f wav -i {} -write_xing 0 -f flac {}'.format(filename,output))


def videoOutput(file_in,file_srt,file_out):
        # print(file_in, file_srt, file_out)
        subtitle_options = "force_style='Fontsize=20,PrimaryColour=&H00FFFFFF,BackColour=&H80000000,BorderStyle=3,Outline=1,Shadow=0'"
        os.system(f'ffmpeg -y -i "{file_in}" -vf "subtitles=\'{file_srt}\':{subtitle_options},scale=1280:720" "{file_out}"')

def checkfolder (path):
    # path = 'tmp'
    isExist = os.path.exists(path)
    if not isExist:
        # Create a new directory because it does not exist
        os.makedirs(path)


def download_youtube_video(url, path):
    yt = pytube.YouTube(url)

    video_id_match = re.search(r'([a-zA-Z0-9_-]+)\.mp4$', yt.title)
    if video_id_match:
        video_id = video_id_match.group(1)
    else:
        video_id = str(uuid.uuid4().hex)[:8]

    # Tạo tên file mới
    video_name = f"{video_id}.mp4"
    
    # Thêm đường dẫn đầy đủ
    video_path = os.path.join(path, video_name)
    
    stream = yt.streams.filter(file_extension='mp4').first()
    stream.download(output_path=path, filename=video_name)
    
    return video_path
if __name__ == "__main__":
    result = main()
    print("--------------------------------END--------------------------------")
    print(json.dumps(result, indent=4))