let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    let weixin = parsed.hostname == 'mp.weixin.qq.com'
    let weixinArchive = parsed.hostname == 'wechatscope.jmsc.hku.hk'
    let myzaker = parsed.hostname == 'www.myzaker.com'
    return weixin || weixinArchive || myzaker
  },

  getPublishTime(document) {
    let time
    let timeFound = Array.from(document.querySelectorAll('script')).some(v=>{
      let m = /var \w+="\d*",\w+="(\d*)",\w+="[\d-]*";/g.exec(v.textContent)
      if (m) {
        time = Number.parseInt(m[1])
      }
      return !!m
    })
    if (!timeFound) {
      return
    } else {
      return time
    }
  },

  async process(url) {
    let res = await fetch(url)
    console.log(res.status)
    let html = await res.text()
    let document = new JSDOM(html).window.document

    let title = document.querySelector('#activity-name').textContent
    let author = document.querySelector('#js_name').textContent
    let content = document.querySelector('#js_content')
    let publishTime = this.getPublishTime(document)

    Array.from(content.querySelectorAll('img')).map(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src
      }
    })

    return {
      title,
      author,
      publishTime,
      dom: content
    }

  },

  samples: [
    'http://mp.weixin.qq.com/s?__biz=Mzg4OTE2MzU1Ng==&amp;mid=2247486095&amp;idx=1&amp;sn=98a427fc595b42cd804fd6ca8992f673&amp;chksm=cff150c4f886d9d2b120b42379d1e4255d2f6e9bfbac7afc7a9c3fc712540220e6484d48c286&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1586605001116&amp;sharer_shareid=f467668849c8544e583567bf8a259f31#rd',
    'https://mp.weixin.qq.com/s/xDKKicV22IBRGnNnNStOVg'
    //'https://wechatscope.jmsc.hku.hk/api/html?fn=gh_3c3083a27d8e_2020-09-29_2247507405_Wi6OnYd2ak.y.tar.gz'
  ]

}
