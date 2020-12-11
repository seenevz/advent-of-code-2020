input = memoGetInput()

//Part 1
/* This is what we're validating here
    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    cid (Country ID)
*/
/*

function checkPassport(passportString) {
	//just some quick parsing and validation
  const requiredTags = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  
  return !requiredTags.some(tag => !passportString.includes(tag))
}

function keepCountValid(validator) {
  let validCount = 0
  
  return (inputPassports) => {
    inputPassports.forEach(pp => {
      if (validator(pp)) validCount += 1
    })
    
    return validCount
  }
}

countValidPassports = keepCountValid(checkPassport)

countValidPassports(input)

*/

//Part 2

/* Its time for some parsing and validation!
	This is what we're validating now
  
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
*/

function inBetween(x, min, max) {
  return x >= min && x <= max
}

passportRules = {
  fields: pString => !['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].some(tag => !pString.includes(tag)),
  byr:(byr) => inBetween(parseInt(byr), 1920, 2002), 
  iyr:(iyr) => inBetween(parseInt(iyr), 2010, 2020), 
  eyr:(eyr) => inBetween(parseInt(eyr), 2020, 2030),
  //tricky one height, I must really check which units are we dealing with
  hgt:(hgtIn) => {const hgt = parseInt(hgtIn); return hgtIn.match(/cm/) ? inBetween(hgt, 150,193) : inBetween(hgt, 59,76)}, 
  hcl:(hcl) => !!hcl.match(/^#[\d|a-f]{6}$/), 
  ecl:(ecl) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl), 
  pid:(pid) => !!pid.match(/^\d{9}$/),
  cid: () => true
}


function parsePassport(passportString) {
  const parsedPassport = {}
  const splitByPairs = passportString.match(/(\w+:\S+)/g)
  splitByPairs.forEach(stringPair => {
    const [key, val] = stringPair.split(":")
    parsedPassport[key] = val
  })
  return parsedPassport
}

function checkPassport(parsedPassport) {
  for (let [key, val] of Object.entries(parsedPassport)) {
    if (!passportRules[key](val)) return false
  }
  return true
}

function countValidPassports(input){
  let count = 0
  
  input.forEach(passString => {
    if (passportRules.fields(passString) && checkPassport(parsePassport(passString))) count += 1
  })
  
  return count
}
console.log(countValidPassports(input))



