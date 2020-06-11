let fetchArticle = require('./src/fetchArticle')

function assertArticleFormat({title, dom}) {
  if (title && dom) {

  } else {
    throw Error('failed to match article format')
  }
}

async function assertFetch(url) {
  return assertArticleFormat(await fetchArticle(url))
}

;(async () => {
  // matters
  await assertFetch('https://matters.news/@dunesworkshop/%E4%B8%AD%E6%96%87%E4%BA%92%E8%81%94%E7%BD%91%E4%B8%AD-%E8%AE%A8%E8%AE%BA-%E7%9A%84%E6%B6%88%E4%BA%A1-bafyreibmdo43v35az6rspj7ghypebxghoahcqg2crjxf4naditmfok5wzy')

  // chinadigitaltimes
  await assertFetch('https://chinadigitaltimes.net/chinese/2020/04/%e5%87%a4%e5%87%b0weekly-%e5%af%b9%e4%b8%8d%e8%b5%b7%ef%bc%8c%e7%bd%91%e4%b8%8a%e7%82%b9%e8%9c%a1%e7%83%9b%e6%95%91%e4%b8%8d%e4%ba%86%e6%b6%88%e9%98%b2%e5%91%98%e7%9a%84%e5%91%bd/')
  await assertFetch('https://chinadigitaltimes.net/chinese/2020/04/凤凰weekly-对不起，网上点蜡烛救不了消防员的命/')

  // telegraph
  await assertFetch('https://telegra.ph/%E8%B4%A2%E7%BB%8F%E5%8D%81%E4%B8%80%E4%BA%BA--%E4%B8%93%E8%AE%BF%E6%96%B9%E6%96%B9%E5%A6%82%E6%9E%9C%E6%88%91%E4%B8%8D%E4%BA%A4%E4%BB%A3%E8%B0%A3%E8%A8%80%E5%B0%B1%E6%B0%B8%E8%BF%9C%E6%B2%A1%E5%AE%8C-04-18')

  // weixin
  await assertFetch('http://mp.weixin.qq.com/s?__biz=Mzg4OTE2MzU1Ng==&amp;mid=2247486095&amp;idx=1&amp;sn=98a427fc595b42cd804fd6ca8992f673&amp;chksm=cff150c4f886d9d2b120b42379d1e4255d2f6e9bfbac7afc7a9c3fc712540220e6484d48c286&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1586605001116&amp;sharer_shareid=f467668849c8544e583567bf8a259f31#rd')
  await assertFetch('https://mp.weixin.qq.com/s/xDKKicV22IBRGnNnNStOVg')

})()
