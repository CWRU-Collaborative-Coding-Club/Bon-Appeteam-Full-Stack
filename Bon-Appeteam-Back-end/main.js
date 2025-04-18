import {UserProfile} from "./userProfile";

const { user } = require("./userProfile");
import {scoreMeal} from "./scoreMeal";
import {getFood, foods} from "./getfood";

let rows = foods.length;
let cols = 4;

let matrix = Array.from({ length: rows }, () => Array(cols).fill(0));


/**
 * Runs the score meal function as soon as the function opens
 */
function callScoreMeal() {
    for (const food of foods) {
        scoreMeal.scoreMeal(foods);
    }
}
callScoreMeal();

/**
 * Updates consumption trackers with new meal data
 * @param {Array} arr - Meal data array [food, calories, carbs, protein, fat, sugar, sodium, fiber]
 */
function updateConsumption(arr){
    const name = arr[0];
    const cal = arr[1];
    const car = arr[8];
    const pro = arr[11];
    const fat = arr[3];
    const sugar = arr[10];
    const fiber = arr[9];
    const sodium = arr[7];
    let user = userProfile;   //placeholder until we know how to access the user

    // Update calorie consumption
    user.dailyCaloriesConsumed += calories;
    user.weeklyCaloriesConsumed += calories;
    user.timetableCaloriesConsumed += calories;

    // Update macro consumption
    user.dailyCarbsConsumed += carbs;
    user.weeklyCarbsConsumed += carbs;
    user.timetableCarbsConsumed += carbs;

    user.dailyProteinConsumed += protein;
    user.weeklyProteinConsumed += protein;
    user.timetableProteinConsumed += protein;

    user.dailyFatConsumed += fat;
    user.weeklyFatConsumed += fat;
    user.timetableFatConsumed += fat;

    // Update micronutrients
    user.dailySugarConsumed += sugar;
    user.dailySodiumConsumed += sodium;
    user.dailyFiberConsumed += fiber;

    callScoreMeal();
}

/**
 * Checks for midnight and updates days if needed
 */
function updateDays() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        if (now.getDay() === 0) {  // Sunday
            this.user.updateDailyValues();
        }
    }
}

// index 0 - name
// index 1 - calories
// index 2 - serving size * 10
// index 3 -