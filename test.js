let websites = require('./websites')
let fetchArticle = require('./src/fetchArticle')
let determineWebsite = require('./src/determineWebsite')
let renderToMarkdown = require('./src/renderToMarkdown')

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
      var website = process.argv[3]
      var samples = websites[website].samples
      samples.map(async (sample) => {
        console.log(await fetchArticle(sample))
      })
      break
    case 'test-all-websites':
      Object.values(websites).map(website => {
        website.samples.map(async (sample) => {
          console.log(await fetchArticle(sample))
        })
      })
      break
    case 'test-website-markdown':
      var website = process.argv[3]
      var samples = websites[website].samples
      samples.map(async (sample) => {
        console.log(renderToMarkdown(await fetchArticle(sample)))
      })
      break
    case 'determine-website':
      let url = process.argv[3]
      console.log(determineWebsite(url))
  }
})()
