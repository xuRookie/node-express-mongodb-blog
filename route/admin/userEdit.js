var crypto= require('crypto')
var UserCollection = require('../../model/user')
var User = UserCollection.User
var validateUser = UserCollection.validateUser

module.exports = async function(req, res, next) {

    var id = req.query.id
    try {
        await validateUser(req)
    } catch(err) {
        var routeParams = {
            path: '/admin/operateUser',
            type: 'edit',
            id: id,
            message: err.message
        }
        // next参数只能是字符串
        return next(JSON.stringify(routeParams))
    }

    // // 可以针对查找的用户密码比对
    // var user = await User.findOne({ _id: id })
    await User.updateOne({_id: id}, {
        username: req.body.username,
        email: req.body.email,
        sex: req.body.sex,
        age: req.body.age,
        role: req.body.role,
        status: req.body.status,
    })
    res.redirect('/admin/user')
}
