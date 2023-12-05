import {apikey, apikey2} from "./enviroment.js"

//GEOLOCATION CODE
navigator.geolocation.getCurrentPosition(success, errorFunc);

function success (position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
}

function errorFunc (error) {
    console.log(error.message);
}

async function ApiCall (){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${apikey}`)

    const data = await promise.json();

    console.log(data);
}

async function CityName (){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${apikey}`)

    const data = await promise.json();

    console.log(data.name)
}

async function MaxTemp (){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${apikey}`)

    const data = await promise.json();

    console.log(data.main.temp_max)
}

async function MinTemp (){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${apikey}`)

    const data = await promise.json();

    console.log(data.main.temp_min)
}

async function FiveDay (){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey2}`)

    const data = await promise.json();

    console.log(data)
}

ApiCall();
CityName();
MaxTemp();
MinTemp();
FiveDay();