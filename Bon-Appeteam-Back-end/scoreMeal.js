//for calculating nutrition deviation for a given food[]
function scoreMeal(arr) {
    const cal = arr[1];
    const car = arr[2];
    const pro = arr[3];
    const fat = arr[4];

    const sugar = arr[5];  //50g advised for 2000 cal : .025g per cal
    const sodium = arr[6]; //1500mg advised for 2000 cal : .75mg per cal
    const fiber = arr[7];  //28g advised for 2000 cal : .014g per cal

    //hardcoded values for recommended macros, can be changed
    const cdiff = Math.abs(.45 - (car*4)/cal);
    const pdiff = Math.abs(.35 - (pro*4)/cal);
    const fdiff = Math.abs(.2 - (fat*9)/cal);

    //hardcoded values for recommended sugar, sodium, fiber
    const sudiff = Math.abs(.025 - sugar/cal);
    const sodiff = Math.abs(.75 - sodium/cal);
    const fibdiff = Math.abs(.014 - fiber/cal);

    return (cdiff + pdiff + fdiff + sudiff + sodiff + fibdiff)/6;

}

module.exports = scoreMeal;