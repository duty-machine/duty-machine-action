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

  Array.from(dom.querySelectorAll('*')).map(element => {
    element.removeAttribute('class')
    element.removeAttribute('id')
    element.removeAttribute('style')
  })

  // update paths in outerHTML to absolute paths
  Array.from(dom.querySelectorAll('img')).map(img => {
    img.src = img.src
  })

  Array.from(dom.querySelectorAll('a')).map(a => {
    a.href = a.href
  })


  let html = dom.innerHTML
  let mdBody = html.split("\n").map(line => strip(line)).join('')


  return `${mdTitle}\n------\n${mdBody}`
}
