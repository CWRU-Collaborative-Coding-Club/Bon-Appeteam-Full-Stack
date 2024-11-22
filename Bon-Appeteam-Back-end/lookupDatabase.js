'use strict';

const fs = require("fs");
const { parseXML } = require("./parseXML.js");
const { addValue, checkValue, checkIfExists } = require("./leveldb/level.js");

async function parse() {
    try {
        // Parse the XML file and add foods to the database
        await parseXML();
        console.log("XML parsing and database population complete");

        // Get all keys from the database
        const db = require('level')('./db');
        const keys = await db.keys().all();

        // Output the first 20 foods
        console.log("First 20 foods in the database:");
        for (let i = 0; i < Math.min(20, keys.length); i++) {
            const key = keys[i];
            const value = await checkValue(key);
            console.log(`${i + 1}. ${key}:`);
            console.log(JSON.parse(value));
            console.log('-------------------');
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Run the test function

/*
parse().then(() => {
    console.log("Test completed");
}).catch((error) => {
    console.error("Test failed:", error);
});
*/
module.exports = function lookup(name) {
    if(checkIfExists(name)){
        return(checkValue(name));
    } else {
        console.log("" + name + " does not exist in the database (did you try parsing the xml again to update the database?");
    }
}

let lookup = "Hand-Cut French Fries";
if(checkIfExists(lookup)){
    console.log(JSON.stringify(checkValue(lookup)));
} else {
    console.log("" + lookup + " does not exist in the database (did you try parsing the xml again to update the database?");
}



