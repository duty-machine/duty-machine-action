let querystring = require('querystring')
let { URL } = require('url')
let fs = require('fs').promises
let determineWebsite = require('./determineWebsite')

module.exports = async function fetchArticle(url) {
  let escaped = new URL(url).href
  let website = determineWebsite(url)
  if (website) {
    return await website.process(escaped)
  } else {
    throw new Error('未适配网站')
  }
}