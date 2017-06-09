const express = require('express')
const router = express.Router()
const campaignBuilder = require('./campaign-builder/')

router.use('/campaign-builder', campaignBuilder)

module.exports = router
