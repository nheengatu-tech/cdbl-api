const express = require('express')
const { Banner } = require('../models/banner')
const verifyJWT = require("../verifyToken")
const router = express.Router()
path = require('path')
  
router.get('/', (req, res) => {
    console.log('/banners');
    Banner.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.get('/banner/:id', verifyJWT, (req, res) => {
    console.log('/banners/:id delete banner');
    Banner.find((err, docs) => {
        if (!err) res.send(docs.filter(banner => banner._id === req.params.id))
        else console.log('Error while retrieving selected banner : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    console.log('post /banner');

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.bannerImage;
      const imageUrl = "http://18.230.195.205/:4000/uploads/" + file.name;
      const pathUrl = path.join(__dirname, "../uploads", file.name);
    
      file.mv(pathUrl, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        var newRecord = new Banner({
            name: req.body.name,
            redirectUrl: req.body.redirectUrl,
            bannerImage: imageUrl,
        })

        newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify  (err, undefined, 2))
        })
      });
})

module.exports = router