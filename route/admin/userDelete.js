var UserCollection = require('../../model/user')
var User = UserCollection.User

module.exports = async function(req, res) {
    var id = req.body.id
    await User.findOneAndDelete({_id: id})
    res.redirect('/blog-admin/user')
}
