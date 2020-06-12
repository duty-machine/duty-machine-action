let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'zhuanlan.zhihu.com'
  },

  async process(url) {
    let res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:74.0) Gecko/20100101 Firefox/74.0'
      }
    })
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('h1.Post-Title').textContent
    let author = document.querySelector('meta[itemprop=name]').content
    let content = document.querySelector('.Post-RichTextContainer')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://zhuanlan.zhihu.com/p/115765034'
  ]

}