const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes')
const APP = express();
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET.length < 32 || !process.env.FLASK_SERVICE_TOKEN || process.env.FLASK_SERVICE_TOKEN.length < 32) {
  throw new Error('Set distinct ACCESS_TOKEN_SECRET and FLASK_SERVICE_TOKEN values of at least 32 characters');
}
if (process.env.ACCESS_TOKEN_SECRET === process.env.FLASK_SERVICE_TOKEN) throw new Error('Use distinct session and worker secrets');
const PORT = process.env.PORT || 5000
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({extended :true}));
APP.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', credentials: true }));
APP.use(express.json());
const verifyToken = require('./app/middleware/auth');
const { validName, ownsMedia, mediaRoot, rateLimit } = require('./util/security');
APP.use('/api/auth', rateLimit(20));
APP.use('/api/video/create', rateLimit(5));
APP.use('/videos', verifyToken, async (req, res) => {
  const name = req.path.slice(1);
  try {
    if (!validName(name) || !(await ownsMedia(req.userId, name))) return res.sendStatus(404);
    return res.sendFile(path.join(mediaRoot, name));
  } catch { return res.sendStatus(404); }
});
APP.use('/images', express.static(path.join(__dirname, 'public/images'), { dotfiles: 'deny' }));



// kết nối với database
const DB = require('./config/db');
DB.connect();
// Router
route(APP)

APP.listen(PORT, () => {
    console.log('Server is running on port ' + PORT );
});
