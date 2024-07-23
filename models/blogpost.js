const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    userid: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    datePosted: {
        type: Date,
        default: Date
    },
    image: String
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
// This creates the plural version of the model.

module.exports = BlogPost;
 