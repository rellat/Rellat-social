
function fadeOutIn (outElem, InElement, speed) {
  if (!outElem.style.opacity) {
    outElem.style.opacity = 1
  } // end if

  var outInterval = setInterval(function () {
    outElem.style.opacity -= 0.04
    if (outElem.style.opacity <= 0) {
      clearInterval(outInterval)

      outElem.style.display = 'none'
      InElement.style.display = 'block'
      InElement.style.opacity = 0

      var inInterval = setInterval(function () {
        InElement.style.opacity = Number(InElement.style.opacity) + 0.04
        if (InElement.style.opacity >= 1) clearInterval(inInterval)
      }, speed / 50)
    }
  }, speed / 50)
} // end fadeOut()

function toggleClass (obj, classname) {
  var targetobj = obj
  if (typeof obj === 'string') { targetobj = document.getElementById('obj') }
  var classes = targetobj.className.match(/[^\x20\t\r\n\f]+/g) || []
  var rmatch = classes.indexOf(classname)

  if (rmatch > -1) {
    classes.splice(rmatch, 1)
    targetobj.className = classes.join(' ')
  } else {
    classes.push(classname)
    targetobj.className = classes.join(' ')
  }
}

function hasClass (self, selector) {
  var className = ' ' + selector + ' '
  if ((' ' + self.className + ' ').replace(/[\n\t\r]/g, ' ').indexOf(className) > -1) {
    return true
  }
  return false
}

function getTimeDifference(current, previous) {
  var msPerMinute = 60 * 1000
  var msPerHour = msPerMinute * 60
  var msPerDay = msPerHour * 24
  var msPerMonth = msPerDay * 30
  var msPerYear = msPerDay * 365
  var elapsed = current - previous

  if (elapsed < msPerMinute) return Math.floor(elapsed / 1000) + ' seconds ago'
  else if (elapsed < msPerHour) return Math.floor(elapsed / msPerMinute) + ' minutes ago'
  else if (elapsed < msPerDay) return Math.floor(elapsed / msPerHour) + ' hours ago'
  else if (elapsed < msPerMonth) return Math.floor(elapsed / msPerDay) + ' days ago'
  else if (elapsed < msPerYear) return 'approximately ' + Math.floor(elapsed / msPerMonth) + ' months ago'
  else return Math.floor(elapsed / msPerYear) + ' years ago'
}

module.exports = {
  fadeOutIn: fadeOutIn,
  toggleClass: toggleClass,
  hasClass: hasClass,
  getTimeDifference: getTimeDifference
}
