let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'telegra.ph'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('header h1').textContent
    let author = document.querySelector('header a[rel=author]').textContent
    let content = document.querySelector('article')

    content.querySelector('h1').remove()
    content.querySelector('address').remove()

    Array.from(content.querySelectorAll('img')).map(img => {
      if (img.src.startsWith('/file')) {
        img.src = `https://telegra.ph${img.src}`
      }
    })

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://telegra.ph/%E8%B4%A2%E7%BB%8F%E5%8D%81%E4%B8%80%E4%BA%BA--%E4%B8%93%E8%AE%BF%E6%96%B9%E6%96%B9%E5%A6%82%E6%9E%9C%E6%88%91%E4%B8%8D%E4%BA%A4%E4%BB%A3%E8%B0%A3%E8%A8%80%E5%B0%B1%E6%B0%B8%E8%BF%9C%E6%B2%A1%E5%AE%8C-04-18'
  ]

}
