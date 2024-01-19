// const siteRouter = require('./site')
const videoRouter = require('./video')
const authRouter = require('./auth')
const uploadRouter = require('./upload')
function route(APP) {
    // APP.use('/api', siteRouter);
    APP.use('/api/video', videoRouter);
    APP.use('/api/auth', authRouter);
    APP.use('/api/upload', uploadRouter);
}

module.exports = route;