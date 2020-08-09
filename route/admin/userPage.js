var UserCollection = require('../../model/user')
var User = UserCollection.User

module.exports = async function(req, res) {
    // 标识 标识当前访问的页面呢
    req.app.locals.currentLink = 'user'
    var page = req.query.page || 1
    var pageSize = 10

    // 数据总数
    var count = await User.countDocuments({})
    var total = Math.ceil(count / pageSize)

    var start = (page - 1) * pageSize

    var users = await User.find({}).limit(pageSize).skip(start)

    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    })
}
