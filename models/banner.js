const mongoose = require('mongoose')

const Banner = mongoose.model('Banner',
  {
    name: { type: String }, 
    redirectUrl : { type: String },
    bannerImage : { type: String },
  }, 'banners')

module.exports = { Banner }