let querystring = require('querystring')
let urlMod = require('url')
let URL = urlMod.URL
let fs = require('fs').promises
let determineWebsite = require('./determineWebsite')

module.exports = async function fetchArticle(url) {
  let escaped = new URL(url).href
  let website = determineWebsite(url)
  if (website) {
    let article = await website.process(escaped)

    let dom = article.dom
    // update paths in outerHTML to absolute paths
    Array.from(dom.querySelectorAll('img')).map(img => {
      img.src = urlMod.resolve(url, img.src)
    })

    Array.from(dom.querySelectorAll('a')).map(a => {
      a.href = urlMod.resolve(url, a.href)
    })

    return article
  } else {
    throw new Error('未适配网站')
  }
}