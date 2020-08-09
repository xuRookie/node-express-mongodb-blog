var ArticleCollection = require('../../model/article')
var Article = ArticleCollection.Article
var pagination = require('mongoose-sex-page')

module.exports = async function(req, res) {
    // 标识 标识当前访问的页面呢
    req.app.locals.frontLink = 'index'
    var page = req.query.page || 1
    var result = await pagination(Article)
        .page(page)
        .size(2)
        .display(5)
        .find()
        .populate('author')
        .exec()

    res.render('home/index', {
        result: result
    })
}
