const fs = require('fs')
const json2csv = require('json2csv')

const fields = [
  'SKU',
  'Title',
  'Field Name',
  'Merchant Value',
  'Amazon Value'
]

const buildFile = (jsonData, fileName, cb) => {
  let data = []
  let matchingData = buildMatchingData(jsonData)

  matchingData.forEach((item) => {
    item.error.map((err) => {
      data.push({
        'SKU': item.sku,
        'Title': item.title,
        'Field Name': err.field,
        'Merchant Value': err.merchant,
        'Amazon Value': err.amazon
      })
    })
  })

  const newFile = json2csv({data: data, fields: fields, del: '\t'})
  fs.writeFileSync(`./public/downloads/${fileName}.txt`, newFile)
  cb()
  return `/downloads/${fileName}.txt`
}

const buildMatchingData = (jsonData) => {
  let file = []
  jsonData.shift()

  file = jsonData.map((row) => {
    return matchingErrorData(row)
  })

  return file
}

const matchingErrorData = (row) => {
  let skuError = {}
  let errorStr = getTextFromString(row['ErrorDetails'])

  skuError.sku = row['SKU']
  skuError.title = row['Title']
  skuError.error = separateErrors(errorStr)

  return skuError
}

const getTextFromString = (str) => {
  return str.match(/[^\]]*$/)[0]
     .split('),')
     .filter(item => item !== '' ? item.trim() : '')
}

// creates array of matching error objects
const separateErrors = (arr) => {
  return arr.map(item => {
    return {
      field: item.match(/\((.*?)\s/) ? item.match(/\((.*?)\s/)[0].split('\'')[1] : 'skipped',
      merchant: item.match(/:(.*?)\//) ? item.match(/:(.*?)\//)[0].split('\'')[1] : 'skipped',
      amazon: item.match(/\/(.*)/) ? item.match(/\/(.*)/)[0].split(':')[1].split('\'')[1].trim() : 'skipped'
    }
  })
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
