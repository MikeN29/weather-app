//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//e9abf275dd62a4be25c1a660d12a04fd 


// `http://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&appid=e9abf275dd62a4be25c1a660d12a04fd`

// https://api.openweathermap.org/data/2.5/weather?lat=51.45&lon=-2.59&appid=e9abf275dd62a4be25c1a660d12a04fd&units=metric

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e9abf275dd62a4be25c1a660d12a04fd&units=metric



let userLocation = '';
let latVar = ''; 
let lonVar = ''; 


function submitData() {
    let userLocation = document.getElementById('location-search').value // make capital first letters!
    console.log(userLocation)

    locationAPI(userLocation)

}

function locationAPI(userLocation) {
    let locationAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&appid=e9abf275dd62a4be25c1a660d12a04fd`
    //console.log(locationAPI)
    event.preventDefault()

    fetch(locationAPI)
      .then(response => response.json()  )
      .then(content => {
        //console.log(content[0].lon);
        let latVar = content[0].lat;
        let lonVar = content[0].lon;

        let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latVar}&lon=${lonVar}&appid=e9abf275dd62a4be25c1a660d12a04fd&units=metric`

        fetch(weatherAPI)
        .then(response => response.json()  )
        .then(content => {

            let currentTemp = content.main.temp;
            let currentWeatherCondition = content.weather[0].main;
            let currentTempHigh = content.main.temp_max;
            let currentTempLow = content.main.temp_min;

          createWeatherCard(userLocation, currentTemp, currentWeatherCondition, currentTempHigh, currentTempLow)
    
      })
      .catch(err =>{
          console.error(err)
      })



    })
    .catch(err =>{
        console.error(err)
    })

    
    //createWeatherCard(userLocation, currentTemp, currentWeatherCondition, currentTempHigh, currentTempLow) - unsure scope of this function call
}


function createWeatherCard(userLocation, currentTemp, currentWeatherCondition, currentTempHigh, currentTempLow) {
    const weatherIMG = document.createElement('img');
    const ul = document.createElement('ul');

    document.getElementById("weatherCardContainer").appendChild(weatherIMG);
    document.getElementById("weatherCardContainer").appendChild(ul);

    weatherIMG.src = `./images/${currentWeatherCondition}.png`;

    let element = document.getElementById("weatherCardContainer");
    element.classList.add("weatherCardContainer");



    array = [`${userLocation}`, `${currentWeatherCondition}`, `Current Temp: ${currentTemp}&#176;C`, `Daily high: ${currentTempHigh}&#176;C`, `Daily Low: ${currentTempLow}&#176;C`]

    for (var i=0; i<array.length; i++){
        var li=document.createElement('li');
        ul.appendChild(li);
        li.innerHTML=li.innerHTML + array[i];
    }
}

function threeDayForecast() {
  
}















/* generate a display card on screen which states users location, the weather now, temp, min, max and displays a pciture of corresponding weather conditions*/




/*function locationAPI(userLocation) {
    let locationAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&appid=e9abf275dd62a4be25c1a660d12a04fd`
    console.log(locationAPI)
    event.preventDefault()

    fetch(locationAPI)
      .then(response => response.json()  )
      .then(content => {
        //console.log(content[0].lon);
        let latVar = content[0].lat;
        let lonVar = content[0].lon;

        console.log(latVar)
        console.log(lonVar)
    })
    .catch(err =>{
        console.error(err)
    })
} */

    

