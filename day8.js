input = memoGetInput()
parsedInput = parseAllInstructions(input)

function parseInstruction(string) {
  const splittedString = string.split(/ /)
  return [splittedString[0], parseInt(splittedString[1])]
}

function parseAllInstructions(input) {
  return input.map(i => parseInstruction(i))
}


testInput = ["nop +0",
"acc +1",
"jmp +4",
"acc +3",
"jmp -3",
"acc -99",
"acc +1",
"jmp -4",
"acc +6"]
/*
This will behave like a queue, and when it tries to grab an instruction that doesn't exit, we know
its the beggining of the loop. To achieve that, we'll consume each instrution that goes into executeInstruction
by removing it from the queue
*/

/* I've messed up the code for the part 1 while completing part 2, so it might not work at this stage */

//Part 1
fetchNewInstruction = (function(){
  let currIndexold = 0
  return function(offset, instructionsQueue, currIndex) {
    let newIndex = currIndex + offset
    return currIndex === instructionsQueue.length - 1
    	? ['EOF', 0]
      : [instructionsQueue.splice(newIndex, 1, undefined)[0], newIndex]
  }
})()//more memoisation, maybe not the best approach

executeInstruction = (function(){
  let accold = 0;
  return function(instruction, instructionsQueue, acc, offsetIndex) {
  	//there will be some mutations happening here
    switch(instruction[0]) {
      case 'acc':
        return [...fetchNewInstruction(1, instructionsQueue, offsetIndex), acc += instruction[1]]
      case 'jmp':
        return [...fetchNewInstruction(instruction[1], instructionsQueue, offsetIndex), acc]
      case 'nop':
        return [...fetchNewInstruction(1, instructionsQueue, offsetIndex), acc]
      case 'EOF':
        return ['eof', 0, acc]
      default:
        return;
    }
  }
})()// This will make it memoise the accumulator
/*
function findFinalAcc(parsedInput){
  let next = parsedInput[0];
  while (typeof next === 'object') {
    next = executeInstruction(next, parsedInput)    
  }
  return next
}
*/
// findFinalAcc(parseAllInstructions(testInput))
//findFinalAcc(parsedInput)

//Part 2

function findFinalTotalAcc(parsedInput) {
  //for loop allows for early termination with a return statement and it keeps track of index
	for(let i = 0; i < parsedInput.length; i++) {
    const resp = parsedInput[i][0] !== 'acc' && testInversedInstruction([...parsedInput], i)
    console.log(resp[0])
    if(resp[0] === 'EOF') return resp[1]
  }
  return "something's wrong"
}

function testInversedInstruction(queue, currIndex) {
  const inversed = [queue[currIndex][0] === 'nop' ? 'jmp' : 'nop', queue[currIndex][1]]
  const patchedQueue = queue.map((instr, i) => i === currIndex ? inversed : instr)
  
  return runInstructionsQueue(patchedQueue)
}

function runInstructionsQueue(queue) {
	let next = queue[0]
  let acc = 0
  let offsetIndex = 0
  
  while (typeof next === 'object') {
    [next, offsetIndex, acc] = executeInstruction(next, queue, acc, offsetIndex)
  }
  return [next, acc]
}

// findFinalTotalAcc(parseAllInstructions(testInput))
findFinalTotalAcc(parsedInput)

