const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')
const authenticate = require('../middleware/authenticate')

router.post('/', authenticate, apiController)

module.exports = router