const User = require('../models/user');
const path = require('path');

module.exports = async (req,res) => {
    try{
        await User.create(req.body);
        res.redirect('/');
    } catch(error) {
        const validationErrors = Object.keys(error.errors).map(err => error.errors[err].message);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        return res.redirect('/auth/register');
    }
    
};