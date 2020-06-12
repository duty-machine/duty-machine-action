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

  },

  samples: [
    'https://matters.news/@dunesworkshop/%E4%B8%AD%E6%96%87%E4%BA%92%E8%81%94%E7%BD%91%E4%B8%AD-%E8%AE%A8%E8%AE%BA-%E7%9A%84%E6%B6%88%E4%BA%A1-bafyreibmdo43v35az6rspj7ghypebxghoahcqg2crjxf4naditmfok5wzy'
  ]
}