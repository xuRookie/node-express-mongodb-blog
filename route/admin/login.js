var crypto = require('crypto')
var UserCollection = require('../../model/user')
var User = UserCollection.User

var login = async function(req, res) {
    var username = req.body.username
    var password = req.body.password

    if (!username.trim()) {
        return res.status(400).render('admin/login', {
            msg: '用户名不能为空'
        })
    }
    if (!password.trim()) {
        return res.status(400).render('admin/login', {
            msg: '密码不能为空'
        })
    }
    var md5 = crypto.createHash('md5')
    password = md5.update(password).digest('hex')
    var result = await User.findOne({ username: username })
    if (result) {
        if (password == result.password) {
            req.session.username = result.username
            req.session.role = result.role
            req.app.locals.userInfo = result
            if (result.role == 'admin') {
                res.redirect('/blog-admin/index')
            } else {
                res.redirect('/blog-home')
            }
        } else {
            res.status(400).render('admin/login', {
                msg: '用户名或密码错误'
            })
        }
    } else {
        res.status(400).render('admin/login', {
            msg: '用户名或密码错误'
        })
    }
}

module.exports = login
