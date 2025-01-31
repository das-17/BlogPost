const User = require('../models/user');

module.exports = async (req, res, next) => {
    const user = await User.findById(req.session.userId);
    if(!user){
        return res.redirect('/');
    }
    next();
};
