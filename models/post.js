const mongoose = require('mongoose')

const Post = mongoose.model('Post',
  {
    title: { type: String }, 
    description : { type: String },
    text : { type: String },
    postImage : { type: String },
    createdAt: { type: String }
  }, 'posts')

module.exports = { Post }