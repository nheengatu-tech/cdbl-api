require('./db')
const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');

var userRoutes = require('./controllers/userController')
var bannerRoutes = require('./controllers/bannerController')
var authRoutes = require('./controllers/authController')

var app = express()
app.use(json())
app.use(cors({ origin:'http://localhost:3000' }))
app.use(fileUpload());
app.get('/', (req, res) => {
  console.log("/")
  res.send('api domboscoleste is up!')
})
app.get('/healthcheck', (req, res) => {
  console.log("/healthcheck")
  res.send('system is running good...')
})
app.use('/user', userRoutes)
app.use('/login', authRoutes)
app.use('/banners', bannerRoutes)
app.use('/uploads', express.static('uploads'));


app.listen(4000,() => console.log('Server started at : 4000'))