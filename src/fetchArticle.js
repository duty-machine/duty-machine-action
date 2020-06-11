let websites = require('./../websites')
let querystring = require('querystring')
let { URL } = require('url')

module.exports = async function fetchArticle(url) {
  let escaped = new URL(url).href
  let website = Object.values(websites).find(w => w.test(escaped))
  if (website) {
    return await website.process(escaped)
  } else {
    throw new Error('未适配网站')
  }
}