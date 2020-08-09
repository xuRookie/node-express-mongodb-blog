var ArticleCollection = require('../../model/article')
var Article = ArticleCollection.Article

module.exports = async function(req, res) {
    var params = req.query || {}
    console.log('req', req.query)
    // 标识 标识当前访问的页面呢
    req.app.locals.currentLink = 'article'

    if (params.id) {
        var article = await Article.findOne({ _id: params.id })
        res.render('admin/articleControl', {
            article: article,
            type: params.type,
            msg: params.massage,
            link: '/admin/articleEdit?id=' + params.id
        })
    } else {
        res.render('admin/articleControl', {
            type: params.type,
            article: {},
            msg: params.massage,
            link: '/admin/articleAdd'
        })
    }
    // res.render('admin/articleControl', {
    //     type: params.type,
    //     article: {},
    //     msg: params.massage,
    //     link: '/admin/articleAdd'
    // })
}
