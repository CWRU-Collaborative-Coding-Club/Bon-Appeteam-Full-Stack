'use strict';

const Food = require('./testFiles/foodclasstest');



const hardcoded_Foods = Food.testFood1;



class User {
    constructor(mealplan) {
        this.mealPlan = mealplan;

        //daily goals of consumption for the user
        this.dailykcal = 2000;
        this.dailycarb = 225;
        this.dailyprotein = 175;
        this.dailyfat = 57;
        this.dailysatfat = 22;
        this.dailytransfat = 1;
        this.dailysugars = 50;
        this.dailysodium = 50;
        this.dailydietaryFiber = 50;
        this.chol = 0;
        this.mealPlan = null; // Initialize mealPlan as null, to be assigned later if needed
        this.dailyeaten = [];

        //weekly goals of consumption for the user
        this.weeklykcal = 2000*7;
        this.weeklycarb = 225*7;
        this.weeklyprotein = 175*7;
        this.weeklyfat = 57*7;
        this.weeklysatfat = 22 * 7;
        this.weeklytransfat = 0;
        this.weeklysugars = 50*7;
        this.weeklysodium = 50*7;
        this.weeklydietaryFiber = 50*7;
        this.weeklychol = 0;
        //this.weeklyeaten = [weeklycal,weeklycarb,weeklyprotein,weeklyfat,weeklysugar,weeklsodium,weeklydietaryFiber];

        //actual consumption of user
        this.consumedkcal = 0;
        this.consumedcarb = 0;
        this.consumedprotein = 0;
        this.consumedfat = 0;
        this.consumedsatfat = 0;
        this.consumedtransfat = 0;
        this.consumedsugars = 0;
        this.consumedsodium = 0;
        this.consumeddietaryFiber = 0;
        this.consumedchol = 0;
    }



    // Nutrition getters
    get dailyKcal() {
        return this.dailykcal;
    }
    get dailyCarb() {
        return this.dailycarb;
    }
    get dailyProtein() {
        return this.dailyprotein;
    }
    get dailyFat() {
        return this.dailyfat;
    }
    get dailySodium() {
        return this.dailysodium;
    }
    get dailyFiber() {
        return this.dailydietaryFiber;
    }
    get dailySatFat() {
        return this.dailysatfat;
    }
    get dailyTransFat() {
        return this.dailytransfat;
    }
    get dailySugars() {
        return this.dailysugars;
    }


    get weeklyKcal() {
        return this.weeklykcal;
    }
    get weeklyCarb() {
        return this.weeklycarb;
    }
    get weeklyProtein() {
        return this.weeklyprotein;
    }
    get weeklyFat() {
        return this.weeklyfat;
    }
    get weeklySatFat() {
        return this.weeklysatfat;
    }
    get weeklyTransFat() {
        return this.weeklytransfat;
    }
    get weeklySodium() {
        return this.weeklysodium;
    }
    get weeklySugars() {
        return this.weeklysugars;
    }
    get weeklyDietaryFiber() {
        return this.weeklydietaryFiber;
    }
    get weeklyChol() {
        return this.weeklychol;
    }


    get consumedKcal() {
        return this.consumedkcal;
    }
    get consumedCarb() {
        return this.consumedcarb;
    }
    get consumedProtein() {
        return this.consumedprotein;
    }
    get consumedFat() {
        return this.consumedfat;
    }
    get consumedSatFat() {
        return this.consumedsatfat;
    }
    get consumedTransFat() {
        return this.consumedtransfat;
    }
    get consumedSugars() {
        return this.consumedsugars;
    }
    get consumedSodium() {
        return this.consumedsodium;
    }
    get consumedDietaryFiber() {
        return this.consumeddietaryFiber;
    }
    get consumedChol() {
        return this.consumedchol;
    }

    // Method to track food consumption
    eatByName(foodName) {
        const normalizedFoodName = foodName.toLowerCase();
        const foodData = hardcoded_Foods[normalizedFoodName];

        if (!foodData) {
            throw new Error(`Food item "${foodName}" not found`);
        }

        // Update consumed values
        this.consumedkcal += foodData.calories;
        this.consumedcarb += foodData.carbs;
        this.consumedprotein += foodData.protein;
        this.consumedfat += foodData.fat;
        this.consumedsatfat += foodData.satfat;
        this.consumedtransfat += foodData.transfat;
        this.consumedchol += foodData.chol;
        this.consumedsugars += foodData.sugars;
        this.consumedsodium += foodData.sodium;
        this.consumeddietaryFiber += foodData.dietaryfiber;

        // Track eaten items
        this.dailyeaten.push(foodData);

        return foodData;
    }

