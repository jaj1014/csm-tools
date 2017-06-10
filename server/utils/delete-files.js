const fs = require('fs')

module.exports = (folder) => {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.log(err)
    }
    files.forEach(file => {
      fs.unlinkSync(`${folder}/${file}`)
    })
  })
}
