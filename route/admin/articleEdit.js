var path = require('path')
var formidable = require('formidable')
var ArticleCollection = require('../../model/article')
var Article = ArticleCollection.Article
var validateArticle = ArticleCollection.validateArticle

module.exports = async function(req, res, next) {
    var id = req.query.id
    try {
        // 创建表单解析对象
        var form = new formidable.IncomingForm()
        // 配置上传文件的存放位置
        form.uploadDir = path.join(__dirname, '../../public/uploads')
        // 保留上传文件的后缀
        form.keepExtensions = true
        // 解析表单
        form.parse(req, async function(err, fields, files) {
            await validateArticle(fields)
            // err错误对象
            // fields 对象类型 保存普通表单数据
            // files 上传文件数据
            await Article.updateOne({_id: id}, {
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content,
            })

            res.redirect('/admin/article')
        })
    } catch(err) {
        var routeParams = {
            path: '/admin/articleControl',
            type: 'edit',
            id: id,
            message: err.message
        }
        // next参数只能是字符串
        return next(JSON.stringify(routeParams))
    }
}
