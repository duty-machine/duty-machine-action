let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return parsed.hostname == 'archiveofourown.org'
  },

  async process(url) {
    let res = await fetch(url)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('.work .heading a').textContent
    let author = document.querySelector('.work .heading a[rel=author]').textContent
    let content = document.querySelector('.work blockquote.userstuff')

    return {
      title,
      author,
      dom: content
    }

  },

  samples: [
    'https://archiveofourown.org/works/29752227'
  ]
}
