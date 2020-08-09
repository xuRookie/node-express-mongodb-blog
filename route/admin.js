var express = require('express')

var admin = express.Router()

// 登录页
admin.get('/login', require('./admin/loginPage'))
// 登录请求
admin.post('/login', require('./admin/login'))
// 注册页
admin.get('/register', require('./admin/registerPage'))
// 注册请求
admin.post('/register', require('./admin/registerFn'))
// 登出
admin.get('/logout', require('./admin/logout'))
// 首页
admin.get('/index', require('./admin/index'))
// 用户列表页
admin.get('/user', require('./admin/userPage'))
// 用户操作页
admin.get('/operateUser', require('./admin/operateUser'))
// 用户操作请求
admin.post('/userAdd', require('./admin/userAdd'))
admin.post('/userEdit', require('./admin/userEdit'))
admin.post('/userDelete', require('./admin/userDelete'))
// 文章列表页
admin.get('/article', require('./admin/article'))
// 文章操作页
admin.get('/articleControl', require('./admin/articleControl'))
// 文章操作请求
admin.post('/articleAdd', require('./admin/articleAdd'))
admin.post('/upload', require('./admin/upload'))
admin.post('/articleEdit', require('./admin/articleEdit'))
admin.post('/articleDelete', require('./admin/articleDelete'))

admin.get('/tags', require('./admin/tags'))

module.exports = admin
