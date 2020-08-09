var ArticleCollection = require('../../model/article')
var CommentCollection = require('../../model/comment')
var Article = ArticleCollection.Article
var Comment = CommentCollection.Comment

module.exports = async function(req, res) {
    req.app.locals.frontLink = 'index'
    var id = req.query.id

    var article = await Article.findOne({_id: id}).populate('author')
    var comments = await Comment.find({aid: id}).populate('uid')
    res.render('home/article', {
        article: article,
        comments: comments
    })
}
