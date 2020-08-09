var mongoose = require('mongoose')
var Joi = require('@hapi/joi')

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // 保证唯一
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'normal'
    },
    // 0: 启用 1: 禁用
    status: {
        type: Number,
        default: 0
    },
    age: { type: Number },
    sex: { type: Number, default: 0 }
})

var User = mongoose.model('User', userSchema)

var validateUser = function(req) {
    // 定义验证规则
    var schema = Joi.object({
        username: Joi.string().min(2).max(20).required().error(new Error('用户名格式错误')),
        email: Joi.string().email().error(new Error('邮箱格式错误')),
        sex: Joi.number().valid(0, 1).error(new Error('性别参数不合法')),
        age: Joi.number().integer().min(0).max(200).error(new Error('年龄参数不合法')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        status: Joi.number().valid(0, 1).required().error(new Error('当前状态值非法'))
    })

    return schema.validateAsync(req.body)
}

var validateRegister = function(req) {
    var schema = Joi.object({
        username: Joi.string().alphanum().min(2).max(20).required().error(new Error('用户名格式错误')),
        password: Joi.string().pattern(/^[a-z0-9_-]{6,18}$/).required().error(new Error('密码格式错误')),
        repassword: Joi.ref('password')
    }).with('password', 'repassword')

    return schema.validateAsync(req.body)
}

module.exports = {
    User: User,
    validateUser: validateUser,
    validateRegister: validateRegister,
}
