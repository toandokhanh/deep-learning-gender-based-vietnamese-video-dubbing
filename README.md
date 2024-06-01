<h6 align="left">Author: <a href="https://github.com/toandokhanh">Do Khanh Toan<a/> </h6>

## Generating Dubbed and narrated videos based on speakers’ gender identification using deep learning techniques

## Introduction
The purpose of the project is to create high quality, highly accurate Vietnamese dubbed or dubbed videos with high subtitle and gender classification models while meeting diverse user needs.

## How well does it work?
![alt text](image.png)

Above is the application's workflow, it must operate through 4 main modules and the modules will depend on each other. The input will be a foreign language video, the output will be a Vietnamese video (with subtitles, dubbing, narrating, dubbing, and narrating subtitles)

#### Module 1
![alt text](z_module1.jpg)
#### Module 2
![alt text](image-1.png)
#### Module 3
![alt text](image-2.png)
#### Module 4.1
![alt text](image-3.png)
#### Module 4.2
![alt text](image-4.png)

## Gender classification using deep learning methods
We propose a process. The first step is to apply audio preprocessing, which includes methods such as Noise Reduction, Audio Extraction, and Matched Audio Filtering. Next, we use the MFCC (Mel Frequency Cepstral Cofactors) image preprocessing method. Finally, the input data are fed into the VGG16 and ResNet34 gender classification models. The model is trained to predict gender based on the extracted audio features. The output of the model is a gender label, representing "male" or "female". This process integrates multiple information steps, helping us effectively extract audio features to achieve accurate results in gender classification.

![alt text](images/model2%20(2).jpg)


#### MFCC preprocessing steps

![alt text](images/tienxulyamthanh.jpg)

## Results of gender classification model
![alt text](images/result_based_data.png)
#### Source of data sets
- AudioMNIST: Becker, S., Vielhaben, J., Ackermann, M., M ̈uller, K.-R., Lapuschkin, S., Samek, W.: Audiomnist:  xploring explainable artificial intelligence for audio analysis on a simple benchmark. Journal of the Franklin Institute
361(1), 418–428 (2024)
- TIMIT: Garofolo, J., Lamel, L., Fisher, W., Fiscus, J., Pallett, D., Dahlgren, N., Zue, V.: Timit acoustic-phonetic continuous speech corpus. Linguistic
Data Consortium (1992)
- RAVDESS: Livingstone, S.R., Russo, F.A.: The ryerson audio-visual database of emo-tional speech and song (ravdess): A dynamic, multimodal set of facial and vocal expressions in north american english. PLOS ONE 13(5), 0196391 (2018)
- CTU & COMMON: Nguyen, H.T., Thanh, T.N.L., Ngoc, T.L., Le, A.D., Tran, D.T.: Eval-uation on noise reduction in subtitle generator for videos. In: Innova-tive Mobile and Internet Services in Ubiquitous Computing, pp. 140–150. Springer (2022)

![alt text](images/result_4typedata.png)

## User Interface Design
![alt text](image-5.png)
![alt text](image-6.png)
![alt text](image-8.png)
![alt text](image-7.png)

## Result Video
- Original video

    <video width="640" height="480" controls>
    <source src="videos/45c723dd.mp4" type="video/mp4">
    </video>

- Video subtitles

    <video width="640" height="480" controls>
    <source src="videos/45c723dd_subtitle.mp4" type="video/mp4">
    </video>

- Video narrated

    <video width="640" height="480" controls>
    <source src="videos/45c723dd_audiodescribed.mp4" type="video/mp4">
    </video>

- Narrated video with original subtitles

    <video width="640" height="480" controls>
    <source src="videos/45c723dd_audiodescribed_explanation.mp4" type="video/mp4">
    </video>


- Video dubbed

    <video width="640" height="480" controls>
    <source src="videos/a81a62bf_audiodescribed.mp4" type="video/mp4">
    </video>

- dubbed video with original subtitles

    <video width="640" height="480" controls>
    <source src="videos/a81a62bf_audiodescribed_explanation.mp4" type="video/mp4">
    </video>


## Demo
- Video dubbed: 

    [![Video dubbed](https://img.youtube.com/vi/wLxSIL7UOUA/0.jpg)](https://www.youtube.com/watch?v=wLxSIL7UOUA)

- Video narrated:

    [![Video narrated](https://img.youtube.com/vi/uIyh93FBa2U/0.jpg)](https://www.youtube.com/watch?v=uIyh93FBa2U)

- Thesis defense (May 15, 2024):

    [![Thesis defense](https://img.youtube.com/vi/MAtX8bfNNy4/0.jpg)](https://www.youtube.com/watch?v=MAtX8bfNNy4)
