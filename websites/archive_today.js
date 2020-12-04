let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let determineWebsite = require('../src/determineWebsite')
let { execSync } = require('child_process')


module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname.match(/archive\./)
  },

  async process(url) {
    let html = execSync(`curl "${url}"`).toString()
    let document = new JSDOM(html).window.document

    let archivedUrl = document.querySelector('input[name=q]').value
    let website = determineWebsite(archivedUrl)

    if (website && website.processDOM) {
      return website.processDOM(document.querySelector('#CONTENT'))
    }

    throw "Unsupported website"
  },

  samples: [
    'https://archive.vn/Ln3uo',
    //'https://archive.is/yaTCW'
  ]

}