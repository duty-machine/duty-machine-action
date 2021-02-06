let fs = require('fs')

let fileNames = fs.readdirSync(`${__dirname}/`)

let websites = fileNames.filter(f => f != 'index.js' && f != 'defaultSite.js').map(f => {
  let name = f.replace(/\.js$/, '')
  return [name, require(`./${name}`)]
}).reduce((acc, x) => {
  acc[x[0]] = Object.assign({}, {name: x[0]}, x[1])
  return acc
}, {})

module.exports = websites