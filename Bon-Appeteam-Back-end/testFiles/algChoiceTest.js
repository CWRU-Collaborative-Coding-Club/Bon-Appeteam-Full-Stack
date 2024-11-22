
const fs = require('fs');
const xml2js = require('xml2js');
const prompt = require('prompt-sync')({sigint: true});
const { parseXML } = require("../parseXML.js");
const { addValue, checkValue, checkIfExists } = require("../leveldb/level.js");

const User = require('../user.js');
const Food = require('./foodclasstest.js');
const lookup = require('../lookupDatabase');

const Us1 = new User();
let menuArray = [];

// Read the XML file
fs.readFile('./menu.xml', (err, data) => {

    console.log((lookup("Hand-Cut French Fries")));

    //lookup food
    //add as food object
    //user eat food



});

function buildRec(User, foodArray) {

    // Divide the user nutrition gram goals to get calpg values which can be used with the scoring algorithm.

}
