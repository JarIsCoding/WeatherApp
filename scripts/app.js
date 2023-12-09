import { apikey, } from "./enviroment.js"

// IDs
let UserInput = document.getElementById('UserInput');
let CurrentCity = document.getElementById('CurrentCity');
let CurrentWeather = document.getElementById('CurrentWeather');
let CurrentTemp = document.getElementById('CurrentTemp');
let TdayMax = document.getElementById('TdayMax');
let TdayMin = document.getElementById('TdayMin');
let favName = document.getElementById('favName');
let injectHere = document.getElementById("injectHere");
let favBtn = document.getElementById("favBtn");
let del = document.getElementById("delete");
let CImg = document.getElementById("CImg")
let Day1Img = document.getElementById("Day1Img")
let Day2Img = document.getElementById("Day2Img")
let Day3Img = document.getElementById("Day3Img")
let Day4Img = document.getElementById("Day4Img")
let Day5Img = document.getElementById("Day5Img")
let favArray = [];
let Day1Txt = document.getElementById("Day1Txt")
let Day2Txt = document.getElementById("Day2Txt")
let Day3Txt = document.getElementById("Day3Txt")
let Day4Txt = document.getElementById("Day4Txt")
let Day5Txt = document.getElementById("Day5Txt")
let favBtnImg = document.getElementById("favBtnImg")

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
let ApiName;
let ApiMax;
let ApiMin;
let ApiWeather;
let ApiTemp;
let WeekDay1;
let WeekDay2;
let WeekDay3;
let WeekDay4;

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

    let CName = data.name
    CurrentCity.textContent = data.name;

    console.log("Temp: " + data.main.temp)
    let CTemp = `${Math.floor(data.main.temp)}°`
    CurrentTemp.textContent = `${Math.floor(data.main.temp)}°`;

    console.log("Max: " + data.main.temp_max)
    let CMax = `H:${Math.floor(data.main.temp_max)}°`;
    TdayMax.textContent = `H:${Math.floor(data.main.temp_max)}°`;

    console.log("Min: " + data.main.temp_min)
    let CMin = `L:${Math.floor(data.main.temp_min)}°`;
    TdayMin.textContent = `L:${Math.floor(data.main.temp_min)}°`;

    console.log("Weather: " + data.weather[0].main)
    let CWeather = data.weather[0].main
    let CWeatherID = data.weather[0].id
    CurrentWeather.textContent = data.weather[0].main;

    DayOneWeather.textContent = data.weather[0].main;
    DayOneMax.textContent = `${Math.floor(data.main.temp_max)}°`;
    DayOneMin.textContent = `${Math.floor(data.main.temp_min)}°`;

    ApiName = CName;
    ApiMax = CMax;
    ApiMin = CMin;
    ApiWeather = CWeather;
    ApiTemp = CTemp;

    if (CWeatherID >= 801 && CWeatherID <= 804) {
        CImg.src = "./assets/Cloudy.png"
        Day1Img.src = "./assets/Cloudy.png"
    } else if (CWeatherID === 800) {
        CImg.src = "./assets/WhiteSun.png";
        Day1Img.src = "./assets/WhiteSun.png";
    } else if (CWeatherID >= 500 && CWeatherID <= 504 || CWeatherID === 511 || (CWeatherID >= 520 && CWeatherID <= 531)) {
        CImg.src = "./assets/Rainy.png";
        Day1Img.src = "./assets/Rainy.png";
    } else if (CWeatherID >= 600 && CWeatherID <= 622) {
        CImg.src = "./assets/Snowy.png";
        Day1Img.src = "./assets/Snowy.png";
    } else if (CWeatherID >= 200 && CWeatherID <= 232) {
        CImg.src = "./assets/Stormy.png";
        Day1Img.src = "./assets/Stormy.png";
    } else if (CWeatherID >= 300 && CWeatherID <= 321) {
        CImg.src = "./assets/Hazy.png";
        Day1Img.src = "./assets/Hazy.png";
    } else {
        CImg.src = "./assets/WhiteSun.png";
        Day1Img.src = "./assets/WhiteSun.png";
    }

    openclose(CurrentCity);
}

