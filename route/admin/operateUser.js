// var ObjectId = require('mongodb').ObjectId
var UserCollection = require('../../model/user')
var User = UserCollection.User

module.exports = async function(req, res) {
    // 标识 标识当前访问的页面呢
    req.app.locals.currentLink = 'user'
    var params = req.query

    if (params.id) {
        var user = await User.findOne({ _id: params.id })
        res.render('admin/operateUser', {
            user: user,
            type: params.type,
            msg: params.massage,
            link: '/blog-admin/userEdit?id=' + params.id
        })
    } else {
        res.render('admin/operateUser', {
            type: params.type,
            user: {},
            msg: params.massage,
            link: '/blog-admin/userAdd'
        })
    }
}
