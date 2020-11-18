const express = require('express')
const { User } = require('../models/user')
const jwt = require('jsonwebtoken');
const router = express.Router()

router.post('/', (req, res) => {
  console.log('post /login');

  User.find((err, docs) => {
    const user = docs.filter(doc => doc.email === req.body.email)
    if (!err) {
      if (user[0].email === req.body.email && user[0].password === req.body.password && user[0]._id) {
        const id = user[0]._id
        const token = jwt.sign({ id }, "@cdbl/session_user", {
          expiresIn: 36000 // expires in 10hour
        });
        return res.status(200).json({ auth: true, token: token, user: user[0] });
      }
    } else {
      res.status(500).json({message: 'Falid to fetch user'});
    }
  })
})

module.exports = router