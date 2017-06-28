const fs = require('fs')
const json2csv = require('json2csv')

const fields = [
  'SKU',
  'Title',
  'Field Name',
  'Merchant Value',
  'Amazon Value'
]

const buildFile = (jsonData, fileName) => {
  let data = []
  let matchingData = buildMatchingData(jsonData)
  fileName = fileName.split('/')[2]

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

  const newFile = json2csv({data: data, fields: fields})
  fs.writeFileSync(`./public/downloads/${fileName}.csv`, newFile)
  return `/downloads/${fileName}.csv`
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
    console.log('HERE', item)
    return {
      field: item.match(/\((.*?)\s/)[0].split('\'')[1],
      merchant: item.match(/:(.*?)\//)[0].split('\'')[1],
      amazon: item.match(/\/(.*)/)[0].split(':')[1].split('\'')[1].trim()
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
