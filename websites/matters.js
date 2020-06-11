let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'matters.news'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('h1.article').textContent
    let author = document.querySelector('a.name').textContent
    let content = document.querySelector('div.u-content')

    return {
      title,
      author,
      dom: content
    }

  }

}