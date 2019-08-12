const router = require('koa-router')()
// console.log('routes', router);
const home = require('./home')
const api = require('./api')
const admin = require('./admin')
const im = require('./im')
router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/im', im.routes(), im.allowedMethods())
module.exports = router