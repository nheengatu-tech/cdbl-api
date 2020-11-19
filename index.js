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
app.use('/user', userRoutes)
app.use('/login', authRoutes)
app.use('/banners', bannerRoutes)
app.use('/uploads', express.static('uploads'));


app.listen(8080,() => console.log('Server started at : 8080'))