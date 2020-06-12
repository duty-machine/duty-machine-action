let websites = require('./websites')
let fetchArticle = require('./src/fetchArticle')
let determineWebsite = require('./src/determineWebsite')

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
  let cmd = process.argv[2]
  switch(cmd) {
    case 'test-website':
      let website = process.argv[3]
      let samples = websites[website].samples
      samples.map(async (sample) => {
        console.log(await fetchArticle(sample))
      })
      break
    case 'determine-website':
      let url = process.argv[3]
      console.log(determineWebsite(url))
  }
})()
