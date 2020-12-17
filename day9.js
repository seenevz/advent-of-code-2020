input = memoGetInput()

testInput = ["35", "20", "15", "25","47", "40", "62", "55", "65", "95", "102", "117", "150", "182", "127", "219", "299", "277", "309", "576"]

function parseAllInt(input){
  return input.map(n => parseInt(n))
}

parsedTest = parseAllInt(testInput)
parsedInput = parseAllInt(input)

//Part 1

function findBrokenNum(input) {
  //again a for loop to be able to access index and break earlier; index starts at 25 since thats the i for the
  //first num we're checking
  for(let i = 25; i < input.length; i++) {
    if(!checkNumValidity(input, i)) return input[i]
  }
}

function findPreamble(numArr, currI) {
  return numArr.slice(currI - 25 , currI)
}

function checkNumValidity(numArr, currI) {
  //this will basically do a grid match for the number validity
  return findPreamble(numArr, currI)
    .some((num, i, arr) => arr.some((num2, i2) => i !== i2 && num + num2 === numArr[currI]))
}
  
// findBrokenNum(parsedTest)
// findBrokenNum(parsedInput)

//Part 2
function processAccArr(accArr) {
	const sorted = accArr.sort((a, b) => a - b)
  console.log('sorted is',sorted)
  return sorted[0] + sorted[sorted.length - 1]
}

function findEncriptionWeakness(input) {
  const brokenNum = findBrokenNum(input)
  for(let inputI = 0; inputI < input.length; inputI++) {
    let acc = []
    const accVal = acc => acc.reduce((acc, val) => acc + val, 0)
    for(let i = inputI; accVal(acc) <= brokenNum; i++) {
    	if(accVal(acc) === brokenNum) return processAccArr(acc)
      acc = [...acc, input[i]]
    }
  }
}

// findEncriptionWeakness(parsedTest)
findEncriptionWeakness(parsedInput)

