const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Language = require('../models/Language');
class SiteController {
    index(req, res,next ){
        req.send('https://github.com/toandokhanh/App-summarizes-content-video');
    }


    async getLangaugeAll(req, res ){
        const langauge = await Language.find();
        if (!langauge) {
            return res
                .status(404)
                .json({ success: false, message: 'Langauges Not found!' });
        }
        return res
            .status(200)
            .json({ success: true, message: 'OK',languages: langauge });
    }

}

module.exports = new SiteController;