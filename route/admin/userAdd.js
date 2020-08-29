var crypto= require('crypto')
var UserCollection = require('../../model/user')
var User = UserCollection.User
var validateUser = UserCollection.validateUser

module.exports = async function(req, res, next) {

    try {
        await validateUser(req)
    } catch(err) {
        var routeParams = {
            path: '/blog-admin/operateUser',
            type: 'add',
            message: err.message
        }
        // next参数只能是字符串
        return next(JSON.stringify(routeParams))
    }

    var user = await User.findOne({ username: req.body.username })
    // 如果用户存在，用户名则已被使用
    if (user) {
        var routeParams = {
            path: '/blog-admin/operateUser',
            type: 'add',
            message: '用户名已存在'
        }
        return next(JSON.stringify(routeParams))
    }

    var md5 = crypto.createHash('md5')
    var defaultPassword = '123456'
    var password = md5.update(defaultPassword).digest('hex')
    req.body.password = password

    var user = await User.create(req.body)
    res.redirect('/blog-admin/user')
}
