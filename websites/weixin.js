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

  },

  samples: [
    'http://mp.weixin.qq.com/s?__biz=Mzg4OTE2MzU1Ng==&amp;mid=2247486095&amp;idx=1&amp;sn=98a427fc595b42cd804fd6ca8992f673&amp;chksm=cff150c4f886d9d2b120b42379d1e4255d2f6e9bfbac7afc7a9c3fc712540220e6484d48c286&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1586605001116&amp;sharer_shareid=f467668849c8544e583567bf8a259f31#rd',
    'https://mp.weixin.qq.com/s/xDKKicV22IBRGnNnNStOVg'
  ]

}