input = memoGetInput()

testInput = ["28","33","18","42","31","14","46","20","48","47","24","23","49","45",
             "19","38","39","11","1","32","25","35","8","17","7","9","4","2","34","10","3"]
testInput2 = ["16", "10","15","5","1","11","7","19","6","12","4"]

//Part 1
function normaliseInput(input){
  return input.map(i => parseInt(i)).sort((a, b) => a - b)
}

function checkRatingDiff(a, b){
  //It assumes the array has been sorted asc previously
  return b - a
}

function calculateRatingDiff(input){
  return [0, ...input]
    .map((input, i, arr) => checkRatingDiff(input, arr[i + 1] ? arr[i + 1] : input + 3))
}

function countRatingDiffs(normalisedInput) {
  return calculateRatingDiff(normalisedInput)
    .reduce((acc, val) => val === 1 ? [++acc[0],acc[1]] : [acc[0], ++acc[1]], [0,0])
    .reduce((acc, val) => acc * val)
}

// countRatingDiffs(normaliseInput(testInput))
// countRatingDiffs(normaliseInput(input))

//Part 2

function countAllVariations(normI) {
  let total = {0: 1}
  const allAdapters = [...normI, normI[normI.length - 1] + 3]
  
  allAdapters.forEach((curr) => {
    total[curr] = (total[curr - 1] || 0 ) + (total[curr -2 ] || 0) + (total[curr - 3] || 0)
  })
  
  return total[allAdapters[allAdapters.length - 1]]
}

// countAllVariations(normaliseInput(testInput))
countAllVariations(normaliseInput(input))

