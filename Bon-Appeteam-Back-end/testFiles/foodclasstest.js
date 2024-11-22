//'title','calories', 'carbs', 'protein', 'fat', 'sugars', 'sodium', 'dietaryfiber'
const { addValue, checkValue, checkIfExists } = require("../leveldb/level.js");

class Food {
    // Constructor method to initialize an object

    constructor(nutarray) {
        this.title = nutarray[0];
        this.calories = nutarray[1];
        this.carbs = nutarray[2];
        this.protein = nutarray[3];
        this.fat = nutarray[4];
        this.satfat = nutarray[5];
        this.transfat = nutarray[6];
        this.chol = nutarray[7];
        this.sugars = nutarray[8];
        this.sodium = nutarray[9];
        this.dietaryfiber = nutarray[10];
        this.servingsize = nutarray[11];
        //flags


        this.nutinfo = nutarray;
    }

    // Getter
    get data() {
        return this.nutinfo;
    }

    // getter
    get getName() {
        return this.title;
    }


    static combine(food1, food2) {
        const combarray = [];
        combarray[0] = `${food1.title} & ${food2.title}`;
        combarray[1] = Number(food1.data[1]) + Number(food2.data[1]);
        combarray[2] = Number(food1.data[2]) + Number(food2.data[2]);
        combarray[3] = Number(food1.data[3]) + Number(food2.data[3]);
        combarray[4] = Number(food1.data[4]) + Number(food2.data[4]);
        combarray[5] = Number(food1.data[5]) + Number(food2.data[5]);
        combarray[6] = Number(food1.data[6]) + Number(food2.data[6]);
        combarray[7] = Number(food1.data[7]) + Number(food2.data[7]);

        return new Food(combarray);
    }




    static createFoodFromJson(json) {
        // Get the first key of the JSON object to access the food item
        const firstKey = Object.keys(json)[0];
        const item = json[firstKey];

        // Extract nutritional details from the JSON object
        const title = item.label || "Unknown Food";
        if (title === "made-to-order omelette bar") {

        }
        const calories = parseFloat(item.nutrition_details.calories?.value || 0);
        const carbs = parseFloat(item.nutrition_details.carbohydrateContent?.value || 0);
        const protein = parseFloat(item.nutrition_details.proteinContent?.value || 0);
        const fat = parseFloat(item.nutrition_details.fatContent?.value || 0);
        const satfat = parseFloat(item.nutrition_details.saturatedFatContent?.value || 0);
        const transfat = parseFloat(item.nutrition_details.transFatContent?.value || 0);
        const cholfat = parseFloat(item.nutrition_details.cholesterolContent?.value || 0);
        const sugars = parseFloat(item.nutrition_details.sugarContent?.value || 0);
        const sodium = parseFloat(item.nutrition_details.sodiumContent?.value || 0);
        const dietaryFiber = parseFloat(item.nutrition_details.fiberContent?.value || 0);
        const servingsize = parseFloat(item.nutrition_details.servingsize?.value || 0);


        const flags = item.cor_icon ? Object.values(item.cor_icon) : [];


        const nutarray = [title, calories, carbs, protein, fat, satfat, transfat, cholfat, sugars, sodium, dietaryFiber, servingsize, flags];

        // Return a new Food object using the nutarray
        return new Food(nutarray);
    }

    static addFoodsToDatabaseFromBigJSON(bigJSON) {
        const foods = [];

        // Iterate through each entry in the big JSON
        for (const [key, entry] of Object.entries(bigJSON)) {
            try {
                // Create a single-item JSON object in the format expected by createFoodFromJson
                const singleItemJSON = {[key]: entry};

                // Create food object and add to array if it has nutrition details
                if (entry.nutrition_details && Object.keys(entry.nutrition_details).length > 0) {
                    const foodItem = Food.createFoodFromJson(singleItemJSON);
                    foods.push(foodItem);
                    addValue(foodItem.title,foodItem);
                } else {
                    console.log(`Skipping ${entry.label || 'unnamed item'} - No nutrition details available`);
                }
            } catch (error) {
                console.log(`Error processing item ${key}:`, error.message);
            }
        }

        return foods;
    }
}

