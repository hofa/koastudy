const login = async (ctx) => {
    console.log(ctx.request.body)

    ctx.sanitizeBody('username').trim()
    ctx.sanitizeBody('password').trim()
    ctx.checkBody('username').notEmpty()
    ctx.checkBody('password').notEmpty()
    // if(ctx.haveValidationError()){
        // this.body = this.validationErrors();
        // return;
    // }
    console.log(ctx.validationErrors());
    ctx.response.status = 200
    ctx.body = {
        "code": 1,
        "msg" : "hello world"
    }
}

module.exports = {
    login
}