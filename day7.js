input = memoGetInput()

memoParse = memoMe(() => parseInput(input))

parsedInput = memoParse()

//Part 1//////////////////////

testInput = ["light red bags contain 1 bright white bag, 2 muted yellow bags.",
"dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
"bright white bags contain 1 shiny gold bag.",
"muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
"shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
"dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
"vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
"faded blue bags contain no other bags.",
"dotted black bags contain no other bags."]

testInput2 = ["shiny gold bags contain 2 dark red bags.",
"dark red bags contain 2 dark orange bags.",
"dark orange bags contain 2 dark yellow bags.",
"dark yellow bags contain 2 dark green bags.",
"dark green bags contain 2 dark blue bags.",
"dark blue bags contain 2 dark violet bags.",
"dark violet bags contain no other bags."]

/* 
I reckon Im gonna have to parse some sort of tree from the specs so I can more easily count the colors;
the root will be the shiny gold bag, and its children will be the bags that can hold it, and it carries on like that recursively
  */

function parseBag(bagString) {
  let [colour, contain] = bagString.replaceAll(/bag(|s)\b/g, "").split(/  contain/)
  canHold = contain.split(",").map(s => ({
    qty: parseInt(s.match(/\d/)?.[0]) || 0, 
    colour: s.match(/\b\w{2,}/g)?.join(" ")
  }))
  return {colour, canHold}
}

function parseInput(input) {
  return input.map(i => parseBag(i))
}
/*
function createNode(colour, remainingBags) {
  const children = remainingBags.filter(b => b.canHold.find(s => s.colour === colour))
  
  if(children.length) {
    return {
      colour,
      canBeHoldIn: children.map(c => createNode(c.colour, remainingBags))
    }
  } else {
   	return {
      colour,
      canBeHoldIn: null
    }
  }
}

function countAllBags(node, count = []) {
  //Gotta account for repeated bag colours, didn't realised this till after pulling out all my hair
  if (!count.includes(node.colour)) count.push(node.colour)
  
  if (node.canBeHoldIn?.length) {
    return node.canBeHoldIn
    	.map(n => countAllBags(n, count))
    	.reduce((acc, val) => val > acc ? val : acc)
  } else {
    return count.length - 1 // just removig the root bag that isnt part of the count
  }
}

function createBagsTree(parsedInput) {
  const rootNode = createNode('shiny gold', parsedInput)
  
  return {
    rootNode,
    bagsCount: countAllBags(rootNode)
  }
}


createBagsTree(parsedInput).bagsCount
// createBagsTree(parseInput(testInput))
*/

//Part 2 ///////////////////////////

/* I'll just create a new object tree to keep it easy to read */

function createNode(colour, remainingBags) {
  const parsedBag = remainingBags.find(b => b.colour === colour)
  
  if(parsedBag?.canHold?.length) {
    return {
      colour,
      contains: parsedBag.canHold.map(({qty, colour}) => ({qty, bag: createNode(colour, remainingBags)}))
    }
  } else {
    return {
      colour,
      contains: null
    }
  }
}

//This count algo did wreck my brain, especially because apparently I can't still read properly
function countBagsContain(node, prevBagQty = 1, objQty = 1) {
 if(!node.contains.some(obj => obj.bag.colour === "no other")) {
    return node.contains.reduce((count, obj) => {
      const nCount = obj.qty * prevBagQty 
      return count + obj.qty * prevBagQty + countBagsContain(obj.bag, nCount, obj.qty)
    }, 0)
    } else {
      return 0
 }
}

function createBagsTree(parsedInput) {
  const rootNode = createNode('shiny gold', parsedInput)
  return {
    rootNode,
    bagsAmount: countBagsContain(rootNode)
  }
}

// createBagsTree(parseInput(testInput)).bagsAmount
// createBagsTree(parseInput(testInput2)).bagsAmount
createBagsTree(parseInput(input)).bagsAmount