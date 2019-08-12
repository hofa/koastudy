/**
 * 主页子路由
 */

const router = require('koa-router')()
const {index, login, logout} = require('../controllers/admin/auth')

module.exports = router
  .get('/auth', index)
  .post('/auth/login', login)
  .post('/auth/logout', logout)
