
let { Octokit } = require('@octokit/rest')
let fetchArticle = require('./src/fetchArticle')
let renderToMarkdown = require('./src/renderToMarkdown')
let splitMarkdown = require('./src/splitMarkdown')

require('dotenv').config()

let TOKEN = process.env.TOKEN
let REPOSITORY = process.env.REPOSITORY
let [OWNER, REPO] = REPOSITORY.split('/')

let octokit = new Octokit({
  auth: TOKEN
})

async function performTasks() {
  let { data } = await octokit.issues.listForRepo({
    owner: OWNER,
    repo: REPO,
    state: 'open'
  })

  data = data.slice(0,4)

  let promises = data.map(async (issue) => {
    try {
      let articleData = await fetchArticle(issue.body || issue.title)
      let md = renderToMarkdown(articleData)
      let mdarray = splitMarkdown(md)
      await octokit.issues.createComment({
        owner: OWNER,
        repo: REPO,
        issue_number: issue.number,
        body: mdarray[0]
      })
      for (i=1;i<mdarray.length;i++){
        if (mdarray[i].length < 65536){
          await octokit.issues.createComment({
            owner: OWNER,
            repo: REPO,
            issue_number: issue.number,
            body: mdarray[i]
          })
        }
      }
      await octokit.issues.update({
        owner: OWNER,
        repo: REPO,
        issue_number: issue.number,
        state: 'closed',
        title: articleData.title,
        labels: ['fetched']
      })
    } catch(error) {
      await octokit.issues.createComment({
        owner: OWNER,
        repo: REPO,
        issue_number: issue.number,
        body: `错误 ${error.toString()}`
      })
      await octokit.issues.update({
        owner: OWNER,
        repo: REPO,
        issue_number: issue.number,
        state: 'closed',
        labels: ['error']
      })
      throw error
    }
  })

  await Promise.all(promises)
}

performTasks()