let websites

module.exports = function(url) {
  if (websites) {

  } else {
    websites = require('./../websites')
  }
  let website = Object.values(websites).find(w => w.test(url))
  return website
}
