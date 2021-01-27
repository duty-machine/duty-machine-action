let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'shimo.im'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('.ql-title-box').dataset['value']
    let author = null
    let content = document.querySelector('.ql-editor')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://shimo.im/docs/6GqGpGGD3CwGH3Qy'
  ]
}
