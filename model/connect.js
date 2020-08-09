var mongoose = require('mongoose')
// 配置登录权限
// var config = require('config')

var mongodbUrl = 'mongodb://www.heyitong904.com:27017/blog'
// var user = config.get('db.user')
// var pwd = config.get('db.pwd')
// var host = config.get('db.host')
// var port = config.get('db.port')
// var name = config.get('db.name')
// var mongodbUrl = 'mongodb://'+ user +':'+ pwd +'@'+ host +':'+ port +'/'+ name

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(function() {
    console.log('数据库连接成功')
})
.catch(function() {
    console.log('数据库连接失败')
})