    //scoreMeals based o
    scoreMeal(food){
        const itemkcal = food.calories;
        const itemprotratio = food.protein * 4 / itemkcal;
        const itemcarbratio = food.carbs * 4/ itemkcal;
        const itemfatratio = food.fat *7/itemkcal;
        const itemsatfatratio = food.satfat/itemkcal;
        const itemtransfatratio = food.transfat/itemkcal;
        const itemcholratio = food.chol/itemkcal;
        const itemsugarratio = food.sugars/itemkcal;
        const itemsodiumratio = food.sodium/itemkcal;
        const itemfiberratio = food.dietaryfiber/itemkcal;
        ///
        ///...
        const remainingkcal = this.dailykcal - this.consumedkcal;

        const prodiff = 4*(this.dailyprotein - this.consumedprotein)/remainingkcal - itemprotratio;
        const carbdiff = 4*(this.dailycarb - this.consumedcarb)/remainingkcal - itemcarbratio;
        const fatdiff = 4*(this.dailyfat - this.consumedfat)/remainingkcal - itemcarbratio;
        const satfatdiff = (this.dailysatfat - this.consumedsatfat)/remainingkcal - itemsatfatratio;
        const transfatdiff = (this.dailytransfat - this.consumedtransfat)/remainingkcal - itemtransfatratio;
        const choldiff = (this.chol - this.consumedchol)/remainingkcal - itemcholratio;
        const sugardiff = (this.dailysugars - this.consumedsugars)/remainingkcal - itemsugarratio;
        const sodiumdiff = (this.dailysodium - this.consumedsodium)/remainingkcal - itemsodiumratio;
        const fiberdiff = (this.dailydietaryFiber - this.consumeddietaryFiber)/remainingkcal - itemfiberratio;
        ////.

        return (food.calories / remainingkcal)(prodiff + carbdiff + fatdiff + satfatdiff + transfatdiff + choldiff + sugardiff + sodiumdiff + fiberdiff);
    }

    mergeSortRankFoods(array) {
        const copy = [];

        for (let i = 0; i < array.length; i++)
            copy[i] = 0;

        // Merge the sorted halves
        this.mergeSort(array, copy, 0, array.length - 1);

        return array;
    }

    mergeSort(array, copy, p, r) {
        if (p < r) {
            // Split the array into two halves
            const mid = Math.floor(array.length / 2);
            this.mergeSort(array, copy, p, mid);
            this.mergeSort(array, copy, mid + 1, r);
            this.merge(array, copy, p, mid, r);
        }
    }

    merge(array, copy, p, mid, r) {
        let i = p;
        let j = mid + 1;
        let k = p;

        // Compare and merge elements from both halves
        while (i <= mid && j <= r) {
            if (this.scoreMeal(array[i]) <= this.scoreMeal(array[j]))
                copy[k++] = array[i++];
            else
                copy[k++] = array[j++];
        }

        while (i <= mid)
            copy[k++] = array[i++];

        while (j <= r)
            copy[k++] = array[j++];

        // Append any remaining elements from the left and right halves
        for (let w = p; w <= r; w++)
            array[w] = copy[w];
    }

    /*
    merge(left, right) {
        const sortedArray = [];
        let i = 0, j = 0;

        // Compare and merge elements from both halves
        while (i < left.length && j < right.length) {
            if (this.scoreMeal(left[i]) <= this.scoreMeal(right[j]))
                sortedArray.push(left[i++]);
            else
                sortedArray.push(right[j++]);
        }

        // Append any remaining elements from the left and right halves
        return sortedArray.concat(left.slice(i)).concat(right.slice(j));
    } */
    //

    // MealPlan subclass with updated swipe types
    static MealPlan = class {
        constructor(type) {
            this.type = type; // Type of meal plan
            this.name = '';   // Meal plan name
            this.swipes = {
                dining: 0,
                cafe: 0,
                late: 0,
                quick: 0,
                portable: 0,
                scholar: 0,
            };

            // Set defaults based on the plan type
            switch (type) {
                case 'Unlimited':
                    this.name = 'Unlimited Plan';
                    this.swipes.dining = Infinity; // Unlimited dining hall swipes
                    this.swipes.cafe = 14;
                    this.swipes.late = 7;
                    this.swipes.quick = 7;
                    this.swipes.portable = 7;
                    this.swipes.scholar = 2;
                    break;
                case 'Halal':
                    this.name = 'Halal Plan';
                    this.swipes.dining = 15;
                    this.swipes.cafe = 5;
                    this.swipes.late = 5;
                    this.swipes.quick = 10;
                    this.swipes.portable = 10;
                    this.swipes.scholar = 2;
                    break;
                case 'Classic':
                    this.name = 'Classic Plan';
                    this.swipes.dining = 10;
                    this.swipes.cafe = 14;
                    this.swipes.late = 7;
                    this.swipes.quick = 7;
                    this.swipes.portable = 7;
                    this.swipes.scholar = 2;
                    break;
                default:
                    throw new Error(`Unknown meal plan type: ${type}`);
            }

            // Set weekly swipe limit for tracking (account for Infinity as needed)
            this.weeklySwipeLimit = Object.values(this.swipes).includes(Infinity) ? Infinity :
                Object.values(this.swipes).reduce((acc, val) => acc + val, 0);
        }

        // Method to get remaining swipes by type
        getSwipeCount(type) {
            return this.swipes[type] || 0;
        }

        // Method to use a swipe by type, if available
        useSwipe(type) {
            if (this.swipes[type] > 0 || this.swipes[type] === Infinity) {
                if (this.swipes[type] !== Infinity) {
                    this.swipes[type]--;
                }
                return true;
            }
            return false; // No swipes left for the specified type
        }
    };

    // Method to set up a meal plan for the user based on type
    setMealPlan(type) {
        this.mealPlan = new User.MealPlan(type);
    }
};

const user = new User(new User.MealPlan('Classic'));

console.log(user.scoreMeal(hardcoded_Foods[0]));
user.eatByName(hardcoded_Foods[0]); // its kinda stupid but i changed the name a bit
console.log(user.scoreMeal(hardcoded_Foods[0]));
console.log(user.dailyeaten);


module.exports = User;