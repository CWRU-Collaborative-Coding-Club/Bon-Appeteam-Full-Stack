//
//assume meal with these nutrient values
const c = 14
const p = 24
const f = 21
const cal = 340

//assume goal nutrient percent for day
const gc = .45
const gp = .35
const gf = .20

//find difference in percents
const cdiff = Math.abs(gc - (c*4)/cal)
const pdiff = Math.abs(gp - (p*4)/cal)
const fdiff = Math.abs(gf - (f*9)/cal)

//sum differences, lower score would be better
const score = cdiff + pdiff + fdiff


//function to take meal from two dimensional array and give score
function scoreMeal(arr){

  const cal = array[0]
  const car = array[1]
  const pro = array[2]
  const fat = array[3]

  const cdiff = Math.abs(.45 - (car*4)/cal)
  const pdiff = Math.abs(.35 - (pro*4)/cal)
  const fdiff = Math.abs(.2 - (fat*9)/cal)

  return cdiff + pdiff + fdiff
}

