var path = require('path')
var fs = require('fs')
var formidable = require('formidable')

module.exports = function(req, res) {
    var form = new formidable.IncomingForm()
    // 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../../public/uploads')
    // 保留上传文件的后缀
    form.keepExtensions = true

    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send({err: '文件上传失败', url: ''})
        } else {
            var file = undefined
            Object.keys(files).forEach(function(name) {
                file = files[name]
            });
            var newPath = file.path.split('public')[1]
            res.send({err: '', url: newPath})
        }
    })
}
