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
    
       
        let icon1Element = document.querySelector("#icon1");
        let icon2Element = document.querySelector("#icon2");
        let icon3Element = document.querySelector("#icon3");
        let icon4Element = document.querySelector("#icon4");
        let icon5Element = document.querySelector("#icon5");
        let icon6Element = document.querySelector("#icon6");
    
        
    
        let weekdayElement = document.querySelector("#weekday");
        let weekday1Element = document.querySelector("#weekday1");
        let weekday2Element = document.querySelector("#weekday2");
        let weekday3Element = document.querySelector("#weekday3");
        let weekday4Element = document.querySelector("#weekday4");
        let weekday5Element = document.querySelector("#weekday5");
        let weekday6Element = document.querySelector("#weekday6");
    
        temperatureElement.innerHTML = Math.round (response.data.main.temp);
        cityElement.innerHTML = response.data.name;
        descriptionElement.innerHTML = response.data.weather[0].description;
        humidityElement.innerHTML = response.data.main.humidity;
        windElement.innerHTML = response.data.wind.speed;
        dateElement.innerHTML = formatDate(currentDate);
        iconmainElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        iconmainElement.setAttribute("alt", response.data.weather[0].description);
    }
    
    function search(city) {
        let apiKey = "ce8e825e9de2cecd077619df37fa3d4f";
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