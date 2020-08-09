var intercept = function(req, res, next) {
    if (req.url == '/logout') {
        next()
    } else {
        // connsole.log('是否清除', req && req.session)
        if (req.url != '/login' && req.url != '/register' && !req.session.username) {
            res.redirect('/admin/login')
        } else {
            if (req.session.role == 'normal') {
                return res.redirect('/home')
            }
            next()
        }
    }
}

module.exports = intercept
