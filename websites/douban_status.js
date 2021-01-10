let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return (parsed.hostname == 'www.douban.com' || parsed.hostname == 'm.douban.com' || parsed.hostname == 'douban.com')
      && url.match(/\/status\/(\d+)/)
  },

  async process(url) {
    let id = url.match(/\/status\/(\d+)/)[1]

    let res = await fetch(`https://www.douban.com/doubanapp/dispatch?uri=/status/${id}/`)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    return this.processDOM(document)
  },

  processDOM(document) {
    let title = document.querySelector('h1').textContent
    let author = document.querySelector('a.lnk-people').textContent
    let content = document.querySelector('.status-saying')

    return {
      title,
      author,
      dom: content
    }
  },

  samples: [
    'https://www.douban.com/people/102121296/status/3227779435/',
    'https://www.douban.com/doubanapp/dispatch?uri=/status/3227779435/&dt_dapp=1',
    'https://m.douban.com/people/102121296/status/3227779435',
    'https://douban.com/people/102121296/status/3227779435/'
  ]

}
