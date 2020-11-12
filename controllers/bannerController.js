const express = require('express')
const { Banner } = require('../models/banner')
const verifyJWT = require("../verifyToken")
const router = express.Router()

router.get('/', verifyJWT, (req, res) => {
    console.log('/ appointments');
    Banner.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.get('/list/:id', verifyJWT, (req, res) => {
    console.log('/list/:id appointments');
    Banner.find((err, docs) => {
        if (!err) res.send(docs.filter(banner => banner._id === req.params.id))
        else console.log('Error while retrieving selected banner : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', verifyJWT, (req, res) => {
    console.log('post /banner');
    var newRecord = new Banner({
        url: req.body.url,
        src: req.body.src,
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
    })
})

module.exports = router