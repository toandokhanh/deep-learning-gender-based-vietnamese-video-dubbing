const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController')

router.get('/getall', siteController.getLangaugeAll); // localhost:3000/api/getall


module.exports = router;