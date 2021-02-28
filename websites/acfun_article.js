let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname.match("acfun.cn")
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document
    let window = {}
    eval(document.querySelector('div.main script').textContent)
    let title = window.articleInfo.title
    let author = window.articleInfo.user.name
    let content = new JSDOM(`<body>${window.articleInfo.parts.map(x => x.content).join('')}</body>`).window.document.querySelector('body')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://www.acfun.cn/a/ac26073852'
  ]
}
