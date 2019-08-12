const index = async (ctx) => {
    const title = "登录"
    await ctx.render('admin/auth/index', {
        title
    })
}

const login = async (ctx) => {
    // console.log(global.config)
    console.log(ctx)
    await ctx.render('admin/validator-error', {
        
    })
}

const logout = async (ctx) => {
    console.log(global.config)
    ctx.response.status = 200
    ctx.body = {
        "code": 1,
        "msg" : "hello world"
    }
}

module.exports = {
    index,
    login,
    logout
}