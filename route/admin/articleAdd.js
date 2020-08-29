var path = require('path')
var formidable = require('formidable')
var ArticleCollection = require('../../model/article')
var Article = ArticleCollection.Article

module.exports = function(req, res) {
    // 创建表单解析对象
    var form = new formidable.IncomingForm()
    // 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../../public/uploads')
    // 保留上传文件的后缀
    form.keepExtensions = true
    // 解析表单
    form.parse(req, async function(err, fields, files) {
        // err错误对象
        // fields 对象类型 保存普通表单数据
        // files 上传文件数据
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content,
        })

        res.redirect('/blog-admin/article')
    })
}
