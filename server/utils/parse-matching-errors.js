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

// [{
//   sku: 'theSKU',
//   error: [
//     {field: 'Brand', merchant: 'value', amazon: 'value'},
//     {field: 'Brand', merchant: 'value', amazon: 'value'}
//   ]
// }]
