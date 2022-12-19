function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10) {
    hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
    }
    

    function displayForecast() {
        let weekdayElement = document.querySelector("#weekday");
        let forecastHTML = `<div class="row">`;
        let days=["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        days.forEach (function(day) {
            forecastHTML = forecastHTML + `

            <div class="col-2">${day}
            <div> <img src="" alt="" id="icon">img</div>
            <div>
            <span id="max-temp">max</span>
            <span id="min-temp">min</span>
            </div>  
            </div>
                `

        });

    forecastHTML = forecastHTML + `</div>`;
    weekdayElement.innerHTML = forecastHTML;
        
    }
  
    function getForecast(coordinates) {
        let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
        let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
        console.log(apiURL);
    };

    function displayTemperature(response) {
        
        let temperatureElement = document.querySelector("#temperature");
        let cityElement = document.querySelector("#city");
        let descriptionElement = document.querySelector("#description");
        let humidityElement = document.querySelector("#humidity");
        let windElement = document.querySelector("#wind");
        let dateElement = document.querySelector("#date");
        let iconmainElement = document.querySelector("#iconmain");

        let currentDate = new Date(); 

        celciusTemp = response.data.main.temp;
    
        temperatureElement.innerHTML = Math.round (response.data.main.temp);
        cityElement.innerHTML = response.data.name;
        descriptionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = response.data.wind.speed;
        dateElement.innerHTML = formatDate(currentDate);
        iconmainElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        iconmainElement.setAttribute("alt", response.data.weather[0].description);

        getForecast(response.data.coord);
    }
    
    function search(city) {
        let apiKey = "215576bab28022db35e6e64f040e1b56";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayTemperature);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        let cityInputElement = document.querySelector("#city-input");
            search(cityInputElement.value);
        
    }

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);




  

    function displayFarenheitTemp(event) {
    event.preventDefault();
    celcius.classList.remove("active");
    farenheit.classList.add("active");
    let farenheitTemp = ((celciusTemp) * 9)/5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(farenheitTemp);
}

    function displayCelciusTemp(event) {
    event.preventDefault();
    farenheit.classList.remove("active");
    celcius.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemp);
}

    let celciusTemp = null;

    let farenheit = document.querySelector("#farenheit");
    farenheit.addEventListener("click", displayFarenheitTemp);

    let celcius = document.querySelector("#celcius");
    celcius.addEventListener("click", displayCelciusTemp);

    search("New York");
    displayForecast();



    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}