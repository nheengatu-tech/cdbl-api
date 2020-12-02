const express = require('express')
const { Post } = require('../models/post')
const verifyJWT = require("../verifyToken")
const router = express.Router()
path = require('path')
  
router.get('/', (req, res) => {
    console.log('GET /posts');
    Post.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } 
        else console.log('Error while retrieving all posts records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', verifyJWT, (req, res) => {
    console.log('DELETE /posts/' + req.params.id);
    Post.findByIdAndRemove({ _id: req.params.id })
        .then(post => {
            res.send(post)
        })
        .catch(err => {
            console.log('Error while retrieving selected post : ' + JSON.stringify(err, undefined, 2))
        })
})

router.post('/', (req, res) => {
    console.log('POST /posts');

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
    
        var newRecord = new Post({
            title: req.body.title, 
            description : req.body.description,
            text : req.body.text,
            postImage : imageUrl,
            path : req.body.path,
            createdAt: new Date().toLocaleString()
        })

        newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify  (err, undefined, 2))
        })
      });
})

module.exports = router