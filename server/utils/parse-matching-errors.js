const fs = require('fs')
const json2csv = require('json2csv')
const buildJSON = require('./build-json.js')

const fields = [
  'SKU',
  'Title',
  'Field Name',
  'Merchant Value',
  'Amazon Value'
]

const buildFile = (file, fileName) => {
  let file = []
  let matchingData = buildMatchingData(obj)
  let fileName = fileName.split('/')[2]

  matchingData.forEach((item) => {
    item.error.map((err) => {
      file.push({
        'SKU': item.sku,
        'Title': item.title,
        'Field Name': err.field,
        'Merchant Value': err.merchant,
        'Amazon Value': err.amazon
      })
    })
  })

  const newFile = json2csv({data: file, fields: fields})
  fs.writeFileSync(`./public/downloads/${fileName}.csv`, newFile)
  return `/downloads/${fileName}.csv`
}

// no ideal... need to figure this out...
// const newLine = (obj) => {
//   return {
//     'SKU': obj.sku,
//     'Title': obj.title,
//     'Field Name': obj.error.field,
//     'Merchant Value': obj.error.merchant,
//     'Amazon Value': obj.error.amazon
//   }
// }

const buildMatchingData = (obj) => {
  let file = []
  let fileJSON = jsonFromFile(obj.file)

  file = fileJSON.map((row) => {
    return matchingErrorData(row)
  })

  return file
}

const matchingErrorData = (row) => {
  let skuError = {}
  let errorStr = getTextFromString(row['Error Details'])

  skuError.sku = row['SKU']
  skuError.title = row['Title']
  skuError.error = separateErrors(errorStr)

  return skuError
}

const getTextFromString = (str) => {
  return str.match(/[^\]]*$/)[0]
     .split(',')
     .filter(item => item !== '' ? item.trim() : '')
}

// creates array of matching error objects
const separateErrors = (arr) => {
  return arr.map(item => {
    return {
      field: item.match(/\((.*?)\s/)[0].split('\'')[1],
      merchant: item.match(/:(.*?)\//)[0].split('\'')[1],
      amazon: item.match(/\/(.*?)\)/)[0].split(':')[1].split('\'')[1].trim()
    }
  })
}

const jsonFromFile = (filePath) => {
  let lines = buildJSON.parseFile(filePath)
  let headers = buildJSON.getHeaders(lines)
  let fileJSON = buildJSON.compileJSON(lines, headers)

  return fileJSON
}

module.exports = {
  buildFile: buildFile
}

// [{
//   sku: 'theSKU',
//   title: 'title of product',
//   error: [
//     {field: 'Brand', merchant: 'value', amazon: 'value'},
//     {field: 'Brand', merchant: 'value', amazon: 'value'}
//   ]
// }]
