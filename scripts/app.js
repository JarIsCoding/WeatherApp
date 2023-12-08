import { apikey, } from "./enviroment.js"

// IDs
let UserInput = document.getElementById('UserInput');
let CurrentCity = document.getElementById('CurrentCity');
let CurrentWeather = document.getElementById('CurrentWeather');
let CurrentTemp = document.getElementById('CurrentTemp');
let TdayMax = document.getElementById('TdayMax');
let TdayMin = document.getElementById('TdayMin');

let searchBtn = document.getElementById('searchBtn');

// Forecast IDs
let DayOneWeather = document.getElementById('DayOneWeather');
let DayOneMax = document.getElementById('DayOneMax');
let DayOneMin = document.getElementById('DayOneMin');
let DayTwoWeather = document.getElementById('DayTwoWeather');
let DayTwoMax = document.getElementById('DayTwoMax');
let DayTwoMin = document.getElementById('DayTwoMin');
let DayTreeWeather = document.getElementById('DayTreeWeather');
let DayTreeMax = document.getElementById('DayTreeMax');
let DayTreeMin = document.getElementById('DayTreeMin');
let DayFourWeather = document.getElementById('DayFourWeather');
let DayFourMax = document.getElementById('DayFourMax');
let DayFourMin = document.getElementById('DayFourMin');
let DayFiveWeather = document.getElementById('DayFiveWeather');
let DayFiveMax = document.getElementById('DayFiveMax');
let DayFiveMin = document.getElementById('DayFiveMin');

//Var
let searched;
let matchingLocation;

//Geolocation Code
navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    ApiCall(latitude, longitude);
    FiveDay(latitude, longitude);
}

function errorFunc(error) {
    console.log(error.message);
}

//Current Weather Api Calls
async function ApiCall(latitude, longitude) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=Imperial`)

    const data = await promise.json();

    console.log(data);

    CurrentCity.textContent = data.name;

    console.log("Feels Like: " + data.main.temp)
    CurrentTemp.textContent = `${Math.floor(data.main.temp)}°`;

    console.log("Max: " + data.main.temp_max)
    TdayMax.textContent = `H:${Math.floor(data.main.temp_max)}°`;

    console.log("Min: " + data.main.temp_min)
    TdayMin.textContent = `L:${Math.floor(data.main.temp_min)}°`;

    console.log("Weather: " + data.weather[0].main)
    CurrentWeather.textContent = data.weather[0].main;

    DayOneWeather.textContent = data.weather[0].main;
    DayOneMax.textContent = `${Math.floor(data.main.temp_max)}°`;
    DayOneMin.textContent = `${Math.floor(data.main.temp_min)}°`;

}

//Five Day Forecast
async function FiveDay(latitude, longitude) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=Imperial`)

    const data = await promise.json();

    console.log(data);

    console.log(data.list[0].weather[0].main)

    console.log(data.list[0].main.temp_max)

    console.log(data.list[0].main.temp_min)


    console.log(data.list[2].weather[0].main)
    DayTwoWeather.textContent = data.list[2].weather[0].main;

    console.log(data.list[2].main.temp_max)
    DayTwoMax.textContent = `${Math.floor(data.list[2].main.temp_max)}°`

    console.log(data.list[2].main.temp_min)
    DayTwoMin.textContent = `${Math.floor(data.list[2].main.temp_min)}°`


    console.log(data.list[9].weather[0].main)
    DayTreeWeather.textContent = data.list[9].weather[0].main;

    console.log(data.list[9].main.temp_max)
    DayTreeMax.textContent = `${Math.floor(data.list[9].main.temp_max)}°`

    console.log(data.list[9].main.temp_min)
    DayTreeMin.textContent = `${Math.floor(data.list[9].main.temp_min)}°`


    console.log(data.list[17].weather[0].main)
    DayFourWeather.textContent = data.list[17].weather[0].main;

    console.log(data.list[17].main.temp_max)
    DayFourMax.textContent = `${Math.floor(data.list[17].main.temp_max)}°`

    console.log(data.list[17].main.temp_min)
    DayFourMin.textContent = `${Math.floor(data.list[17].main.temp_min)}°`


    console.log(data.list[25].weather[0].main)
    DayFiveWeather.textContent = data.list[25].weather[0].main;

    console.log(data.list[25].main.temp_max)
    DayFiveMax.textContent = `${Math.floor(data.list[25].main.temp_max)}°`

    console.log(data.list[25].main.temp_min)
    DayFiveMin.textContent = `${Math.floor(data.list[25].main.temp_min)}°`
}

async function Geocode() {
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${UserInput.value}&limit=5&appid=${apikey}`)

    const data = await promise.json();

    UserInput.value.toLowerCase

    let searchName = data[0].name
    CurrentCity.textContent = searchName

    console.log(data);

    let searchLat = data[0].lat
    let searchLon = data[0].lon
    
    ApiCall(searchLat, searchLon);
    FiveDay(searchLat, searchLon);
}


UserInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        Geocode(); 
    }
})

//Updates the APIs every 10 minutes
setInterval(ApiCall, 600000);
setInterval(Geocode, 600000);
setInterval(FiveDay, 601000);

ApiCall();
FiveDay();