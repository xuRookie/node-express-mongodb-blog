module.exports = function(req, res) {
    req.session.destroy(function() {
        // 清除模版中的用户信息
        req.app.locals.userInfo = null
        res.clearCookie('connect.sid')
        res.redirect('/blog-admin/login')
    })
}
