const BlogPost = require('../models/blogpost');
const mongoose = require('mongoose');

module.exports = async(req,res) => {
    try {
        const { id } = req.params;
    
        if (!mongoose.isValidObjectId(id)) {
          console.log(id);
          return res.status(400).send('Invalid ID format');
        }
    
        const blogPost = await BlogPost.findById(id).populate('userid');
        if (!blogPost) {
          return res.status(404).send('Blog post not found');
        }
        res.render('post', { blogPost });
      } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).send('Internal Server Error');
      }
}