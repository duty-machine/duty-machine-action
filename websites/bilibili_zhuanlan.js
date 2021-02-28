let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname.match('bilibili.com')
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('h1.title').textContent
    let author = document.querySelector('a.up-name').textContent
    let content = document.querySelector('div.article-holder')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://www.bilibili.com/read/cv9590928'
  ]
}
