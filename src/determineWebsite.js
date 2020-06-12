let websites = require('./../websites')

module.exports = function(url) {
  let website = Object.values(websites).find(w => w.test(url))
  return website
}
