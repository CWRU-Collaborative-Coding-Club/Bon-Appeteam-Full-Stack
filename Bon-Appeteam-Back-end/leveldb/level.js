const { Level } = require('level');
//make sure to npm i level

const dbLocation = `./db`;
// Create or open the database
const db = new Level(`${dbLocation}`, { valueEncoding: 'json' });

const openDb = async () => {
    try {
        await db.open();
        console.log("Database opened successfully", "level.js");
    } catch (err) {
        console.error('Error opening database:', err, "level.js");
    }
};

/**
 * Adds a key-value pair to the database
 * @param {string} key - The key to add
 * @param JSON (javascript object) - The value to associate with the key
 */
const addValue = async (key, value) => {
    try {
        await db.put(key, value);
        console.log(`Successfully added key ${key} with value ${JSON.stringify(value)}`, "level.js");
    } catch (err) {
        console.error('Error adding value:', err, "level.js");
    }
};

/**
 * Checks the value of a given key in the database
 * @param {string} key - The key to check
 * @returns {Promise<string|null>} - The value associated with the key, or null if not found
 */
const checkValue = async (key) => {
    await openDb();
    try {
        const value = await db.get(key);
        console.log(`Retrieved value for key ${key}: ${value}`, "level.js");
        return value;
    } catch (err) {
        if (err.notFound) {
            console.log(`Key ${key} not found`, "level.js");
            return null;
        } else {
            console.error('Error checking value:', err, "level.js");
            throw err;
        }
    }
};

/**
 * Checks if a key exists in the database
 * @param {string} key - The key to check
 * @returns {Promise<boolean>} - True if the key exists, false otherwise
 */
const checkIfExists = async (key) => {
    await openDb();
    try {
        await db.get(key);
        return true;
    } catch (err) {
        if (err.notFound) {
            return false;
        } else {
            console.error('Error checking if key exists:', err, "level.js");
            throw err;
        }
    }
};

module.exports = {
    addValue,
    checkValue,
    checkIfExists
};