favBtn.addEventListener("click", function (e) {
    favArray.push(favop(ApiName, ApiTemp, ApiMax, ApiMin, ApiWeather))
    console.log(favArray)
})

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

    let weatherID = data.list[2].weather[0].id
    let weatherID2 = data.list[9].weather[0].id
    let weatherID3 = data.list[17].weather[0].id
    let weatherID4 = data.list[25].weather[0].id

    if (weatherID >= 801 && weatherID <= 804) {
        Day2Img.src = "./assets/Cloudy.png"
    } else if (weatherID === 800) {
        Day2Img.src = "./assets/WhiteSun.png";
    } else if (weatherID >= 500 && weatherID <= 504 || weatherID === 511 || (weatherID >= 520 && weatherID <= 531)) {
        Day2Img.src = "./assets/Rainy.png";
    } else if (weatherID >= 600 && weatherID <= 622) {
        Day2Img.src = "./assets/Snowy.png";
    } else if (weatherID >= 200 && weatherID <= 232) {
        Day2Img.src = "./assets/Stormy.png";
    } else if (weatherID >= 300 && weatherID <= 321) {
        Day2Img.src = "./assets/Hazy.png";
    } else {
        Day2Img.src = "./assets/WhiteSun.png";
    }

    if (weatherID2 >= 801 && weatherID2 <= 804) {
        Day3Img.src = "./assets/Cloudy.png"
    } else if (weatherID2 === 800) {
        Day3Img.src = "./assets/WhiteSun.png";
    } else if (weatherID2 >= 500 && weatherID2 <= 504 || weatherID2 === 511 || (weatherID2 >= 520 && weatherID2 <= 531)) {
        Day3Img.src = "./assets/Rainy.png";
    } else if (weatherID2 >= 600 && weatherID2 <= 622) {
        Day3Img.src = "./assets/Snowy.png";
    } else if (weatherID2 >= 200 && weatherID2 <= 232) {
        Day3Img.src = "./assets/Stormy.png";
    } else if (weatherID2 >= 300 && weatherID2 <= 321) {
        Day3Img.src = "./assets/Hazy.png";
    } else {
        Day3Img.src = "./assets/WhiteSun.png";
    }

    if (weatherID3 >= 801 && weatherID3 <= 804) {
        Day4Img.src = "./assets/Cloudy.png"
    } else if (weatherID3 === 800) {
        Day4Img.src = "./assets/WhiteSun.png";
    } else if (weatherID3 >= 500 && weatherID3 <= 504 || weatherID3 === 511 || (weatherID3 >= 520 && weatherID3 <= 531)) {
        Day4Img.src = "./assets/Rainy.png";
    } else if (weatherID3 >= 600 && weatherID3 <= 622) {
        Day4Img.src = "./assets/Snowy.png";
    } else if (weatherID3 >= 200 && weatherID3 <= 232) {
        Day4Img.src = "./assets/Stormy.png";
    } else if (weatherID3 >= 300 && weatherID3 <= 321) {
        Day4Img.src = "./assets/Hazy.png";
    } else {
        Day4Img.src = "./assets/WhiteSun.png";
    }

    if (weatherID4 >= 801 && weatherID4 <= 804) {
        Day5Img.src = "./assets/Cloudy.png"
    } else if (weatherID4 === 800) {
        Day5Img.src = "./assets/WhiteSun.png";
    } else if (weatherID4 >= 500 && weatherID4 <= 504 || weatherID4 === 511 || (weatherID4 >= 520 && weatherID4 <= 531)) {
        Day5Img.src = "./assets/Rainy.png";
    } else if (weatherID4 >= 600 && weatherID4 <= 622) {
        Day5Img.src = "./assets/Snowy.png";
    } else if (weatherID4 >= 200 && weatherID4 <= 232) {
        Day5Img.src = "./assets/Stormy.png";
    } else if (weatherID4 >= 300 && weatherID4 <= 321) {
        Day5Img.src = "./assets/Hazy.png";
    } else {
        Day5Img.src = "./assets/WhiteSun.png";
    }
    DaysOfWeek();
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

