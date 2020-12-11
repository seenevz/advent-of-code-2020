function getInput(splitRegex = /\n/) {
  const inputString = document.querySelector('pre').innerText.trim()
  return inputString.split(splitRegex)
}

function memoMe(expensiveFunc) {
  let inputMemo = null
  return (arg) => {
    if (inputMemo === null) {
    	inputMemo = expensiveFunc(arg)
      return inputMemo
  	} else {
    	console.info("I'm memoised!")
    	return inputMemo
  	}
  }
}

myRange = (function(start, stop) {
  const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')
  return (begin, end) => {
    begin = alphaNum.indexOf(begin)
    end = alphaNum.indexOf(end)
		//~ is bitwise not, it turn the -1 in 0, making it false
    return !~begin || !~end ? null : alphaNum.slice (begin, end + 1)
  }
})()

memoGetInput = memoMe(getInput)