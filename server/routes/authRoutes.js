const express = require('express')
const { signup, login } = require('../controllers/authController')
const router = express.Router()

// define the signup page route
router.get('/signup', signup )
// define the login route
router.get('/login', login )

module.exports = router
