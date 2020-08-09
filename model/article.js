var mongoose = require('mongoose')
var Joi = require('@hapi/joi')

// 创建文章集合规则
var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请填写作者']
    },
    publishDate: {
        type: Date,
        default: Date.now()
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})
// 创建文章集合
var Article = mongoose.model('Article', articleSchema)


var validateArticle = function(req) {
    // 定义验证规则
    var schema = Joi.object({
        title: Joi.string().min(4).max(20).required().error(new Error('标题必须在4-20字内')),
        author: Joi.string().required().error(new Error('请填写文章作者')),
        publishDate: Joi.date().error(new Error('时间格式错误')),
        cover: Joi.string(),
        content: Joi.string()
    })

    return schema.validateAsync(req)
}

module.exports = {
    Article: Article,
    validateArticle: validateArticle
}
