module.exports = function(req, res) {
    // 标识 标识当前访问的页面呢
    req.app.locals.currentLink = 'index'
    res.render('admin/index')
}
