let { URL } = require('url')
let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')
let querystring = require('querystring')

module.exports = {
  test(url) {
    let parsed = new URL(url)
    return ((parsed.hostname == 'm.weibo.cn') && (parsed.pathname.startsWith('/status') || parsed.pathname.startsWith('/detail') || parsed.pathname.match(/^\/\d+\/.+/))) ||
      ((parsed.hostname == 'weibo.com' || parsed.hostname == 'www.weibo.com')) && (parsed.pathname.match(/^\/\d+\/.+/)) ||
      (parsed.hostname == 'weibointl.api.weibo.com')
  },

  async process(url) {
    let parsed = new URL(url)
    let id

    switch (parsed.hostname) {
      case 'm.weibo.cn':
        if (parsed.pathname.startsWith('/status')) {
          id = parsed.pathname.match(/\/status\/(\d+)/)[1]
        } else if (parsed.pathname.startsWith('/detail')) {
          id = parsed.pathname.match(/\/detail\/(\d+)/)[1]
        } else {
          id = parsed.pathname.match(/\/\d+\/(.+)/)[1]
        }
        break
      case 'weibo.com':
      case 'www.weibo.com':
        id = parsed.pathname.match(/\/\d+\/(.+)/)[1]
        break
      case 'weibointl.api.weibo.com':
        id = querystring.parse(parsed.search.replace(/^\?/, '')).weibo_id
    }

    let res = await fetch(`https://m.weibo.cn/statuses/show?id=${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
      }
    })
    let json = await res.json()

    let pics
    if (json.data.pics) {
      pics = json.data.pics.map(img => img.large.url).map(url => `<p><img src="${url}"></p>`).join('')
    } else {
      pics = ''
    }


    return {
      title: json.data.status_title,
      author: json.data.user.screen_name,
      dom: new JSDOM(`<body>${json.data.text}${pics}</body>`).window.document.querySelector('body')
    }

  },

  samples: [
    'https://m.weibo.cn/status/4577433632120051',
    'https://weibo.com/1662030957/JvRGc4Zpn',
    'https://m.weibo.cn/1662030957/4578161557768666',
    'http://weibointl.api.weibo.com/share/187738226.html?weibo_id=4578161557768666',
    'https://m.weibo.cn/detail/4578415652376936'
  ]

}