// const siteRouter = require('./site')
const videoRouter = require('./video')
const authRouter = require('./auth')
const uploadRouter = require('./upload')
const languageRouter = require('./langauge')
function route(APP) {
    // APP.use('/api', siteRouter);
    APP.use('/api/video', videoRouter);
    APP.use('/api/auth', authRouter);
    APP.use('/api/upload', uploadRouter);
    APP.use('/api/language', languageRouter);
}

module.exports = route;