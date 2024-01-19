const express = require('express');
const VideoController = require('../app/controllers/VideoController')
const router = express.Router();
const verifyToken = require('../app/middleware/auth');

router.get('/getallvideo/subtitle', verifyToken, VideoController.getSubtitleVideoAll);//localhost:5000/api/video/getall
router.get('/get/subtitle/detail/:id', verifyToken, VideoController.getVideoSubtitleDetail);//localhost:5000/api/video/get/subtitle/detail/32323_3213213
router.post('/create/subtitle/v1', verifyToken, VideoController.createSubtitle);//localhost:5000/api/video/create/subtitle/cli

module.exports = router;