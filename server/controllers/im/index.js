const db = require('./../../models/')
const User = db.User

index = async (ctx) => {
    const title = 'home'
    await ctx.render('im/index', {
        title
    })
}

login = async (ctx) => {
    const title = 'home'
    const res = await User.findOne({ where: { mobile: ctx.body.username } })
    await ctx.render('im/index', {
        title
    })
}

register = async (ctx) => {
    const title = 'home'
    // console.log(ctx.req)
    const res = await User.create({ mobiel: ctx.body.username, password: ctx.body.password })
    await ctx.render('im/index', {
        title
    })
}

module.exports = {
    index,
    login,
    register
}