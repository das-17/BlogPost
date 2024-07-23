const BlogPost = require('../models/blogpost');

module.exports = async (req,res) => {
    try{
        const blogPosts = await BlogPost.find({}).populate('userid');
        console.log(req.session);
        res.render('index',{
            blogPosts
        });
    }
    catch(error){
        console.log('Error finding blog posts',error);
    }
    
};