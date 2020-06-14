let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return (parsed.hostname == 'www.douban.com' || parsed.hostname == 'm.douban.com')
      && url.match(/\/group\/topic\/(\d+)/)
  },

  async process(url) {
    let id = url.match(/\/group\/topic\/(\d+)/)[1]

    let res = await fetch(`https://www.douban.com/group/topic/${id}/`)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('.article h1').textContent
    let author = document.querySelector('.article span.from a').textContent
    let content = document.querySelector('#link-report .topic-content')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://www.douban.com/group/topic/179102648/',
    'https://m.douban.com/group/topic/179102648/',
    'https://www.douban.com/doubanapp/dispatch?uri=/group/topic/179102648&dt_dapp=1'
  ]

}
