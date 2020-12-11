input = memoGetInput()

//Part 1

function parseTicket(ticketString) {
  //returning a tuple with the encoded row and seat
  return [ticketString.substring(0,7), ticketString.substring(7)]
}

function decodeEntity(encString, controlChar, initialRange) {
  //time for some cheeky recursion
  //rows can vary between 0 <=> 127 and split in F for lower half and B for higher half
  const char = encString.charAt(0)
  const shortenedS = encString.substring(1)
  const halfRange = (initialRange[1] - initialRange[0]) / 2
  
  if (shortenedS === "") return char === controlChar ? initialRange[0] : initialRange[1]
  
  if (char === controlChar) {
    return decodeEntity(shortenedS, controlChar, [initialRange[0], initialRange[1] - Math.ceil(halfRange)])
  } else {
    return decodeEntity(shortenedS, controlChar,  [Math.ceil(initialRange[0] + halfRange), initialRange[1]])
  }
}


function decodeRow(parsedRow) {
  return decodeEntity(parsedRow, "F", [0, 127])
}

function decodeSeat(parsedSeat) {
  return decodeEntity(parsedSeat, "L", [0, 7])
}

function decodeSeatId(ticketString) {
  const parsedTicket = parseTicket(ticketString)
  return decodeRow(parsedTicket[0]) * 8 + decodeSeat(parsedTicket[1])
}

function findHighest(input) {
  let highest = 0
  
  input.forEach(i => {
    const seatId = decodeSeatId(i)
    if (seatId >= highest) highest = seatId
  })
  
  return highest
}

// findHighest(input)

//Part 2 

function convertAllTicketsSorted(input) {
  //if sorted we can find the boundaries, and know which tickets are missing at the beginning and end. Not very performance friendy I guess
  return input.map(i => decodeSeatId(i)).sort((a,b) => a > b)
}

function findTicket(input) {
  const convertedIds = convertAllTicketsSorted(input)
  let missingId = convertedIds[0]
  
  // for...of let us break the loop once we find it
  for (const id of convertedIds) {
    if (missingId !== id) return missingId
    ++missingId
  }
}

findTicket(input)

