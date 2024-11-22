const express = require('express');
const cors = require('cors');
const { HARDCODED_FOODS } = require('./foods.js');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
const status = true;

app.get('/api/foods', (req, res) => {
    res.json(HARDCODED_FOODS);
});

app.get(`/status`, (req,res) => {
    if(status){
        res.send('Online');
    } else {
        res.send('Offline');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});