function favop(CName, CTemp, CMax, CMin, CWeather) {
    let p1 = document.createElement("p");
    p1.id = "favName"
    p1.className = "fut"
    p1.textContent = CName

    let p2 = document.createElement("p");
    p2.className = "at text-end"
    p2.textContent = CTemp

    let p3 = document.createElement("p");
    p3.className = "ft"
    p3.textContent = "F"

    let p4 = document.createElement("p");
    p4.className = "trd"
    p4.textContent = CWeather

    let p5 = document.createElement("p");
    p5.className = "trd text-center"
    p5.textContent = CMax + " " + CMin

    let bodyDiv1 = document.createElement("div");
    bodyDiv1.className = "col-6 pt-3";

    let bodyDiv2 = document.createElement("div");
    bodyDiv2.className = "col pe-0";

    let bodyDiv3 = document.createElement("div");
    bodyDiv3.className = "col-1 ps-0 pt-4 mx-0";

    let bodyDiv4 = document.createElement("div");
    bodyDiv4.className = "col-6";

    let bodyDiv5 = document.createElement("div");
    bodyDiv5.className = "col-6";

    bodyDiv1.appendChild(p1);
    bodyDiv2.appendChild(p2);
    bodyDiv3.appendChild(p3);
    bodyDiv4.appendChild(p4);
    bodyDiv5.appendChild(p5);

    let outerDiv = document.createElement("div");
    outerDiv.id = "delete"
    outerDiv.className = "row closeColor rounded-4 robol ps-2 pe-2 mx-0";

    outerDiv.appendChild(bodyDiv1)
    outerDiv.appendChild(bodyDiv2)
    outerDiv.appendChild(bodyDiv3)
    outerDiv.appendChild(bodyDiv4)
    outerDiv.appendChild(bodyDiv5)

    let br = document.createElement("br")

    injectHere.appendChild(br);
    injectHere.appendChild(outerDiv);
    openclose(favName);
}

function openclose(CurrentCity, favName) {
    if (favName === CurrentCity) {
        del.classList.remove("closeColor");
        del.classList.add("openColor");
    } else {
        del.classList.remove("openColor");
        del.classList.add("closeColor");
    }
}

setInterval(SetImage, 5000);

function SetImage() {

    function changeBackgroundImage(imageUrl) {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    }

    let TimeNow = new Date();
    let DayTime = new Date();
    DayTime.setHours(6);
    DayTime.setMinutes(30);

    let NightTime = new Date();
    NightTime.setHours(18);
    NightTime.setMinutes(30);

    if (DayTime < TimeNow && TimeNow < NightTime) {
        changeBackgroundImage('./assets/WeatherDay.png')
    } else {
        changeBackgroundImage('./assets/WeatherNight.png')
    }
}

function DaysOfWeek() {
    const date = new Date();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let Today = new Date();
    Today.setDate(date.getDate());
    const TodayDate = daysOfWeek[Today.getDay()];

    let futureDate1 = new Date();
    futureDate1.setDate(date.getDate() + 1);
    const futureDayOfWeek1 = daysOfWeek[futureDate1.getDay()];
    WeekDay1 = futureDayOfWeek1

    let futureDate2 = new Date();
    futureDate2.setDate(date.getDate() + 2);
    const futureDayOfWeek2 = daysOfWeek[futureDate2.getDay()];
    WeekDay2 = futureDayOfWeek2

    let futureDate3 = new Date();
    futureDate3.setDate(date.getDate() + 3);
    const futureDayOfWeek3 = daysOfWeek[futureDate3.getDay()];
    WeekDay3 = futureDayOfWeek3

    let futureDate4 = new Date();
    futureDate4.setDate(date.getDate() + 4);
    const futureDayOfWeek4 = daysOfWeek[futureDate4.getDay()];
    console.log(`Day 4 after today is ${futureDayOfWeek4}`);
    WeekDay4 = futureDayOfWeek4

    Day1Txt.textContent = TodayDate;
    Day2Txt.textContent = futureDayOfWeek1;
    Day3Txt.textContent = futureDayOfWeek2;
    Day4Txt.textContent = futureDayOfWeek3;
    Day5Txt.textContent = futureDayOfWeek4;
}

favBtn.addEventListener('click', function () {
    if (favBtnImg.src.endsWith("Checkmark.png")) {
        favBtnImg.src = "./assets/Transparent.png";
    } else {
        favBtnImg.src = "./assets/Checkmark.png"
    }
})

//Updates the APIs every 10 minutes
setInterval(ApiCall, 600000);
setInterval(Geocode, 600000);
setInterval(FiveDay, 601000);

// ApiCall();
// FiveDay();
openclose();
SetImage();