let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'chinadigitaltimes.net'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('h1').textContent
    // cdt的作者通常不是原作
    let author = null
    let content = document.querySelector('div.post-content')

    return {
      title,
      author,
      dom: content
    }

  }

}