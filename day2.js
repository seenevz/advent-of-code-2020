input = memoGetInput()

// Part 1
function parsePassInput(passString) {
  const [passPolicy, password] = passString.split(": ")
  const [rangeString, letter] = passPolicy.split(" ")
  // Let's pretend range is a tuple
  const range = rangeString.split("-").map(s => parseInt(s))
  
  return { passPolicy: {letter, range}, password }
}

function validatePassword(passInput) {
  const {password, passPolicy} = passInput
  const letterCount = password.split("").filter(char => char === passPolicy.letter).length
  return letterCount >= passPolicy.range[0] && letterCount <= passPolicy.range[1] 
}

function countValidPasswords(passArr) {
  return passArr.filter(p => validatePassword(parsePassInput(p))).length
}

console.log(countValidPasswords(input))

//Part 2

function parsePassInput(passString) {
  const [passPolicy, password] = passString.split(": ")
  const [rangeString, letter] = passPolicy.split(" ")
  // Let's pretend range is a tuple
  const range = rangeString.split("-").map(s => parseInt(s) - 1)
  
  return { passPolicy: {letter, range}, password }
}

function validatePassword(passInput) {
  const {password, passPolicy} = passInput
  const pos1Char = password.charAt(passPolicy.range[0])
  const pos2Char = password.charAt(passPolicy.range[1])
  
  //   return (pos1Char === passPolicy.letter && pos2Char !== passPolicy.letter) ||
  //     			(pos1Char !== passPolicy.letter && pos2Char === passPolicy.letter)
  // Dunno which reads better really
  return pos1Char === passPolicy.letter ? 
    pos2Char !== passPolicy.letter ? 
    true 
  : false 
  : pos2Char === passPolicy.letter ? 
    true 
  : false
  
}

function countValidPasswords(passArr) {
  return passArr.filter(p => validatePassword(parsePassInput(p))).length
}

console.log(countValidPasswords(input))

