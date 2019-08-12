// const UserModel = require('./../models/user')
const db = require('./../models/')
const User = db.User
// const Sequelize = require('sequelize')

module.exports = async (ctx) => {
    const title = 'home'
    // const user = UserModel(db, Sequelize)
    // const a = await User.findOne()
    const id = 1
    // console.log(await User.findOne({where: {id}}))
    console.log(global.config)
    await ctx.render('index', {
        title
    })
}