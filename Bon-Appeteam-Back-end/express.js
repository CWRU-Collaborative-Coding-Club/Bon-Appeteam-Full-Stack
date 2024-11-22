const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

const recommendedFoods = [ //placeholders
    { id: 1, name: 'Avocado', benefits: 'Rich in healthy fats' },
    { id: 2, name: 'Blueberries', benefits: 'High in antioxidants' },
    { id: 3, name: 'Salmon', benefits: 'Great source of omega-3s' },
];

app.get(`/status`, (req,res) => {
    if(true){
        res.send('Online');
    } else {
        res.send('Offline');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});