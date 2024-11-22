


var menuArray = [];
const fs = require('fs');
const xml2js = require('xml2js');
const prompt = require('prompt-sync')({sigint: true});
const { parseXML } = require("../parseXML.js");
const { addValue, checkValue, checkIfExists } = require("../leveldb/level.js");

const User = require('../user.js');
const Food = require('./foodclasstest.js');

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

        // Output the parsed XML
        //console.log(JSON.stringify(result, null, 2));

        //const menuArray = [];
        const includedArray = ['title','calories', 'carbs', 'protein', 'fat', 'sugars', 'sodium', 'dietaryfiber'];



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
                menuArray.push(new Food(foodArray));
            });
        }


        console.log("\n \nScore Results:\n");
        for (let i = 0; i < menuArray.length; i++) {
            console.log((menuArray[i].getName) + ", diff: ");
            console.log(scoreMeal(menuArray[i].data));

        }

        const foodt = Food.combine(menuArray[0],menuArray[1]);
        console.log(menuArray[0].data);
        console.log(scoreMeal(menuArray[0].data));
        console.log(menuArray[1].data);
        console.log(scoreMeal(menuArray[1].data));

        console.log(foodt.data);
        console.log(scoreMeal(foodt.data));

        const foot = Food.multcombine(menuArray);
        console.log(foot.data);
        console.log(scoreMeal(foot.data));

    });
});



