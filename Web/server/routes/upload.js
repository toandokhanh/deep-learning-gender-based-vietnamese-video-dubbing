const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const verifyToken = require('../app/middleware/auth');
const { mediaRoot, ownerRoot, rateLimit } = require('../util/security');
const router = express.Router();
fs.mkdirSync(mediaRoot, { recursive: true });
fs.mkdirSync(ownerRoot, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({ destination: mediaRoot, filename: (req, file, cb) => cb(null, crypto.randomBytes(16).toString('hex') + '.mp4') }),
  limits: { fileSize: 256 * 1024 * 1024, files: 1, fields: 0 },
  fileFilter: (req, file, cb) => cb(null, file.mimetype === 'video/mp4' && path.extname(file.originalname).toLowerCase() === '.mp4'),
}).single('inputFile');
router.post('/video', verifyToken, rateLimit(5), (req, res) => {
  upload(req, res, error => {
    if (error || !req.file) return res.status(400).json({ error: 'Upload a single MP4 file, at most 256 MiB' });
    let fd;
    try {
      fd = fs.openSync(req.file.path, 'r');
      const header = Buffer.alloc(12);
      const length = fs.readSync(fd, header, 0, 12, 0);
      if (length < 12 || header.toString('ascii', 4, 8) !== 'ftyp') throw new Error('Invalid MP4 header');
      fs.writeFileSync(path.join(ownerRoot, req.file.filename + '.owner'), String(req.userId), { flag: 'wx', mode: 0o600 });
      return res.status(201).json({ message: 'Video uploaded', fileName: req.file.filename });
    } catch {
      fs.rmSync(req.file.path, { force: true });
      return res.status(400).json({ error: 'Invalid video upload' });
    } finally { if (fd !== undefined) fs.closeSync(fd); }
  });
});
module.exports = router;
