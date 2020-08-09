var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
})

var Comment = mongoose.model('Comment', commentSchema)


module.exports = {
    Comment: Comment
}
