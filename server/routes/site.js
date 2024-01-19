const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController')

router.get('/', siteController.index); // localhost:3000/api


module.exports = router;