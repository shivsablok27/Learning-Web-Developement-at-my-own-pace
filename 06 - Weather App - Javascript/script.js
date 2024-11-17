const inputbox = document.querySelector(".input-box");
const searchbtn = document.querySelector("#search-btn");
const weatherimg = document.querySelector(".weather-image");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windspeed = document.querySelector("#wind-speed");
const error = document.querySelector(".location-not-found");
const weatherbody = document.querySelector(".weather-body");

async function checkWeather(city){
    const apikey = "dd03bc2c48416e05bbda57abe989d42c"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const weatherData = await fetch(url).then(response => response.json())

    if(weatherData.cod === "404"){
        error.style.display = "flex"
        weatherbody.style.display = "none"
        return;
    }

    error.style.display = "none"
    weatherbody.style.display = "flex"

    temp.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}<sup>°C</sup>`
    description.innerHTML = `${weatherData.weather[0].description}`
    humidity.innerHTML = `${weatherData.main.humidity}%`
    windspeed.innerHTML = `${weatherData.wind.speed} km/h`

    switch(weatherData.weather[0].main){
        case "Clouds":
            weatherimg.src = "./assets/cloud.png"
            break;
        case "Clear":
            weatherimg.src = "./assets/clear.png"
            break;
        case "Rain":
            weatherimg.src = "./assets/rain.png"
            break;
        case "Snow":
            weatherimg.src = "./assets/snow.png"
            break;
        default:
            weatherimg.src = "./assets/cloud.png"
    }
}

searchbtn.addEventListener("click",()=>{
    checkWeather(inputbox.value)
})
