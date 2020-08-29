var Joi = require('@hapi/joi')
var crypto = require('crypto')
var UserCollection = require('../../model/user')
var User = UserCollection.User
var validateRegister = UserCollection.validateRegister

module.exports = async function(req, res) {
    var username = req.body.username
    var password = req.body.password
    var repassword = req.body.repassword

    if (!username.trim()) {
        return res.status(400).render('admin/register', {
            msg: '用户名不能为空'
        })
    }
    if (!password.trim()) {
        return res.status(400).render('admin/register', {
            msg: '密码不能为空'
        })
    }
    if (!repassword.trim()) {
        return res.status(400).render('admin/register', {
            msg: '确认密码不能为空'
        })
    }
    if (password !== repassword) {
        return res.status(400).render('admin/register', {
            msg: '两次输入密码不一致'
        })
    }

    var result = await User.findOne({ username: username })
    if (result) {
        res.status(400).render('admin/register', {
            msg: '该用户已存在'
        })
    } else {
        try {
            var validate = await validateRegister(req)
            var md5 = crypto.createHash('md5')
            var password = md5.update(validate.password).digest('hex')
            var params = {
                username: validate.username,
                password: password
            }
            var result = await User.create(params)
            res.redirect('/blog-admin/login')
        } catch(err) {
            return res.status(400).render('admin/register', {
                msg: err.message
            })
        }
    }
}
