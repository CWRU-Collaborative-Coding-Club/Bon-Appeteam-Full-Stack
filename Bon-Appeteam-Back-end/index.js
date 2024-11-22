const fs = require('fs');
const xml2js = require('xml2js');
const { parseXML } = require("./parseXML.js");
const { addValue, checkValue, checkIfExists } = require("./leveldb/level.js");
let menuArray = [];
console.log("test (veer)");


const scoreMeal = require('./scoreMeal');
const inputCombo = require('./combo');

// Read the XML file
fs.readFile('./menu.xml', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the XML data
  xml2js.parseString(data, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("List of food titles: \n");
    //Lists each of the food items by name. These are the possible inputs for inputCombo function
    if (result && result.menu && result.menu.food) {
        result.menu.food.forEach(food => {
          if (food.title && food.title.length > 0) {
            console.log(food.title[0]);
          }
        })
    }
    console.log("\n");
    inputCombo();
    // Output the parsed XML
    //console.log(JSON.stringify(result, null, 2));

    //const menuArray = [];
    const includedArray = ['title','calories', 'carbs', 'protein', 'fat', 'sugars', 'sodium', 'dietaryfiber'];
   // uheruifhiuerhfuhehfkh
    

    // Extract and populate the array
    if (result && result.menu && result.menu.food) {
      result.menu.food.forEach(food => {
        const foodArray = [];
        // Iterate over the keys in each food object
        Object.keys(food).forEach(key => {
          // Skip the id attribute
          
          if (includedArray.includes(key)){
            foodArray.push(food[key][0]);
          }
          
          
          //foodArray.push(food[key][0]);
        });
        // Add the foodArray to the menuArray
        menuArray.push(foodArray);
      });
    }

    // // Output the two-dimensional array
    // console.log(" \n \nOutputting the two-dimensional array: \n")
    // console.log(menuArray);
    //
    // menuArray = sortNtr(menuArray);
    // console.log("\n \nScore Results:\n");
    // for (let i = 0; i < menuArray.length; i++) {
    //   console.log((menuArray[i][0]) + ", diff: ");
    //   console.log(scoreMeal(menuArray[i]));
    // }

    // console.log("Found food: " + menuArray[srchFood('Oatmeal')][0]);
    //
    // console.log("\n \nTest for Combos: \n");
    // var foodComboTest = [
    //   menuArray[0],
    //   menuArray[1]
    // ];
    // foodCombo(foodComboTest);
  });
});

const calpg = [4,4,9]

//searches for the given food in the menu and returns its placement
function srchFood(name) {
  let foodFound = false;
  let itr = -1;

  while (!foodFound) {
    itr++;
    foodFound = menuArray[itr][0] === name;
  }

  return itr
}

//Modified quicksort for sorting a list of foods
function sortNtr(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (compareNut(arr[i], pivot)) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...sortNtr(leftArr), pivot,...sortNtr(rightArr)];
}

//Helper function to compare two foods 
function compareNut(arr1, arr2) {
  return scoreMeal(arr1) < scoreMeal(arr2);
}

