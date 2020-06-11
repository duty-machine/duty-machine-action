let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'telegra.ph'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('header h1').textContent
    let author = document.querySelector('header a[rel=author]').textContent
    let content = document.querySelector('article')

    content.querySelector('h1').remove()
    content.querySelector('address').remove()

    return {
      title,
      author,
      dom: content
    }

  }

}