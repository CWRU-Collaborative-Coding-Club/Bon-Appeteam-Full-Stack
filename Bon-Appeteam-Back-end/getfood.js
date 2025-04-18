const fetch = require('node-fetch'); // Correct way to import node-fetch v2


const url = 'https://bonserver.onrender.com/entries';

// Make a GET request and parse the JSON response to an array of arrays
async function getFood() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Convert to array of arrays
        const foods = data.map(entry => Object.values(entry));

        // Log the result
        console.log(foods);
    } catch (error) {
        console.error('Error:', error);
    }
}

getFood();
