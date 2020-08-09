var express = require('express')
var path = require('path')
// 处理post请求参数
var bodyparse = require('body-parser')
var session = require('express-session')
var template = require('express-art-template')
var artTemplate = require('art-template')
var dateFormat = require('dateformat')
var morgan = require('morgan')

// 数据库连接
require('./model/connect')

var home = require('./route/home')
var admin = require('./route/admin')

var app = express()
app.use(bodyparse.urlencoded({ extended: false }))
app.use(session({
    secret: 'cookie',
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //有效时间为1天
    }
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', template)
app.use(express.static(path.join(__dirname, 'public')))
artTemplate.defaults.imports.dateFormat = dateFormat

app.use('/admin', require('./middleware/loginIntercept'))

if (process.env.NODE_ENV == 'development') {
    // 开发环境中，将客户端发送到服务器端的请求打印到控制台
    app.use(morgan('dev'))
} else {
    console.log('生产环境')
}

app.use('/home', home)
app.use('/admin', admin)

app.use(function(err, req, res, next) {
    var params = JSON.parse(err)
    var query = []
    for (var attr in params) {
        if (attr != 'path') {
            var str = attr + '=' +  params[attr]
            query.push(str)
        }
    }
    var concatStr = query.join('&')
    res.redirect(params.path + '?' + concatStr)
})

app.listen(5004, function() {
    console.log('服务器已启动，端口为: 5004...')
})
