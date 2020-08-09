var CommentCollection = require('../../model/comment')
var Comment = CommentCollection.Comment

module.exports = async function(req, res) {
    var params = req.body
    await Comment.create({
        aid: params.aid,
        uid: params.uid,
        content: params.content,
        time: new Date()
    })

    res.redirect('/home/article?id=' + params.aid)
}
