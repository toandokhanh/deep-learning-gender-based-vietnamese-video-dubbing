const Video = require('../models/Video')
const ResultSubtitle = require('../models/ResultSubtitle')
const Language = require('../models/Language')
const request = require('request')
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const accessAsync = promisify(fs.access);
const readFileAsync = promisify(fs.readFile);
class VideoController{
    
    // [GET] localhost:5000/video
    index(req, res){
        // NoiseReduction.find()
        //     .then((NoiseReductions) => {
        //         res.json(NoiseReductions)
        //     })
        //     .catch(error);
    }

    async getSubtitleVideoAll(req, res) {
        try {
            const videosWithResultSubtitle = await Video.find({ 
                user: req.userId, 
                resultSubtitle: { $exists: true }  // Tìm các video có trường resultSubtitle tồn tại
            });
            // Simple validation
            if (!videosWithResultSubtitle || videosWithResultSubtitle.length === 0) {
                return res
                    .status(404)
                    .json({ success: false, message: 'No videos with subtitles found!' });
            }
    
            return res
                .status(200)
                .json({ success: true, message: 'OK', videosWithResultSubtitle });
        } catch (error) {
            console.error('Error fetching videos with subtitles:', error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }

    async getVideoSubtitleDetail(req, res) {
        const videoId = req.params.id
        if (!videoId)
            return res
                .status(400)
                .json({ success: false, message: 'Video ID not found' })
        try {
            const video = await Video.findOne({ date_time: videoId });
            if (!video)
                return res
                    .status(400)
                    .json({ success: false, message: 'Video not found' }) 
            const videoResult = await ResultSubtitle.findOne({ _id: video.resultSubtitle});
            if(!videoResult)
                return res
                        .status(400)
                        .json({ success: false, message: 'Result subtitle not found!' })
            // all good
            return res
                .status(200)
                .json({ success: true, message: 'ok' , result:videoResult})
        } catch (error) {
            console.log(error);
                    res.status(500).json({success: false, message:'Internal Server Error'});
        }
    };


    async createSubtitle(req, res) {
        try {
            const { video, sourceLanguage, type, rate, volume, gender, noise, adSubtitle, retainSound } = req.body;
            console.log(req.body)
            // Simple validation
            if (!video || !type) {
                return res.status(400).json({ success: false, message: 'Lack of information' });
            }
    
            // Call FLASK API (app.py)
            const dataToSend = req.body;
            const apiUrl = process.env.FLASKAPI_URL;
            const extractFileNameFromPath = (path) => {
                const parts = path.split('/');
                if (parts.length >= 3) {
                    return parts[3];
                } else {
                    return null;
                }
            }
            request.post(
                {
                    url: apiUrl+'/createSubtitleV1', 
                    json: dataToSend
                },
                async (error, response, body) => {
                    
                    if (error) {
                        console.error('Error while calling API FLASK:', error);
                        return res.status(500).json({ success: false, message: 'Server internal error' });
                    } else {
                        
                        try {
                            
                            const {
                                date_time,
                                path_video,
                                capacity,
                                time,
                                sourceLanguage,
                                audio_original,
                                srt_original,
                                audio_filtered,
                                srt_translated,
                                srt_labeled,
                                audio_described,
                                audio_overlay_described,
                                videoSubtitle,
                                video_explanation,
                                video_explanation_sub,
                                execution_time,
                            } = body; // Parse the JSON response
                            const sourceLanguageId = await Language.findOne({ id: sourceLanguage })
                            if (!sourceLanguageId)
                                return res
                                    .status(400)
                                    .json({ success: false, message: 'Sevice not found!' })
                                const newResultSubtitle = new ResultSubtitle({
                                    audio_original: extractFileNameFromPath(audio_original),
                                    srt_original: extractFileNameFromPath(srt_original),
                                    audio_filtered: extractFileNameFromPath(audio_filtered),
                                    srt_translated: extractFileNameFromPath(srt_translated),
                                    srt_labeled: extractFileNameFromPath(srt_labeled),
                                    audio_described: extractFileNameFromPath(audio_described),
                                    audio_overlay_described: extractFileNameFromPath(audio_overlay_described),
                                    videoSubtitle: extractFileNameFromPath(videoSubtitle),
                                    video_explanation: extractFileNameFromPath(video_explanation),
                                    video_explanation_sub: video_explanation_sub ? extractFileNameFromPath(video_explanation_sub) : undefined,
                                    execution_time: execution_time,
                                    type: type
                                });
                                    
                            await newResultSubtitle.save();
    
                            const newVideo = new Video({
                                date_time: date_time,
                                path_video: path_video,
                                capacity: capacity,
                                time: time,
                                sourceLanguage: sourceLanguageId,
                                user: req.userId,
                                resultSubtitle:newResultSubtitle._id
                            });
                            await newVideo.save();
    
                            res.status(200).json({ success: true, message: 'Video Subtitle created successfully', newVideo });
                        } catch (error) {
                            console.error('Error accessing/reading files:', error);
                            res.status(500).json({ success: false, message: 'Server internal error' });
                        }
                    }
                }
            );
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Server internal error' });
        }
    }
}



module.exports = new VideoController;