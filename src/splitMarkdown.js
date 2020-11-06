
function strip(str) {
  return str.replace(/(^\s*|\s*$)/g, '')
}

module.exports = function(md, maxlen=65535) {
  let mdarray = []
  console.log(md.length)
  if (md.length < maxlen){
    mdarray[0] = md 
  }else{
    let phs = md.split('\n\n')
    mdarray.push(phs[0])
    let idx = 0
    for (i=0;i<phs.length;i++){
      if (mdarray[idx].length + phs[i].length < (maxlen-2)){
        mdarray[idx] = mdarray[idx] + `\n\n` + phs[i]
      }else{
        idx += 1
        mdarray.push(phs[i])
      }
    }
  }

  return mdarray
}