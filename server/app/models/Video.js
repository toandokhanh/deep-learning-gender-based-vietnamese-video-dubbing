const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const videosSchema = new mongoose.Schema({
  date_time: {type: String, require: true ,unique: true},
  path_video: {type: String, require: true},
  capacity: {type: Number},
  time: {type: String},
  sourceLanguage: {
    type: ObjectId,
    ref: 'Language'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  resultSubtitle: {
    type: ObjectId,
    ref: 'ResultSubtitle'
  },
});

const Video = mongoose.model('Video', videosSchema);

module.exports = Video;
