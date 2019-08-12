/**
 * 主页子路由
 */

const router = require('koa-router')()
const {list, info, add, upd, del} = require('../controllers/api')
const auth = require('../controllers/api/auth')
module.exports = router
  .get('/user', list)
  .get('/user/{id}', info)
  .post('/user', add)
  .patch('/user/{id}', upd)
  .delete('/user/{id}', del)
  .post('/auth/login', auth.login)
