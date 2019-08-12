/**
 * 主页子路由
 */

const router = require('koa-router')()
const { index, login, register } = require('../controllers/im')

module.exports = router
    .get('/', index)
    .post('/login', login)
    .post('/register', register)
