const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose')
class SiteController {
    index(res, req, next ){
        req.send('https://github.com/toandokhanh/App-summarizes-content-video');
    }
}

module.exports = new SiteController;