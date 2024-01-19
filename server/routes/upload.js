const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/video', upload.single('inputFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const videoData = req.file.buffer;
  const fileName = req.file.originalname;
  const uploadPath = './public/videos/' + fileName;
  
  if (req.file.mimetype !== 'video/mp4') {
    return res.status(400).json({ error: 'File is not a video MP4' });
  }

  fs.writeFile(uploadPath, videoData, (error) => {
    if (error) {
      console.error('Error saving video:', error);
      return res.status(500).json({ error: 'Error saving video' });
    }

    console.log('Video saved successfully');
    res.status(200).json({ message: 'Video uploaded and saved' });
  });
});



module.exports = router;
