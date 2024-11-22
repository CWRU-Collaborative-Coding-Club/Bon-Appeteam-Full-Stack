const fs = require('fs');
const flow = require('xml-flow');
const { addValue } = require('./leveldb/level.js');

function parseXML() {
    return new Promise((resolve, reject) => {
        const rawXMLFile = fs.createReadStream('./menu.xml');
        const xmlStream = flow(rawXMLFile);

        xmlStream.on('tag:food', async (food) => {
            try {
                console.log('Processing food item:', JSON.stringify(food, null, 2));

                if (!food || !food.title) {
                    console.error('Invalid food item structure:', food);
                    return;
                }

                const foodName = food.title;
                const foodInfo = {
                    id: food.$attrs && food.$attrs.id || null,
                    title: foodName,
                    meats: food.meats === 'true',
                    grains: food.grains === 'true',
                    dairy: food.dairy === 'true',
                    fruitveg: food.fruitveg === 'true',
                    fatsoils: food.fatsoils === 'true',
                    location: food.location || null,
                    time: food.time || null,
                    calories: parseInt(food.calories) || null,
                    carbs: parseInt(food.carbs) || null,
                    protein: parseInt(food.protein) || null,
                    fat: parseInt(food.fat) || null,
                    sugars: parseInt(food.sugars) || null,
                    sodium: parseInt(food.sodium) || null,
                    dietaryfiber: parseInt(food.dietaryfiber) || null,
                    vegan: food.vegan === 'true',
                    gluten: food.gluten === 'true',
                    servingsize: parseFloat(food.servingsize) || null,
                    description: food.description || null
                };

                if (!foodName) {
                    console.error('Food name is empty or undefined');
                    return;
                }

                await addValue(foodName, JSON.stringify(foodInfo));
                console.log(`Added ${foodName} to the database`);
            } catch (error) {
                console.error(`Error processing food item: ${error.message}`, food);
            }
        });

        xmlStream.on('end', () => {
            console.log('Finished parsing XML and adding to database');
            resolve();
        });

        xmlStream.on('error', (error) => {
            console.error('Error parsing XML:', error);
            reject(error);
        });
    });
}




module.exports = { parseXML };