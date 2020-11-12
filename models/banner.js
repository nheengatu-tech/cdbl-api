const mongoose = require('mongoose')

const Banner = mongoose.model('Banner',
  {
    url : { type: String },
    src : { type: String },
  },
  'banners')

module.exports = { Banner }