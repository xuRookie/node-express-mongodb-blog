var dateFormat = require('dateformat')
var ArticleCollection = require('../../model/article')
var Article = ArticleCollection.Article

module.exports = async function(req, res) {
    var params = req.query || {}

    // 标识 标识当前访问的页面呢
    req.app.locals.currentLink = 'article'
    try {
        if (params.id) {
            var article = await Article.findOne({ _id: params.id })
            res.render('admin/articleControl', {
                article: article,
                type: params.type,
                msg: params.massage,
                link: '/blog-admin/articleEdit?id=' + params.id
            })
        } else {
            res.render('admin/articleControl', {
                type: params.type,
                article: {},
                msg: params.massage,
                link: '/blog-admin/articleAdd'
            })
        }
    } catch (error) {
        console.log('这里是错误', error)
    }
}
