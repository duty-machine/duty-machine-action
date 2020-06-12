let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'chinadigitaltimes.net'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('h1').textContent
    // cdt的作者通常不是原作
    let author = null
    let content = document.querySelector('div.post-content')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://chinadigitaltimes.net/chinese/2020/04/%e5%87%a4%e5%87%b0weekly-%e5%af%b9%e4%b8%8d%e8%b5%b7%ef%bc%8c%e7%bd%91%e4%b8%8a%e7%82%b9%e8%9c%a1%e7%83%9b%e6%95%91%e4%b8%8d%e4%ba%86%e6%b6%88%e9%98%b2%e5%91%98%e7%9a%84%e5%91%bd/'
  ]

}