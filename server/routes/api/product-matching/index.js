const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: './uploads'})

const buildJSON = require('../../../utils/build-json.js')
const parseMatchingErrors = require('../../../utils/parse-matching-errors.js').buildFile
const deleteFiles = require('../../../utils/delete-files.js')

router.post('/upload', upload.single('upload'), (req, res) => {
  deleteFiles('./public/downloads')

  let jsonData = buildJSON.fileToJSON(`./uploads/${req.file.filename}`)
  res.json(parseMatchingErrors(jsonData, req.file.filename, () => {
    deleteFiles('./uploads')
  }))
})

module.exports = router
