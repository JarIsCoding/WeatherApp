import {apikey} from "./enviroment.js"

function ApiCall (){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${apikey}`)
    .then((Response)=> {
        return Response.json()
    })
    .then((data) => {
        console.log(data);
    })
}

ApiCall();