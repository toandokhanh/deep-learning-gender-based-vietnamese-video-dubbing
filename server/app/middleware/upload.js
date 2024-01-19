// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + path.basename(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

module.exports = upload.single('videoFile');
