let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return (parsed.hostname == 'www.douban.com' || parsed.hostname == 'm.douban.com' || parsed.hostname == 'douban.com')
      && url.match(/\/note\/(\d+)/)
  },

  async process(url) {
    let id = url.match(/\/note\/(\d+)/)[1]

    let res = await fetch(`https://www.douban.com/note/${id}/`)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('.note-container h1').textContent
    let author = document.querySelector('.note-container .note-author').textContent
    let content = document.querySelector('.note-container #link-report .note')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://www.douban.com/note/763880212/',
    'https://www.douban.com/doubanapp/dispatch?uri=/note/763880212/&dt_dapp=1',
    'https://m.douban.com/note/763880212/?dt_dapp=1',
    'https://douban.com/note/763880212/'
  ]

}
