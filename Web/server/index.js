const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes')
const APP = express();
const dotenv = require("dotenv");
const path = require('path');
dotenv.config();
const PORT = process.env.PORT || 5000
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({extended :true}));
APP.use(cors());
APP.use(express.json());
APP.use(express.static(path.join(__dirname, 'public')));



// kết nối với database
const DB = require('./config/db');
DB.connect();
// Router
route(APP)

APP.listen(PORT, () => {
    console.log('Server is running on port ' + PORT );
});
