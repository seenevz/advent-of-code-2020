let input = getINput()

//Part 1
input.some(item => {
  input.some(item2 => {
    if(item + item2 === 2020) {
      console.log(item * item2)
      return true
    }}) 
})

//Part 2
input.some(i => input.some(i2 => input.some(i3 =>{
//loops galore
  if (i + i2 + i3 === 2020) {
    console.log(i * i2 * i3)
    return true
  }
})))
