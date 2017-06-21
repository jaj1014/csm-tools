const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: './uploads'})

const parseMatchingErrors = require('../../../utils/parse-matching-errors.js').buildFile
const deleteFiles = require('../../../utils/delete-files.js')

router.post('/:action', upload.single('upload'), (req, res) => {
  switch (req.params.action) {
    case 'upload':
      deleteFiles('./public/downloads')
      res.json(parseMatchingErrors(req.file, req.file.filename))
      break
  }
})

module.exports = router
