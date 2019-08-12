const path = require('path')
const Koa = require('koa2')
const convert = require('koa-convert')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('./../config')
const routers = require('./routers/index')
// console.log('zp', routers)
const app = new Koa()
const catchError = require('./middlewares/exception')
const sessionMysqslConfig = {
    user: config.database.username,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
}

validator = require('koa-validator')

app.use(convert(validator({
    onValidationError: function(errMsg){
        console.log('Validation error:', errMsg);
    }
})))

app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqslConfig)
}))

app.use(koaLogger())
app.use(bodyParser())
app.use(koaStatic(
    path.join(__dirname, './../static')
))
app.use(views(
    path.join(__dirname, './views'),
    {
        extension: 'ejs'
    }
))
// app.use(async (ctx) => {
//     ctx.body = ctx.request.body
// })
app.use(catchError)
// console.log('rp', routers)
app.use(routers.routes()).use(routers.allowedMethods())

global.config = config
global.err = require('./utils/http-exception')

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
app.listen(config.port)
// console.log(`the server is start at port ${config.port}`)