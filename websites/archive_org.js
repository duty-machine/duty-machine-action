let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let determineWebsite = require('../src/determineWebsite')
let { execSync } = require('child_process')


module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'web.archive.org'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let archivedUrl = url.match(/\/(http.+)/)[1]
    let website = determineWebsite(archivedUrl)

    if (website && website.processDOM) {
      return website.processDOM(document)
    }

    throw "Unsupported website"
  },

  samples: [
    'https://web.archive.org/web/20201209123604/https://mp.weixin.qq.com/s/Rgfdrwqp8dZ6CgvxzANmXw',
  ]

}