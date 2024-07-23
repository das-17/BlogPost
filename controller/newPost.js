module.exports = async (req,res) => {
    if(req.session.userId){
        res.render('create', { createPost: true});
    } else{
        res.redirect('/auth/login');
    }
};