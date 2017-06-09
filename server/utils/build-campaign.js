const fs = require('fs')
const _ = require('lodash')
const json2csv = require('json2csv')
const buildJSON = require('./build-json.js')

// { campaignName: 'New Campaign',
//   ad: 'InventoryNumber',
//   adGroup: 'Classification',
//   defaultBid: '0.20',
//   dailyBudget: '20'
//   file: './uploads/a4ebb9e74ad3db4764fcf03a82deedc9' }

const fields = [
  'Campaign Name',
  'Campaign Daily Budget',
  'Campaign Start Date',
  'Campaign End Date',
  'Campaign Targeting Type',
  'Ad Group Name',
  'Max Bid',
  'SKU',
  'Keyword',
  'Match Type',
  'Campaign Status',
  'Ad Group Status',
  'Status',
  'Bid+'
]

const buildCampaign = (obj) => {
  let campaignFile = []
  let fileName = obj.file.split('/')[2]
  let fileJSON = jsonFromFile(obj.file)
  let campaigns = []
  campaigns.push(obj.campaignName)
  let adGroups = dedupField(fileJSON, obj.adGroup)

  campaigns.forEach((campaign) => {
    createCampaign(campaignFile, campaign, obj.dailyBudget)

    adGroups.map((group) => {
      if (group !== '') {
        createAdGroup(campaignFile, campaign, group, obj.defaultBid)
      }

      fileJSON.map((row, i) => {
        if (i > 0 && row[obj.adGroup] === group && group !== '') {
          createAds(campaignFile, campaign, group, row[obj.ad])
        }
      })
    })
  })

  const newCampaign = json2csv({data: campaignFile, fields: fields})
  fs.writeFileSync(`./public/downloads/${fileName}.csv`, newCampaign)
  return `/downloads/${fileName}.csv`
}

const getCurrentDate = () => {
  let today = new Date()
  let month = today.getDate() - 1
  let date = today.getDate()
  let year = today.getFullYear()

  month = month < 10 ? `0${month}` : month
  date = date < 10 ? `0${date}` : date

  return `${month}/${date}/${year}`
}

const createCampaign = (file, campaign, budget) => {
  file.push({
    'Campaign Name': campaign,
    'Campaign Daily Budget': budget,
    'Campaign Start Date': getCurrentDate(),
    'Campaign End Date': '',
    'Campaign Targeting Type': 'Auto',
    'Ad Group Name': '',
    'Max Bid': '',
    'SKU': '',
    'Keyword': '',
    'Match Type': '',
    'Campaign Status': 'Paused',
    'Ad Group Status': '',
    'Status': '',
    'Bid+': ''
  })
}

const createAdGroup = (file, campaign, adGroup, bid) => {
  file.push({
    'Campaign Name': campaign,
    'Campaign Daily Budget': '',
    'Campaign Start Date': '',
    'Campaign End Date': '',
    'Campaign Targeting Type': '',
    'Ad Group Name': adGroup,
    'Max Bid': bid,
    'SKU': '',
    'Keyword': '',
    'Match Type': '',
    'Campaign Status': '',
    'Ad Group Status': 'Enabled',
    'Status': '',
    'Bid+': ''
  })
}

const createAds = (file, campaign, adGroup, ad) => {
  file.push({
    'Campaign Name': campaign,
    'Campaign Daily Budget': '',
    'Campaign Start Date': '',
    'Campaign End Date': '',
    'Campaign Targeting Type': '',
    'Ad Group Name': adGroup,
    'Max Bid': '',
    'SKU': ad,
    'Keyword': '',
    'Match Type': '',
    'Campaign Status': '',
    'Ad Group Status': '',
    'Status': 'Enabled',
    'Bid+': ''
  })
}

const jsonFromFile = (filePath) => {
  let lines = buildJSON.parseFile(filePath)
  let headers = buildJSON.getHeaders(lines)
  let fileJSON = buildJSON.compileJSON(lines, headers)

  return fileJSON
}

const dedupField = (fileJSON, field) => {
  let deduped = fileJSON.reduce((arr, row) => {
    if (row[field].replace(/\s/g, '') === field) {
      return arr
    } else {
      arr.push(row[field])
      return _.uniq(arr)
    }
  }, [])

  return deduped
}

module.exports = {
  buildCampaign: buildCampaign
}
