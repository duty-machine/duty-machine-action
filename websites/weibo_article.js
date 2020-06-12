let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let querystring = require('querystring')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return (parsed.hostname == 'www.weibo.com' && parsed.pathname.startsWith('/ttarticle')) ||
      (parsed.hostname == 'card.weibo.com' && parsed.pathname.startsWith('/article/m/show'))
  },

  async process(url) {
    let parsed = new URL(url)

    let id = null

    switch (parsed.hostname) {
      case 'www.weibo.com':
        id = querystring.parse(parsed.search.replace(/^\?/, '')).id
        break
      case 'card.weibo.com':
        id = parsed.pathname.match(/\/id\/(\d+)/)[1]
        break
    }

    let res = await fetch(`https://card.weibo.com/article/m/aj/detail?id=${id}`, {
      headers: {
        'Referer': `https://card.weibo.com/article/m/show/id/${id}`,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
      }
    })
    let json = await res.json()

    return {
      title: json.data.title,
      author: json.data.userinfo.screen_name,
      dom: new JSDOM(`<body>${json.data.content}</body>`).window.document.querySelector('body')
    }

  },

  samples: [
    'https://www.weibo.com/ttarticle/p/show?id=2309404443702348087422',
    'https://card.weibo.com/article/m/show/id/2309404513935859515537?_wb_client_=1'
  ]

}