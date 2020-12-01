const express = require('express')
const banner = require('../models/banner')
const { Banner } = require('../models/banner')
const verifyJWT = require("../verifyToken")
const router = express.Router()
path = require('path')
  
router.get('/', (req, res) => {
    console.log('/banners');
    Banner.find((err, docs) => {
        if (!err) {
            console.log('banner route ended well');
            res.send(docs)
        } 
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', verifyJWT, (req, res) => {
    console.log('deleting banner ' + req.params.id);
    Banner.findByIdAndRemove({ _id: req.params.id })
        .then(banner => {
            res.send(banner)
        })
        .catch(err => {
            console.log('Error while retrieving selected banner : ' + JSON.stringify(err, undefined, 2))
        })
    // Banner.find((err, docs) => {
    //     if (!err) {
    //         const newRecord = docs.filter(banner => banner._id === req.params.id.toString())
    //         console.log(newRecord);
    //         res.send(newRecord)
    //     }
    //     else console.log('Error while retrieving selected banner : ' + JSON.stringify(err, undefined, 2))
    // })
})

router.post('/', (req, res) => {
    console.log('post /banner');

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.bannerImage;
      const imageUrl = "https://api.domboscoleste.com.br/uploads/" + file.name;
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