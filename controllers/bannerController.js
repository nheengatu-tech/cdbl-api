const express = require('express')
const { Banner } = require('../models/banner')
const verifyJWT = require("../verifyToken")
const router = express.Router()
path = require('path')
  
router.get('/', verifyJWT, (req, res) => {
    console.log('/banners');
    Banner.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.get('/list/:id', verifyJWT, (req, res) => {
    console.log('/list/:id banner');
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
    //   const url = "http://52.67.51.241:4000/uploads/" + file.name;
      const url = path.join(__dirname, "../uploads", file.name);
    
      file.mv(url, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        var newRecord = new Banner({
            name: req.body.name,
            redirectUrl: req.body.redirectUrl,
            bannerImage: url,
        })

        newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify  (err, undefined, 2))
        })
      });
})

module.exports = router