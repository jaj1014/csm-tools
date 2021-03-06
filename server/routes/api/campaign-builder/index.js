const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: './uploads'})

const buildJSON = require('../../../utils/build-json.js')
const buildCampaign = require('../../../utils/build-campaign.js').buildCampaign
const deleteFiles = require('../../../utils/delete-files.js')

router.post('/:action', upload.single('upload'), (req, res) => {
  switch (req.params.action) {
    case 'upload':
      deleteFiles('./public/downloads')
      let jsonData = {}
      jsonData.headers = buildJSON.headersFromFile(`./uploads/${req.file.filename}`)
      jsonData.file = `./uploads/${req.file.filename}`
      res.json(jsonData)
      break
    case 'build':
      deleteFiles('./uploads')
      res.json(buildCampaign(req.body))
      break
  }
})
module.exports = router
