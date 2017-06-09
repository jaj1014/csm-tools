const fs = require('fs')
const _ = require('lodash')

const fileToJSON = (filePath) => {
  let lines = parseFile(filePath)
  let headers = getHeaders(lines)
  let fileJSON = compileJSON(lines, headers)

  return fileJSON
  // return JSON.stringify(fileJSON);
}

const headersFromFile = (filePath) => {
  let lines = parseFile(filePath)
  let headers = getHeaders(lines)

  return _.compact(headers)
}

const dedupeValues = (filePath) => {
  let deduped = []
  let lines = parseFile(filePath)
  let headers = getHeaders(lines)
  let fileJSON = compileJSON(lines, headers)

  deduped = headers.reduce((obj, header) => {
    obj[header] = fileJSON.reduce((arr, row) => {
      if (row[header].replace(/\s/g, '') === header) {
        return arr
      } else {
        arr.push(row[header])
        return _.uniq(arr)
      }
    }, [])

    return obj
  }, {})

  return deduped
}

// turn file into array of file lines
const parseFile = (filePath) => {
  let fileArr = fs.readFileSync(filePath, 'utf8')
    .trim()
    .split('\r\n')
    .map(line => line.split('\t')
  )
  return _.compact(fileArr)
}

// get headers from file lines array
const getHeaders = (lines) => {
  let headers = lines[0].map(header => header.replace(/\s/g, ''))

  return _.compact(headers)
}

// helper to build Object from line and headers
const buildLineObj = (line, headers) => {
  let lineObj = {}
  for (let i = 0; i < headers.length; i++) {
    lineObj[headers[i]] = line[i]
  }

  return lineObj
}

// turns file lines array and headers array into JSON
// uses buildLineObj()
const compileJSON = (lines, headers) => {
  let fileJSON = lines.reduce((jsonArr, line) => {
    let lineObj = buildLineObj(line, headers)

    jsonArr.push(lineObj)
    return jsonArr
  }, [])

  return fileJSON
}

module.exports = {
  fileToJSON: fileToJSON,
  headersFromFile: headersFromFile,
  dedupeValues: dedupeValues,
  parseFile: parseFile,
  getHeaders: getHeaders,
  compileJSON: compileJSON
}
