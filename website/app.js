/* Global Variables */


// https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=4977fc4ffb4dc7042f2fd6b93e297669&units=imperial
const apiKey = '4977fc4ffb4dc7042f2fd6b93e297669&units=imperial';
let zipCode = '';
let countryCode = 'us';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById("generate").addEventListener('click', performAction);

function performAction(e) {
    zipCode = document.getElementById('zip').value;
    if (zipCode === '') {
        return document.getElementById('zipCodeReq').style.display = 'block'
    }
    else {
        document.getElementById('zipCodeReq').style.display = 'none'
    }

    const feeling = document.getElementById('feelings').value;
    if (feeling === '') {
        return document.getElementById('feelingReq').style.display = 'block'
    }
    else {
        document.getElementById('feelingReq').style.display = 'none'
    }

    //build url
    const url = `${baseUrl}?zip=${zipCode},${countryCode}&appid=${apiKey}`;
    
    retrieveWeatherData(url)
        .then(function (data) {
            let dataObj = {
                'temp': data.main.temp,
                'date': newDate,
                'feel': feeling
            }
            postData('/weathers', dataObj)
        })
        .then(function (data) {
            updateUI();
        }
        )
}

// Async GET
const retrieveWeatherData = async (url) => {
    const request = await fetch(url);
    try {
        const weatherData = await request.json();
        console.log(weatherData);
        if (!request.ok) {
            alert(weatherData.message);
            return Promise.reject(weatherData.message)
        }
        return weatherData;
    }
    catch (error) {
        console.log("error", error);
        return;
    }
};


// Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// update UI

const updateUI = async () => {
    const request = await fetch('/weathers/all');
    try {
        const allData = await request.json();
        console.log(allData)
        document.getElementById('temp').innerHTML = `<i class="fa-solid fa-cloud"></i> ${Math.round(allData.temp)} degrees`;
        document.getElementById("date").innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${allData.date}`;
        document.getElementById('content').innerHTML = `<i class="fa-solid fa-comment"></i> ${allData.feel}`;

    } catch (error) {
        console.log("error", error);
    }
}