const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user){
        return res.redirect('/auth/login');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.redirect('/auth/login');
    }
    req.session.userId = user._id;
    res.redirect('/');
}