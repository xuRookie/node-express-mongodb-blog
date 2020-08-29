var ArticleCollection = require('../../model/article')
var Article = ArticleCollection.Article

module.exports = async function(req, res) {
    var id = req.body.id
    await Article.findOneAndDelete({_id: id})
    res.redirect('/blog-admin/article')
}
