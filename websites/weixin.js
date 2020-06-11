let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'mp.weixin.qq.com'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('#activity-name').textContent
    let author = document.querySelector('#js_name').textContent
    let content = document.querySelector('#js_content')

    Array.from(content.querySelectorAll('img')).map(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src
      }
    })

    return {
      title,
      author,
      dom: content
    }

  }

}