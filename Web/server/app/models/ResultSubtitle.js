const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ResultSubtitleSchema = new mongoose.Schema ({
    audio_original: {type: String},
    srt_original: {type: String},
    audio_filtered: {type: String},
    srt_translated: {type: String},
    srt_labeled: {type: String},
    audio_described: {type: String},
    audio_overlay_described: {type: String},
    videoSubtitle: {type: String},
    video_explanation: {type: String},
    video_explanation_sub: {type: String},
    execution_time: {type: String},
    type: {type: String}
    });

const ResultSubtitle = mongoose.model('ResultSubtitle',ResultSubtitleSchema);

module.exports = ResultSubtitle;