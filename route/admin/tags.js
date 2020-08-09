var ArticleCollection = require('../../model/article')
var Article = ArticleCollection.Article
var pagination = require('mongoose-sex-page')

module.exports = async function(req, res) {
    // var page = req.query.page || 1
    // // 标识 标识当前访问的页面呢
    // req.app.locals.currentLink = 'article'
    // // page 指定当前页
    // // size 指定每页显示的条数
    // // display 指定客户端要显示的页码数量
    // // exec 向数据库发送查询请求
    // var articles = await pagination(Article).find()
    //     .page(page)
    //     .size(10)
    //     .display(5)
    //     .populate('author')
    //     .exec()

    res.render('admin/tags', {
        articles: {}
    })
}
