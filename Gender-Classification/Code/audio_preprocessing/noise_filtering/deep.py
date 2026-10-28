from deep_filter import enhance_audio
import os
from glob import glob


def noise_deepfilternet(file, file_out):
    return enhance_audio(file, file_out)


def rename(filename, newname):
    os.rename(filename, newname)


files = sorted(glob("../wav_deep/*.wav"), key=os.path.getmtime)
for file in files:
    path = file[: file.rindex("/") + 1]
    nameFile = file[file.rindex("/") + 1 : file.rindex(".")]
    noise_deepfilternet(file, path)
    rename(path + nameFile + "_DeepFilterNet2.wav", file)
    print(file)
