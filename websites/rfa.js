let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'www.rfa.org'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('#storycontent h1').textContent
    let author = null
    let content = document.querySelector('#storytext')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://www.rfa.org/mandarin/yataibaodao/renquanfazhi/cc-06162020095537.html'
  ]

}