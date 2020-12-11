input = memoGetInput(/\n\n/)


//Part 1
/*
function parseAnswers(answerString) {
  //Sets to the rescue
  return [...new Set(answerString.replaceAll(/\n/,"").split(""))]
}
*/
function countAnswers(input) {
  return input.map(i => parseAnswers(i)).flat().length
}

// countAnswers(input)

//Part 2

function parseGroupAnswers(answersString) {
  return answersString.split(/\n/)
}

function countGroupAnswers(parsedGroupAnswers) {
  let count = 0
  
	myRange('a', 'z').forEach(char => {
    for (const userAnswers of parsedGroupAnswers) {
      if (!userAnswers.match(char)) return false
    }
    ++count
  })
  return count
}

function countAllAnswers(input) {
  const answersCounts = input.map(group => countGroupAnswers(parseAnswers(group)))
  return answersCounts.reduce((acc, val) => acc += val)
}

countAllAnswers(input)