const lotsOfJSON = {
    "26556374": {
        "id": "26556374",
        "label": "create-your-own omelette bar",
        "recipes": null,
        "description": "cage-free eggs, tomatoes, spinach, peppers, onions, ham, sausage, Cleveland tofu, scallions, cheese and egg whites available upon request (New Creation Farms - Chardon, OH) (Rainbow Farms - Madison, OH) (Middlefield Original Cheese Co-Op - Middlefield, OH)",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "9": "Made without Gluten-Containing Ingredients",
            "6": "Farm to Fork",
            "18": "Humane"
        },
        "ordered_cor_icon": {
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            },
            "0010-0018": {
                "id": "18",
                "label": "Humane"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "1343",
        "station": "<strong>@From The Fire<\/strong>",
        "nutrition_details": {},
        "ingredients": "",
        "nutrition_link": "",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26990698": {
        "id": "26990698",
        "label": "pepperoni pizza",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "41907.30",
                    "recipe_name": "pepperoni pizza "
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "170",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "1344",
        "station": "<strong>@From The Hearth<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "170",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "2.1",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "9",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "4.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "20",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "350",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "14",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "< 1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "8",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26990700": {
        "id": "26990700",
        "label": "vegetable pizza",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "71016387",
                    "recipe_name": "vegetable pizza 24 oz 16 cut"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "170",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "1344",
        "station": "<strong>@From The Hearth<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "170",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "3.9",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "6",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "3",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "15",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "290",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "23",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "2",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "8",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26990702": {
        "id": "26990702",
        "label": "cheese pizza",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "71021003",
                    "recipe_name": "cheese pizza 24 oz 16 cut"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian",
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "140",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "1344",
        "station": "<strong>@From The Hearth<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "140",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "2.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "4.5",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "2.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "15",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "240",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "17",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "< 1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "6",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985837": {
        "id": "26985837",
        "label": "cage-free scrambled eggs",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "75061889",
                    "recipe_name": "scrambled eggs"
                }
            ],
            "sides": [
                {
                    "recipe_id": "37396.12",
                    "recipe_name": "turkey breakfast sausage links"
                },
                {
                    "recipe_id": "79189396",
                    "recipe_name": "breakfast potatoes yukon "
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "9": "Made without Gluten-Containing Ingredients",
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "490",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "custom",
        "options": {
            "label": "sides",
            "type": "items",
            "values": [
                {
                    "id": "37396.12",
                    "label": "turkey breakfast sausage links",
                    "description": "",
                    "nutrition": {
                        "kcal": 70
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "70",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "1.5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "30mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "280mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "7g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "5g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "79189396",
                    "label": "breakfast potatoes yukon ",
                    "description": "",
                    "nutrition": {
                        "kcal": 210
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "210",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "3.7",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "1g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "260mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "22g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "3g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "2g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "2g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "13g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                }
            ]
        },
        "station_id": "25035",
        "station": "<strong>@From The Home<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "490",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "10.2",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "34",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "7",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "480",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "720",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "23",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "3",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "2",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "24",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985760": {
        "id": "26985760",
        "label": "creamy country sausage gravy",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "70038796",
                    "recipe_name": "creamy country sausage gravy"
                }
            ],
            "sides": [
                {
                    "recipe_id": "51332",
                    "recipe_name": "buttermilk biscuits"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "290",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "custom",
        "options": {
            "label": "sides",
            "type": "items",
            "values": [
                {
                    "id": "51332",
                    "label": "buttermilk biscuits",
                    "description": "",
                    "nutrition": {
                        "kcal": 200
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "200",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.3",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "20mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "450mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "27g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "3g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "4g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "8g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                }
            ]
        },
        "station_id": "25035",
        "station": "<strong>@From The Home<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "290",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "3.9",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "16",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "9",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "45",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "770",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "31",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "< 1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "5",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "7",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985769": {
        "id": "26985769",
        "label": "French toast",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "70069741",
                    "recipe_name": "french toast"
                }
            ],
            "sides": []
        },
        "description": "Texas toast, cage-free eggs, Hartzler Family Dairy milk",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian",
            "6": "Farm to Fork",
            "18": "Humane"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            },
            "0010-0018": {
                "id": "18",
                "label": "Humane"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "300",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25035",
        "station": "<strong>@From The Home<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "300",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "5.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "12",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "4",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "80",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "380",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "39",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "4",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "10",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985770": {
        "id": "26985770",
        "label": "creamy chicken and vegetable alfredo pasta",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "77413032",
                    "recipe_name": "creamy chicken alfredo pasta with broccoli and peppers"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "450",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25035",
        "station": "<strong>@From The Home<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "450",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "8.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "20",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "9",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "120",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "460",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "36",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "2",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "31",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26450864": {
        "id": "26450864",
        "label": "shawarma-style bowl",
        "recipes": {
            "entrees": [],
            "sides": [
                {
                    "recipe_id": "73098859",
                    "recipe_name": "chicken shawarma"
                },
                {
                    "recipe_id": "74965460",
                    "recipe_name": "chickpea shawarma"
                },
                {
                    "recipe_id": "74950116",
                    "recipe_name": "spiced lentils"
                },
                {
                    "recipe_id": "76562166",
                    "recipe_name": "hummus"
                },
                {
                    "recipe_id": "76561164",
                    "recipe_name": "millet tabbouleh"
                },
                {
                    "recipe_id": "72490253",
                    "recipe_name": "cucumber"
                },
                {
                    "recipe_id": "72490288",
                    "recipe_name": "tomato"
                },
                {
                    "recipe_id": "70066459",
                    "recipe_name": "romaine lettuce"
                },
                {
                    "recipe_id": "76310194",
                    "recipe_name": "house-made pickles "
                },
                {
                    "recipe_id": "79259151",
                    "recipe_name": "turmeric seasoned brown rice and peas"
                },
                {
                    "recipe_id": "76562605",
                    "recipe_name": "lemon cured onions "
                },
                {
                    "recipe_id": "72510355",
                    "recipe_name": "pickled turnip "
                },
                {
                    "recipe_id": "72554366",
                    "recipe_name": "baba ganoush"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "1",
        "cor_icon": {
            "9": "Made without Gluten-Containing Ingredients",
            "10": "Halal"
        },
        "ordered_cor_icon": {
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            },
            "0005-0010": {
                "id": "10",
                "label": "Halal"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "custom",
        "options": {
            "label": "sides",
            "type": "items",
            "values": [
                {
                    "id": "73098859",
                    "label": "chicken shawarma",
                    "description": "",
                    "nutrition": {
                        "kcal": 80
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "80",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0.5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "30mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "290mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "10g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "4.5g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "74965460",
                    "label": "chickpea shawarma",
                    "description": "",
                    "nutrition": {
                        "kcal": 90
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "90",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "210mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "15g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "4g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "3g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "5g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "2g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "74950116",
                    "label": "spiced lentils",
                    "description": "",
                    "nutrition": {
                        "kcal": 90
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "90",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "75mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "15g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "3g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "6g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "1g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "76562166",
                    "label": "hummus",
                    "description": "",
                    "nutrition": {
                        "kcal": 170
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "170",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "2g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "210mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "10g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "2g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "2g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "3g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "14g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "76561164",
                    "label": "millet tabbouleh",
                    "description": "",
                    "nutrition": {
                        "kcal": 25
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "25",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "15mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "5g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "72490253",
                    "label": "cucumber",
                    "description": "",
                    "nutrition": {
                        "kcal": 0
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "0",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "72490288",
                    "label": "tomato",
                    "description": "",
                    "nutrition": {
                        "kcal": 5
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "5",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "70066459",
                    "label": "romaine lettuce",
                    "description": "",
                    "nutrition": {
                        "kcal": 0
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "0",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "76310194",
                    "label": "house-made pickles ",
                    "description": "",
                    "nutrition": {
                        "kcal": 5
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "5",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "95mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "79259151",
                    "label": "turmeric seasoned brown rice and peas",
                    "description": "",
                    "nutrition": {
                        "kcal": 130
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "130",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "4.1",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "210mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "28g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "2g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "3g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "1g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "76562605",
                    "label": "lemon cured onions ",
                    "description": "",
                    "nutrition": {
                        "kcal": 15
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "15",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "115mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "3g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "2g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "72510355",
                    "label": "pickled turnip ",
                    "description": "",
                    "nutrition": {
                        "kcal": 0
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "0",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "0.2",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "72554366",
                    "label": "baba ganoush",
                    "description": "",
                    "nutrition": {
                        "kcal": 60
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "60",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "95mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "3g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "1g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "2g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "6g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                }
            ]
        },
        "station_id": "25038",
        "station": "<strong>@SimplyOasis<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "690",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "20.3",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "29",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "3.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "30",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "1320",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "85",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "15",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "12",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "29",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985802": {
        "id": "26985802",
        "label": "tofu and potato breakfast casserole",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "76350415",
                    "recipe_name": "vegan tofu and potato breakfast casserole"
                }
            ],
            "sides": [
                {
                    "recipe_id": "70679240",
                    "recipe_name": "olive oil roasted vegetable"
                },
                {
                    "recipe_id": "76233102",
                    "recipe_name": "Beyond breakfast sausage"
                }
            ]
        },
        "description": "flour coated Cleveland tofu, russet potatoes, saut\u00e9ed bell peppers and onions",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "490",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "custom",
        "options": {
            "label": "sides",
            "type": "items",
            "values": [
                {
                    "id": "70679240",
                    "label": "olive oil roasted vegetable",
                    "description": "",
                    "nutrition": {
                        "kcal": 100
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "100",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "4.6",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0.5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "370mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "8g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "2g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "5g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "1g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "7g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "76233102",
                    "label": "Beyond breakfast sausage",
                    "description": "",
                    "nutrition": {
                        "kcal": 110
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "110",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.5",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "3g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "230mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "3g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "1g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "7g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "7g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                }
            ]
        },
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "490",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "14.3",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "21",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "4.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "970",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "55",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "7",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "10",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "23",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985800": {
        "id": "26985800",
        "label": "black-bean burger patty, made-to-order",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "79364187",
                    "recipe_name": "add black bean burger patty (dr praegers)"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "130",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "130",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "2.5",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "6",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "350",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "16",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "9",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "< 1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "5",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985804": {
        "id": "26985804",
        "label": "Impossible burger patty, made-to-order",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "71811705",
                    "recipe_name": "add impossible burger patty"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "180",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "180",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "3.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "11",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "6",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "290",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "7",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "14",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "27051186": {
        "id": "27051186",
        "label": "oatmeal",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "3428.16",
                    "recipe_name": "old-fashioned oatmeal"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "130",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25041",
        "station": "<strong>@Soup From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "130",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "9.9",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "2",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "10",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "23",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "3",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "4",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "27051187": {
        "id": "27051187",
        "label": "creamy grits",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "70117559",
                    "recipe_name": "creamy grits"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "390",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25041",
        "station": "<strong>@Soup From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "390",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "8.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "24",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "14",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "1",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "65",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "420",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "39",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "2",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "5",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "7",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "20079470": {
        "id": "20079470",
        "label": "Bran Flakes",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372377",
                    "recipe_name": "bran flakes"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "200",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "200",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "1.5",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "330",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "50",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "11",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "11",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "6",
                "unit": "g"
            }
        },
        "ingredients": "bran flakes",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20079472": {
        "id": "20079472",
        "label": "Cheerios",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372511",
                    "recipe_name": "cheerios"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "100",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "100",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "2",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "135",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "20",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "3",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "3",
                "unit": "g"
            }
        },
        "ingredients": "cheerios",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20390416": {
        "id": "20390416",
        "label": "shredded wheat",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372372",
                    "recipe_name": "shredded wheat"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "180",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "180",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "1",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "0",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "41",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "6",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "6",
                "unit": "g"
            }
        },
        "ingredients": "shredded wheat cereal",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20440224": {
        "id": "20440224",
        "label": "cereal Honey Nut Cheerios",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372300",
                    "recipe_name": "honey nut cheerios"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "100",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "100",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "1.5",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "160",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "22",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "2",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "9",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "2",
                "unit": "g"
            }
        },
        "ingredients": "honey nut cheerios",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20079467": {
        "id": "20079467",
        "label": "Cinnamon Toast Crunch",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372287",
                    "recipe_name": "cinnamon toast crunch"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "160",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "160",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "4",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "230",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "31",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "3",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "12",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "2",
                "unit": "g"
            }
        },
        "ingredients": "cinnamon toast crunch cereal",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20079468": {
        "id": "20079468",
        "label": "Corn Chex",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372288",
                    "recipe_name": "corn chex"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "110",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "110",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0.5",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "210",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "25",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "3",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "2",
                "unit": "g"
            }
        },
        "ingredients": "corn chex cereal",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20079469": {
        "id": "20079469",
        "label": "Corn Pops",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372289",
                    "recipe_name": "corn pops"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "110",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "110",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "105",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "27",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "2",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "9",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "1",
                "unit": "g"
            }
        },
        "ingredients": "corn pops cereal",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20079471": {
        "id": "20079471",
        "label": "Cornflakes",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372390",
                    "recipe_name": "cornflakes"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "110",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "110",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "230",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "27",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "3",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "2",
                "unit": "g"
            }
        },
        "ingredients": "cornflakes",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20440204": {
        "id": "20440204",
        "label": "apple jacks",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372286",
                    "recipe_name": "apple jacks"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "100",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "100",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "1",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "130",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "24",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "3",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "12",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "1",
                "unit": "g"
            }
        },
        "ingredients": "apple jacks cereal",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20440205": {
        "id": "20440205",
        "label": "fruit loops",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372297",
                    "recipe_name": "fruit loops"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "100",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "100",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "1",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "130",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "24",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "3",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "12",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "1",
                "unit": "g"
            }
        },
        "ingredients": "fruit loops",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20440206": {
        "id": "20440206",
        "label": "golden grahams",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73372395",
                    "recipe_name": "golden grahams"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "140",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "140",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "1",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "290",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "32",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "2",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "13",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "2",
                "unit": "g"
            }
        },
        "ingredients": "golden grahams cereal",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122135",
        "sub_station": "cereals cold",
        "sub_station_order": "2",
        "monotony": {}
    },
    "20390388": {
        "id": "20390388",
        "label": "buttermilk waffle",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "51472",
                    "recipe_name": "waffles"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "300",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "3818",
        "station": "<strong>@breakfast<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "300",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "6.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "3.5",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "930",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "60",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "6",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "6",
                "unit": "g"
            }
        },
        "ingredients": "water, malted pancake, cooking spray",
        "nutrition_link": "nutrition information",
        "sub_station_id": "127962",
        "sub_station": "waffles",
        "sub_station_order": "1",
        "monotony": {}
    },
    "20079378": {
        "id": "20079378",
        "label": "lipton unsweetened iced tea",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73374025",
                    "recipe_name": "lipton unsweetened iced tea "
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "0",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {},
        "ingredients": "unsweetened iced tea",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079380": {
        "id": "20079380",
        "label": "water",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "70883482",
                    "recipe_name": "water"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "0",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {},
        "ingredients": "water",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079382": {
        "id": "20079382",
        "label": "carbonated water",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "74056444",
                    "recipe_name": "carbonated water"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "0",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {},
        "ingredients": "carbonated water",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079367": {
        "id": "20079367",
        "label": "dr pepper",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373791",
                    "recipe_name": "dr pepper"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "150",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "150",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "35",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "38",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "dr. pepper soda",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079368": {
        "id": "20079368",
        "label": "gatorade fruit punch",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373796",
                    "recipe_name": "gatorade fruit punch"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "90",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "90",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "160",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "22",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "21",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "fruit punch gatorade",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079369": {
        "id": "20079369",
        "label": "sweetened iced tea",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373827",
                    "recipe_name": "sweetened iced tea"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "110",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "110",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "45",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "29",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "29",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "sweetened iced tea",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079370": {
        "id": "20079370",
        "label": "root beer",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373833",
                    "recipe_name": "mug root beer"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "150",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "150",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "45",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "39",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "39",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "root beer soda",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079371": {
        "id": "20079371",
        "label": "gatorade orange",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373835",
                    "recipe_name": "gatorade orange"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "90",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "90",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "180",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "24",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "23",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "orange gatorade",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079372": {
        "id": "20079372",
        "label": "pepsi",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373837",
                    "recipe_name": "pepsi"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "150",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "150",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "30",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "41",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "41",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "pepsi",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079373": {
        "id": "20079373",
        "label": "sierra mist",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373845",
                    "recipe_name": "sierra mist"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "150",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "150",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "35",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "40",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "40",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "sierra mist",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079374": {
        "id": "20079374",
        "label": "tropicana lemonade pink",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373855",
                    "recipe_name": "tropicana lemonade pink"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "150",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "150",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "150",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "40",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "40",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "pink lemonade",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079375": {
        "id": "20079375",
        "label": "Schweppes ginger ale",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373856",
                    "recipe_name": "ginger ale"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "120",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "120",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "25",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "32",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "33",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "ginger ale soda",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079376": {
        "id": "20079376",
        "label": "diet mountain dew",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73374014",
                    "recipe_name": "diet mountain dew"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "0",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {},
        "ingredients": "diet mountain dew soda",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079377": {
        "id": "20079377",
        "label": "diet pepsi",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73374017",
                    "recipe_name": "diet pepsi"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "0",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {},
        "ingredients": "diet pepsi",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079379": {
        "id": "20079379",
        "label": "brisk raspberry iced tea",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "87452.9",
                    "recipe_name": "brisk raspberry iced tea"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "80",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "80",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "45",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "20",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "20",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "raspberry iced tea",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122124",
        "sub_station": "fountain drinks",
        "sub_station_order": "5",
        "monotony": {}
    },
    "20079383": {
        "id": "20079383",
        "label": "orange juice",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "70839429",
                    "recipe_name": "orange juice"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "190",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "190",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0.5",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "15",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "44",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "35",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "3",
                "unit": "g"
            }
        },
        "ingredients": "orange juice",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122126",
        "sub_station": "fruit juices",
        "sub_station_order": "6",
        "monotony": {}
    },
    "20079384": {
        "id": "20079384",
        "label": "apple juice",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "70839434",
                    "recipe_name": "apple juice"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "170",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "170",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "15",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "42",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "< 1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "36",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "apple juice",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122126",
        "sub_station": "fruit juices",
        "sub_station_order": "6",
        "monotony": {}
    },
    "20079385": {
        "id": "20079385",
        "label": "cranberry juice",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73477763",
                    "recipe_name": "cranberry juice"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "220",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "220",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "10",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "54",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "47",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "cranberry juice",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122126",
        "sub_station": "fruit juices",
        "sub_station_order": "6",
        "monotony": {}
    },
    "20079386": {
        "id": "20079386",
        "label": "milk",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "72532402",
                    "recipe_name": "milk "
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "240",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "240",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "12.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "13",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "7",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "40",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "170",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "19",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "20",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "13",
                "unit": "g"
            }
        },
        "ingredients": "whole milk",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122127",
        "sub_station": "milk dispenser",
        "sub_station_order": "7",
        "monotony": {}
    },
    "20079389": {
        "id": "20079389",
        "label": "milk chocolate",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "72528112",
                    "recipe_name": "milk chocolate \n"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "300",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "300",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "2.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "17",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "10",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "15",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "45",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "34",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "2",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "29",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "4",
                "unit": "g"
            }
        },
        "ingredients": "milk chocolate",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122127",
        "sub_station": "milk dispenser",
        "sub_station_order": "7",
        "monotony": {}
    },
    "20079390": {
        "id": "20079390",
        "label": "coffee",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373745",
                    "recipe_name": "coffee"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "0",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "0",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "8.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "0",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "0",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "coffee (water, coffee)",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122129",
        "sub_station": "coffee",
        "sub_station_order": "8",
        "monotony": {}
    },
    "20079391": {
        "id": "20079391",
        "label": "decaf coffee",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73373746",
                    "recipe_name": "decaf coffee"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "0",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4161",
        "station": "<strong>@beverages<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "0",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "8.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "0",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "0",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "coffee (water, coffee)",
        "nutrition_link": "nutrition information",
        "sub_station_id": "122129",
        "sub_station": "coffee",
        "sub_station_order": "8",
        "monotony": {}
    },
    "26556375": {
        "id": "26556375",
        "label": "cage-free eggs any style, made-to-order",
        "recipes": null,
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian",
            "9": "Made without Gluten-Containing Ingredients",
            "18": "Humane"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            },
            "0010-0018": {
                "id": "18",
                "label": "Humane"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "1343",
        "station": "<strong>@From The Fire<\/strong>",
        "nutrition_details": {},
        "ingredients": "",
        "nutrition_link": "",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26556372": {
        "id": "26556372",
        "label": "grill options",
        "recipes": {
            "entrees": [],
            "sides": [
                {
                    "recipe_id": "74091286",
                    "recipe_name": "turkey burger"
                },
                {
                    "recipe_id": "76841071",
                    "recipe_name": "grilled chicken"
                },
                {
                    "recipe_id": "70647242",
                    "recipe_name": "beef burger"
                },
                {
                    "recipe_id": "74442204",
                    "recipe_name": "all-beef hotdog "
                },
                {
                    "recipe_id": "72289407",
                    "recipe_name": "cheddar cheese"
                },
                {
                    "recipe_id": "70635886",
                    "recipe_name": "lettuce"
                },
                {
                    "recipe_id": "72796969",
                    "recipe_name": "tomatoes"
                },
                {
                    "recipe_id": "74479298",
                    "recipe_name": "onion"
                },
                {
                    "recipe_id": "71786626",
                    "recipe_name": "pickle"
                },
                {
                    "recipe_id": "70647196",
                    "recipe_name": "wheat hamburger bun"
                },
                {
                    "recipe_id": "70646874",
                    "recipe_name": "wheat hot dog bun"
                },
                {
                    "recipe_id": "76540157",
                    "recipe_name": "hand-cut French fries"
                },
                {
                    "recipe_id": "70643735",
                    "recipe_name": "Swiss cheese"
                },
                {
                    "recipe_id": "73296269",
                    "recipe_name": "pepper jack cheese"
                },
                {
                    "recipe_id": "72943240",
                    "recipe_name": "American cheese"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "1",
        "cor_icon": {
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "custom",
        "options": {
            "label": "sides",
            "type": "items",
            "values": [
                {
                    "id": "74091286",
                    "label": "turkey burger",
                    "description": "",
                    "nutrition": {
                        "kcal": 260
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "260",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "4.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "4.5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "95mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "350mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "3g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "20g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "18g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "76841071",
                    "label": "grilled chicken",
                    "description": "",
                    "nutrition": {
                        "kcal": 160
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "160",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "3.4",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "1.5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "95mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "230mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "26g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "6g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "70647242",
                    "label": "beef burger",
                    "description": "",
                    "nutrition": {
                        "kcal": 310
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "310",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "4.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "8g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "1.5g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "100mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "85mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "29g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "20g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "74442204",
                    "label": "all-beef hotdog ",
                    "description": "",
                    "nutrition": {
                        "kcal": 180
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "180",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "6g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "2g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "35mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "490mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "2g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "7g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "16g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "72289407",
                    "label": "cheddar cheese",
                    "description": "",
                    "nutrition": {
                        "kcal": 110
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "110",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "30mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "190mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "6g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "9g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "70635886",
                    "label": "lettuce",
                    "description": "",
                    "nutrition": {
                        "kcal": 0
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "0",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "72796969",
                    "label": "tomatoes",
                    "description": "",
                    "nutrition": {
                        "kcal": 5
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "5",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "74479298",
                    "label": "onion",
                    "description": "",
                    "nutrition": {
                        "kcal": 0
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "0",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "0.2",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "71786626",
                    "label": "pickle",
                    "description": "",
                    "nutrition": {
                        "kcal": 0
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "0",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "0.1",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "20mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "70647196",
                    "label": "wheat hamburger bun",
                    "description": "",
                    "nutrition": {
                        "kcal": 160
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "160",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "280mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "28g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "1g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "4g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "6g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "2g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "70646874",
                    "label": "wheat hot dog bun",
                    "description": "",
                    "nutrition": {
                        "kcal": 180
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "180",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "2.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "320mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "32g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "4g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "4g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "7g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "3g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "76540157",
                    "label": "hand-cut French fries",
                    "description": "The Vegetable Basket Farm",
                    "nutrition": {
                        "kcal": 110
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "110",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "4.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "135mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "24g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "2g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "2g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "2g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "70643735",
                    "label": "Swiss cheese",
                    "description": "",
                    "nutrition": {
                        "kcal": 110
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "110",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0.5g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "25mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "55mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "8g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "9g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "73296269",
                    "label": "pepper jack cheese",
                    "description": "",
                    "nutrition": {
                        "kcal": 110
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "110",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "25mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "170mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "0g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "0g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "7g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "9g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "72943240",
                    "label": "American cheese",
                    "description": "",
                    "nutrition": {
                        "kcal": 100
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "100",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "1.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0.5g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "30mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "470mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "1g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "0g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "less than 1g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "5g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "9g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                }
            ]
        },
        "station_id": "1343",
        "station": "<strong>@From The Fire<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "1790",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "27.8",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "101",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "42",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "5",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "430",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "2790",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "95",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "7",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "13",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "124",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "27003981": {
        "id": "27003981",
        "label": "Texas beef chili",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "1967.1",
                    "recipe_name": "texas beef chili"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "310",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "4160",
        "station": "<strong>@soup<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "310",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "7.6",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "12",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "4",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "45",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "180",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "29",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "10",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "2",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "23",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985771": {
        "id": "26985771",
        "label": "red wine braised beef  with onion and figs",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "79618751",
                    "recipe_name": "red wine braised beef with onion and figs"
                }
            ],
            "sides": [
                {
                    "recipe_id": "84349",
                    "recipe_name": "butter garlic green beans"
                },
                {
                    "recipe_id": "31203.9",
                    "recipe_name": "creamy mashed potatoes"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "670",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "custom",
        "options": {
            "label": "sides",
            "type": "items",
            "values": [
                {
                    "id": "84349",
                    "label": "butter garlic green beans",
                    "description": "",
                    "nutrition": {
                        "kcal": 90
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "90",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "4.3",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "3.5g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "15mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "470mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "10g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "4g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "4g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "2g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "6g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "31203.9",
                    "label": "creamy mashed potatoes",
                    "description": null,
                    "nutrition": {
                        "kcal": 220
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "220",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "4.8",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "9g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "40mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "270mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "23g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "2g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "1g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "2g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "14g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                }
            ]
        },
        "station_id": "25035",
        "station": "<strong>@From The Home<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "670",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "15.4",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "40",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "19",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "160",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "910",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "44",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "8",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "12",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "33",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985727": {
        "id": "26985727",
        "label": "beef and pepper stir fry with ginger-tamari sauce",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "75637899",
                    "recipe_name": "beef and pepper stir fry with ginger-tamari sauce"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "280",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25037",
        "station": "<strong>@From The East<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "280",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "6.6",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "12",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "4",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "90",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "690",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "5",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "2",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "36",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985728": {
        "id": "26985728",
        "label": "Thai-inspired tofu drunken lo mein egg noodles",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "79201763",
                    "recipe_name": "thai inspired drunken lo mein noodles "
                },
                {
                    "recipe_id": "75168283",
                    "recipe_name": "add crumbled tofu"
                }
            ],
            "sides": []
        },
        "description": "Cleveland Tofu",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian",
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "480",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25037",
        "station": "<strong>@From The East<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "480",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "10.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "8",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "1",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "1070",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "85",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "7",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "13",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "22",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985729": {
        "id": "26985729",
        "label": "steamed rice",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "28232.2",
                    "recipe_name": "white rice no added salt"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "130",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25037",
        "station": "<strong>@From The East<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "130",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "4.4",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "0",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "29",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "< 1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "3",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26450858": {
        "id": "26450858",
        "label": "made without the top-9 allergens plus gluten-containing ingredients",
        "recipes": null,
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25038",
        "station": "<strong>@SimplyOasis<\/strong>",
        "nutrition_details": {},
        "ingredients": "",
        "nutrition_link": "",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "26985803": {
        "id": "26985803",
        "label": "shawarma-marinated tofu",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "75676042",
                    "recipe_name": "shawarma marinated tofu"
                }
            ],
            "sides": [
                {
                    "recipe_id": "50692",
                    "recipe_name": "roasted cauliflower"
                },
                {
                    "recipe_id": "51814",
                    "recipe_name": "wild rice pilaf"
                }
            ]
        },
        "description": "Cleveland Tofu",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients",
            "7": "In Balance",
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            },
            "0004-0007": {
                "id": "7",
                "label": "In Balance"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "450",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "custom",
        "options": {
            "label": "sides",
            "type": "items",
            "values": [
                {
                    "id": "50692",
                    "label": "roasted cauliflower",
                    "description": "",
                    "nutrition": {
                        "kcal": 60
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "60",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "6.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "210mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "8g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "3g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "3g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "3g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "2.5g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                },
                {
                    "id": "51814",
                    "label": "wild rice pilaf",
                    "description": null,
                    "nutrition": {
                        "kcal": 220
                    },
                    "side_nutrition_details": {
                        "calories": {
                            "label": "Calories",
                            "value": "220",
                            "unit": ""
                        },
                        "servingSize": {
                            "label": "Serving Size",
                            "value": "4.0",
                            "unit": "oz"
                        },
                        "saturatedFatContent": {
                            "label": "Saturated Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "transFatContent": {
                            "label": "Trans Fat",
                            "value": "0g",
                            "unit": "g"
                        },
                        "cholesterolContent": {
                            "label": "Cholesterol",
                            "value": "0mg",
                            "unit": "mg"
                        },
                        "sodiumContent": {
                            "label": "Sodium",
                            "value": "240mg",
                            "unit": "mg"
                        },
                        "carbohydrateContent": {
                            "label": "Total Carbohydrate",
                            "value": "47g",
                            "unit": "g"
                        },
                        "fiberContent": {
                            "label": "Dietary Fiber",
                            "value": "3g",
                            "unit": "g"
                        },
                        "sugarContent": {
                            "label": "Sugars",
                            "value": "2g",
                            "unit": "g"
                        },
                        "proteinContent": {
                            "label": "Protein",
                            "value": "7g",
                            "unit": "g"
                        },
                        "fatContent": {
                            "label": "Total Fat",
                            "value": "0.5g",
                            "unit": "g"
                        }
                    },
                    "ingredients": ""
                }
            ]
        },
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "450",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "14.4",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "17",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "2",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "640",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "61",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "7",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "7",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "18",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "27004010": {
        "id": "27004010",
        "label": "Polish-style buttery mushroom soup",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73324337",
                    "recipe_name": "polish mushroom soup (zupa grzybowa)"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian",
            "9": "Made without Gluten-Containing Ingredients",
            "6": "Farm to Fork"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            },
            "0007-0006": {
                "id": "6",
                "label": "Farm to Fork"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "60",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25041",
        "station": "<strong>@Soup From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "60",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "7.2",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "2",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "1.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "5",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "190",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "10",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "2",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "2",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "2",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "27004007": {
        "id": "27004007",
        "label": "creamy butternut squash soup",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "73052986",
                    "recipe_name": "creamy butternut squash soup"
                }
            ],
            "sides": []
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "90",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 1,
        "tier3": 0,
        "tier": 1,
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25041",
        "station": "<strong>@Soup From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "90",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "8.3",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "3.5",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "1.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "5",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "260",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "14",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "3",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "4",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "3",
                "unit": "g"
            }
        },
        "ingredients": "",
        "nutrition_link": "nutrition information",
        "sub_station_id": "",
        "sub_station": "",
        "sub_station_order": "",
        "monotony": {}
    },
    "20565100": {
        "id": "20565100",
        "label": "lettuce",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "62522",
                    "recipe_name": "lettuce"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "10",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "10",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "5",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "2",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "< 1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "< 1",
                "unit": "g"
            }
        },
        "ingredients": "lettuce",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130845",
        "sub_station": "lettuce",
        "sub_station_order": "9",
        "monotony": {}
    },
    "20565101": {
        "id": "20565101",
        "label": "spinach",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "72543267",
                    "recipe_name": "spinach"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "50",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "50",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "8.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "1",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "180",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "8",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "5",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "< 1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "6",
                "unit": "g"
            }
        },
        "ingredients": "spinach",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130845",
        "sub_station": "lettuce",
        "sub_station_order": "9",
        "monotony": {}
    },
    "20565102": {
        "id": "20565102",
        "label": "black olives",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "70642292",
                    "recipe_name": "black olives"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "35",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "35",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "3",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "210",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "2",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "olives",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130846",
        "sub_station": "vegetable toppings",
        "sub_station_order": "10",
        "monotony": {}
    },
    "20565103": {
        "id": "20565103",
        "label": "onion",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "70642368",
                    "recipe_name": "onion"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "10",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "10",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "0",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "3",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "onion",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130846",
        "sub_station": "vegetable toppings",
        "sub_station_order": "10",
        "monotony": {}
    },
    "20565104": {
        "id": "20565104",
        "label": "carrots",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "72490245",
                    "recipe_name": "carrots"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "10",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "10",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "20",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "3",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "< 1",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "carrot",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130846",
        "sub_station": "vegetable toppings",
        "sub_station_order": "10",
        "monotony": {}
    },
    "20565105": {
        "id": "20565105",
        "label": "cucumbers",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "72490253",
                    "recipe_name": "cucumber"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "0",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "0",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "0",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "< 1",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "cucumber",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130846",
        "sub_station": "vegetable toppings",
        "sub_station_order": "10",
        "monotony": {}
    },
    "20565106": {
        "id": "20565106",
        "label": "bell pepper",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "72490277",
                    "recipe_name": "bell pepper"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "5",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "5",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "0",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "1",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "< 1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "bell pepper",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130846",
        "sub_station": "vegetable toppings",
        "sub_station_order": "10",
        "monotony": {}
    },
    "20565107": {
        "id": "20565107",
        "label": "tomato",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "72490288",
                    "recipe_name": "tomato"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "5",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "2",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "5",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "0",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "1",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "< 1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "tomatoes",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130846",
        "sub_station": "vegetable toppings",
        "sub_station_order": "10",
        "monotony": {}
    },
    "20565108": {
        "id": "20565108",
        "label": "raspberry viniagrette",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "16719",
                    "recipe_name": "fat-free raspberry dressing"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "4": "Vegan",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0002-0004": {
                "id": "4",
                "label": "Vegan"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "30",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "30",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "0",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "0",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "270",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "6",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "6",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "raspberry vinaigrette",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130847",
        "sub_station": "dressings",
        "sub_station_order": "11",
        "monotony": {}
    },
    "20565109": {
        "id": "20565109",
        "label": "buttermilk ranch dressing",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "45592.3",
                    "recipe_name": "ranch dressing"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "50",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "50",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "4.5",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "1.5",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "10",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "180",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "2",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "< 1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "< 1",
                "unit": "g"
            }
        },
        "ingredients": "low fat buttermilk, light mayonnaise, sour cream, salt, garlic, thyme, parsley, onion powder, black pepper, oregano",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130847",
        "sub_station": "dressings",
        "sub_station_order": "11",
        "monotony": {}
    },
    "20565110": {
        "id": "20565110",
        "label": "Italian vinaigrette",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "47986.3",
                    "recipe_name": "italian vinaigrette"
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": [],
        "ordered_cor_icon": [],
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "180",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "180",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "20",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "3",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "0",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "180",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "0",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "0",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "0",
                "unit": "g"
            }
        },
        "ingredients": "olive oil, red wine vinegar, garlic, salt, basil, parsley, oregano, red chili flakes",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130847",
        "sub_station": "dressings",
        "sub_station_order": "11",
        "monotony": {}
    },
    "20565111": {
        "id": "20565111",
        "label": "Parmesan Caesar dressing",
        "recipes": {
            "entrees": [
                {
                    "recipe_id": "76237188",
                    "recipe_name": "caesar parmesan vinaigrette "
                }
            ]
        },
        "description": "",
        "short_name": "",
        "raw_cooked": "0",
        "is_rotating": "0",
        "zero_entree": "0",
        "cor_icon": {
            "1": "Vegetarian",
            "9": "Made without Gluten-Containing Ingredients"
        },
        "ordered_cor_icon": {
            "0001-0001": {
                "id": "1",
                "label": "Vegetarian"
            },
            "0003-0009": {
                "id": "9",
                "label": "Made without Gluten-Containing Ingredients"
            }
        },
        "nextepid": "0",
        "price": "",
        "sizes": [],
        "nutrition": {
            "kcal": "160",
            "well_being": "",
            "well_being_image": ""
        },
        "special": 0,
        "tier3": 0,
        "tier": "3",
        "rating": "",
        "connector": "",
        "options": [],
        "station_id": "25039",
        "station": "<strong>@From The Field<\/strong>",
        "nutrition_details": {
            "calories": {
                "label": "Calories",
                "value": "160",
                "unit": ""
            },
            "servingSize": {
                "label": "Serving Size",
                "value": "1.0",
                "unit": "oz"
            },
            "fatContent": {
                "label": "Total Fat",
                "value": "16",
                "unit": "g"
            },
            "saturatedFatContent": {
                "label": "Saturated Fat",
                "value": "2",
                "unit": "g"
            },
            "transFatContent": {
                "label": "Trans Fat",
                "value": "0",
                "unit": "g"
            },
            "cholesterolContent": {
                "label": "Cholesterol",
                "value": "< 5",
                "unit": "mg"
            },
            "sodiumContent": {
                "label": "Sodium",
                "value": "160",
                "unit": "mg"
            },
            "carbohydrateContent": {
                "label": "Total Carbohydrate",
                "value": "2",
                "unit": "g"
            },
            "fiberContent": {
                "label": "Dietary Fiber",
                "value": "0",
                "unit": "g"
            },
            "sugarContent": {
                "label": "Sugars",
                "value": "< 1",
                "unit": "g"
            },
            "proteinContent": {
                "label": "Protein",
                "value": "1",
                "unit": "g"
            }
        },
        "ingredients": "canola oil, olive oil, parmesan cheese, white balsamic vinegar, garlic, dijon mustard, lemon juice, sugar, italian seasoning, salt, black pepper",
        "nutrition_link": "nutrition information",
        "sub_station_id": "130847",
        "sub_station": "dressings",
        "sub_station_order": "11",
        "monotony": {}
    }
};

//const testFood1 = Food.addFoodsToDatabaseFromBigJSON(lotsOfJSON);
console.log("Start of testFood1: \n" + JSON.stringify(testFood1));
