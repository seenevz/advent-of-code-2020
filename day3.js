input = memoGetInput()

//Part 1

function checkIfHitTree(locationsString, myLocation) {
  if (!locationsString) return false // out of range here
  const tree = "#"
  const myLocWithinArr = myLocation < locationsString.length ? myLocation : myLocation % locationsString.length
  
  return locationsString.charAt(myLocWithinArr) === tree
}


function keepCountsHits(validator) {
  //Cuz global vars are not cool right?
  let treesHits = 0
  let posInSlope = 0
  
  return (inputArr) => {
    inputArr.forEach((posString) => {
      if (validator(posString, posInSlope)) treesHits += 1
      posInSlope += 3
    })
    
    return treesHits
  }
}

slopeHitsCounter = keepCountsHits(checkIfHitTree)

console.log(slopeHitsCounter(input))

//Part 2
// I reckon it's time for some refactoring, as my part 1 solution assumed we would always be looking one row ahead for colisions

function keepCountsHits(validator) {
  //Cuz global vars are not cool right?
  let treesHits = [] //becomes an array to be able to keep all hits and reduce it in the end
  let posInSlope = [] //becomes an array to be able to keep track of all positions
  
  return (inputArr, lookAheadArr) => {
    treesHits = Array(lookAheadArr.length).fill(0)
    posInSlope = Array(lookAheadArr.length).fill(0)
    
    inputArr.forEach((posString, inputI, inputArr) => {
      lookAheadArr.forEach((coordsTuple, coordsI, coordsArr) => {
        if (inputI % coordsTuple[1] === 0) {
          //gotta stop nesting stuff
          posInSlope[coordsI] += coordsTuple[0]
          if (validator(inputArr[inputI + coordsTuple[1]], posInSlope[coordsI])) treesHits[coordsI] += 1
        }
      })
    })
    return treesHits.reduce((acc, val) => acc * val)
  }
}

slopeHitsCounter = keepCountsHits(checkIfHitTree)

/*
	This is what we're looking for
    Right 1, down 1.
    Right 3, down 1. (This is the slope you already checked.)
    Right 5, down 1.
    Right 7, down 1.
    Right 1, down 2.
    
  I'll make it into an array of tuples that represent coordinates and do a lookup for each at the same time
*/

coordsArr = [[1,1], [3,1], [5,1], [7,1],[1,2]]

console.log(slopeHitsCounter(input, coordsArr))

