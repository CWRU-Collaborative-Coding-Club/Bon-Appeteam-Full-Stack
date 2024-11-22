const readline = require('node:readline');
const util = require('node:util');
const fs = require('node:fs');

//Creating a user input interface
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

const question = util.promisify(rl.question).bind(rl);

const {checkIfExists} = require("./leveldb/level");
const scoreMeal = require('./scoreMeal');

function foodCombo(combo) {
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalSugar = 0;
    let totalSodium = 0;
    let totalFiber = 0;
    let title = [];

    // food = ['title','calories','carbs','protein','fat','sugars','sodium','dietaryfiber']
    for (let food of combo) {
        // TBD
        title.push(food[0]);
        totalCalories += parseFloat(food[1]);
        totalCarbs += parseFloat(food[2]);
        totalProtein += parseFloat(food[3]);
        totalFat += parseFloat(food[4]);
        totalSugar += parseFloat(food[5]);
        totalSodium += parseFloat(food[6]);
        totalFiber += parseFloat(food[7]);
    }

    let totals = [
        title.toString(), //index 0
        totalCalories,    //index 1
        totalCarbs,       //index 2
        totalProtein,     //index 3
        totalFat,         //index 4
        totalSugar,       //index 5
        totalSodium,      //index 6
        totalFiber        //index 7
    ];

    console.log(title.toString());
    console.log(scoreMeal(totals));
}

async function inputCombo() {
    let comboArr = [];
    let stop = false;

    while (!stop) {
        try {
            let input = (await question("Input Food Item You Would Like to Add to Meal: (Enter 'stop' if you're done)")).trim();
            (input === "stop") ? stop = true : comboArr.push(getFoodDataByName(input));
        } catch (err) {
            console.error('Input rejected', err);
        }
    }

    rl.close();
    console.log("Food Combo: ", comboArr);
    foodCombo(comboArr); // Call foodCombo only after input is complete
}

/**
 * Find the food data corresponding to the name from the JSON database
 * @param name the name of the food to find
 * @returns an array of ['name','calories','carbs','protein','fat','sugars','sodium','dietaryfiber'] if the name exists, or
 *          null if not.
 */
// food = ['title','calories','carbs','protein','fat','sugars','sodium','dietaryfiber']
function getFoodDataByName(name) {
    // Get the first key of the JSON object to access the food item
    const firstKey = Object.keys(json)[0];
    const item = json[firstKey];

    // Extract nutritional details from the JSON object
    const title = item.label || "Unknown Food";

    if (title === "Unknown Food")
        throw new Exception();

    const calories = parseFloat(item.nutrition_details.calories?.value || 0);
    const carbs = parseFloat(item.nutrition_details.carbohydrateContent?.value || 0);
    const protein = parseFloat(item.nutrition_details.proteinContent?.value || 0);
    const fat = parseFloat(item.nutrition_details.fatContent?.value || 0);
    const sugars = parseFloat(item.nutrition_details.sugarContent?.value || 0);
    const sodium = parseFloat(item.nutrition_details.sodiumContent?.value || 0);
    const dietaryFiber = parseFloat(item.nutrition_details.fiberContent?.value || 0);

    return [title, calories, carbs, protein, fat, sugars, sodium, dietaryFiber];

    // if (false /*check the name exist*/)
    //     return null;
    //
    // let data = [];
    // data[0] = name;
    //
    // try {
    //     const data = fs.readFileSync('/webscrape_output.txt', 'utf8');
    //     console.log(data);
    // } catch (err) {
    //     console.error(err);
    // }
    //
    // return data;
}

module.exports = inputCombo;

