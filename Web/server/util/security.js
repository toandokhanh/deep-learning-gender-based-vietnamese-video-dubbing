const fs = require('fs');
const path = require('path');
const mediaRoot = path.resolve(__dirname, '../public/videos');
const ownerRoot = path.resolve(__dirname, '../storage/upload-owners');
const validName = name => typeof name === 'string' && /^[A-Za-z0-9][A-Za-z0-9_.-]{0,160}$/.test(name) && !name.includes('..');
function ownsUpload(userId, name, directory = ownerRoot) {
  if (!validName(name)) return false;
  try { return fs.readFileSync(path.join(directory, name + '.owner'), 'utf8') === String(userId); }
  catch { return false; }
}
async function ownsMedia(userId, name) {
  const Video = require('../app/models/Video');
  if (!validName(name)) return false;
  if (ownsUpload(userId, name)) return true;
  const videos = await Video.find({ user: userId }).populate('resultSubtitle');
  return videos.some(video => Object.values(video.resultSubtitle?.toObject() || {}).some(value => typeof value === 'string' && path.basename(value) === name));
}
function rateLimit(max, windowMs = 60000) {
  const windows = new Map();
  return (req, res, next) => {
    const now = Date.now();
    if (windows.size > 10000) for (const [key, value] of windows) if (value.until <= now) windows.delete(key);
    const key = req.ip;
    const value = windows.get(key);
    const current = value && value.until > now ? value : { count: 0, until: now + windowMs };
    windows.set(key, current);
    if (++current.count > max) return res.status(429).json({ success: false, message: 'Too many requests' });
    next();
  };
}
module.exports = { mediaRoot, ownerRoot, validName, ownsUpload, ownsMedia, rateLimit };
