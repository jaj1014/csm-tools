const express = require('express')
const router = express.Router()
const campaignBuilder = require('./campaign-builder/')
const productMatching = require('./product-matching/')

router.use('/campaign-builder', campaignBuilder)
router.use('/product-matching', productMatching)

module.exports = router
