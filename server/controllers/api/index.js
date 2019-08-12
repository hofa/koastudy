const list = async (ctx) => {
    // ctx.log.error("aaah!!")
    throw new global.err.AuthFailed()
    console.log(global.config)
    ctx.response.status = 200
    ctx.body = {
        "code": 1,
        "msg": "hello world"
    }
}

const info = async (ctx) => {
    console.log(global.config)
    ctx.response.status = 200
    ctx.body = {
        "code": 1,
        "msg": "hello world"
    }
}

const add = async (ctx) => {
    console.log(global.config)
    ctx.response.status = 200
    ctx.body = {
        "code": 1,
        "msg": "hello world"
    }
}

const upd = async (ctx) => {
    console.log(global.config)
    ctx.response.status = 200
    ctx.body = {
        "code": 1,
        "msg": "hello world"
    }
}

const del = async (ctx) => {
    console.log(global.config)
    ctx.response.status = 200
    ctx.body = {
        "code": 1,
        "msg": "hello world"
    }
}

module.exports = { list, info, add, upd, del }