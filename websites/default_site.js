let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let { extract } = require('article-parser')

module.exports = {
  test(url) {
    return true
  },

  async process(url) {
    const article = await extract(url)
    if (!article) {
      throw new Error('default handler error')
    }
    let title = article.title
    let author = article.author
    let dom = new JSDOM(`<!DOCTYPE html><body>${article.content}</body>`).window.document.querySelector('body')
    return {
      title,
      author,
      dom
    }
  },

  samples: [
    ''
  ]

}
