// Setup empty JS object to act as endpoint for all routes
// projectData = {}; => move this line to controllers-> weathers.js

// Require Express to run server and routes
const express = require('express');
const PORT = 8000;

const weathersRouter = require('./Routes/weathers');
// Starit up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`);

})

//Routes 
app.use('/weathers', weathersRouter);
