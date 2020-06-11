function strip(str) {
  return str.replace(/(^\s*|\s*$)/g, '')
}

module.exports = function({title, author, dom}) {
  let mdTitle = ''
  if (author) {
    mdTitle = `${strip(title)} by ${strip(author)}`
  } else {
    mdTitle = strip(title)
  }

  let html = dom.innerHTML
  let mdBody = html.split("\n").map(line => strip(line)).join('')


  return `${mdTitle}\n------\n${mdBody}`
}