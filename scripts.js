//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//e9abf275dd62a4be25c1a660d12a04fd 


// `http://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&appid=e9abf275dd62a4be25c1a660d12a04fd`

// https://api.openweathermap.org/data/2.5/weather?lat=51.45&lon=-2.59&appid=e9abf275dd62a4be25c1a660d12a04fd&units=metric

// api.openweathermap.org/data/2.5/forecast?lat=51.45&lon=2.59&appid=e9abf275dd62a4be25c1a660d12a04fd&units=metric



let userLocation = '';
let latVar = ''; 
let lonVar = ''; 


function submitData() {
    let userLocation = document.getElementById('location-search').value // make capital first letters!
    console.log(userLocation)

    locationAPI(userLocation)
    document.getElementById("submit").disabled = true;

}

function resetData() {

    document.getElementById("submit").disabled = false;

    //remove classes
    let element = document.getElementById("weatherCardContainer");
    element.classList.remove("weatherCardContainer");

    const elementsList = document.querySelectorAll("#tomorrowCard, #dayThreeCard, #dayFourCard");
    const elementsArray = [...elementsList];
  
    elementsArray.forEach(element => {
      element.classList.remove("dayThreeCards");
    });

    //remove children

    const myNode = document.getElementById("weatherCardContainer");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }

    elementsArray.forEach(element => {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
          }
      });
}

function locationAPI(userLocation) {
    let locationAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&appid=e9abf275dd62a4be25c1a660d12a04fd`
    //console.log(locationAPI)
    event.preventDefault()

    fetch(locationAPI)
      .then(response => response.json()  )
      .then(content => {
        let latVar = content[0].lat;
        let lonVar = content[0].lon;
        weatherAPI(userLocation, latVar, lonVar)

    })
    .catch(err =>{
        console.error(err)
    })

}

function weatherAPI(userLocation, latVar, lonVar) {

        let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latVar}&lon=${lonVar}&appid=e9abf275dd62a4be25c1a660d12a04fd&units=metric`

        fetch(weatherAPI)
        .then(response => response.json()  )
        .then(content => {

            let currentTemp = content.main.temp;
            let currentWeatherCondition = content.weather[0].main;
            let currentTempHigh = content.main.temp_max;
            let currentTempLow = content.main.temp_min;

          createWeatherCard(userLocation, currentTemp, currentWeatherCondition, currentTempHigh, currentTempLow)
          threeDayForecast(userLocation, latVar, lonVar)
    
      })
      .catch(err =>{
          console.error(err)
      })

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

function threeDayForecast(userLocation, latVar, lonVar) {

  let threeDayForecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latVar}&lon=${lonVar}&appid=e9abf275dd62a4be25c1a660d12a04fd&units=metric`;


  console.log(threeDayForecastAPI)

  fetch(threeDayForecastAPI)
  .then(response => response.json()  )
  .then(content => {

      let tomorrowTemp = content.list[7].main.temp;
      let tomorrowWeatherCondition = content.list[7].weather[0].main;
      let tomorrowTempHigh = content.list[7].main.temp_max;
      let tomorrowTempLow = content.list[7].main.temp_min;

      let dayThreeTemp = content.list[15].main.temp;
      let dayThreeWeatherCondition = content.list[15].weather[0].main;
      let dayThreeTempHigh = content.list[15].main.temp_max;
      let dayThreeTempLow = content.list[15].main.temp_min;

      let dayFourTemp = content.list[23].main.temp;
      let dayFourWeatherCondition = content.list[23].weather[0].main;
      let dayFourTempHigh = content.list[23].main.temp_max;
      let dayFourTempLow = content.list[23].main.temp_min;

      threeDayCard(tomorrowTemp, tomorrowWeatherCondition, tomorrowTempHigh, tomorrowTempLow, 
        dayThreeTemp, dayThreeWeatherCondition, dayThreeTempHigh, dayThreeTempLow, 
        dayFourTemp, dayFourWeatherCondition, dayFourTempHigh, dayFourTempLow)

})
.catch(err =>{
    console.error(err)
})
 

}

function threeDayCard(tomorrowTemp, tomorrowWeatherCondition, tomorrowTempHigh, tomorrowTempLow, 
                      dayThreeTemp, dayThreeWeatherCondition, dayThreeTempHigh, dayThreeTempLow, 
                      dayFourTemp, dayFourWeatherCondition, dayFourTempHigh, dayFourTempLow) {

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday", "Monday"];
  const d = new Date();
  let tomorrow = weekday[d.getDay()+1];
  let dayThree = weekday[d.getDay()+2];
  let dayFour = weekday[d.getDay()+3];
  console.log(dayFour)

  const elementsList = document.querySelectorAll("#tomorrowCard, #dayThreeCard, #dayFourCard");
  const elementsArray = [...elementsList];

  elementsArray.forEach(element => {
    element.classList.add("dayThreeCards");
  });

  //tomorrow

    const tomorrowIMG = document.createElement('img');
    const tomorrowUL = document.createElement('ul');

    document.getElementById("tomorrowCard").appendChild(tomorrowIMG);
    document.getElementById("tomorrowCard").appendChild(tomorrowUL);

    tomorrowIMG.src = `./images/${tomorrowWeatherCondition}.png`;

    tomorrowArray = [`${tomorrow}`, `${tomorrowWeatherCondition}`, `Forecast Temp: ${tomorrowTemp}&#176;C`, `High: ${tomorrowTempHigh}&#176;C`, `Low: ${tomorrowTempLow}&#176;C`]

    for (var i=0; i<tomorrowArray.length; i++){
        var li=document.createElement('li');
        tomorrowUL.appendChild(li);
        li.innerHTML=li.innerHTML + tomorrowArray[i];
    }

    //dayThree

    const dayThreeIMG = document.createElement('img');
    const dayThreeUL = document.createElement('ul');

    document.getElementById("dayThreeCard").appendChild(dayThreeIMG);
    document.getElementById("dayThreeCard").appendChild(dayThreeUL);

    dayThreeIMG.src = `./images/${dayThreeWeatherCondition}.png`;

    dayThreeArray = [`${dayThree}`, `${dayThreeWeatherCondition}`, `Forecast Temp: ${dayThreeTemp}&#176;C`, `High: ${dayThreeTempHigh}&#176;C`, `Low: ${dayThreeTempLow}&#176;C`]

    for (var i=0; i<dayThreeArray.length; i++){
        var li=document.createElement('li');
        dayThreeUL.appendChild(li);
        li.innerHTML=li.innerHTML + dayThreeArray[i];
    }

    //dayFour

    const dayFourIMG = document.createElement('img');
    const dayFourUL = document.createElement('ul');

    document.getElementById("dayFourCard").appendChild(dayFourIMG);
    document.getElementById("dayFourCard").appendChild(dayFourUL);

    dayFourIMG.src = `./images/${dayFourWeatherCondition}.png`;

    dayFourArray = [`${dayFour}`, `${dayFourWeatherCondition}`, `Forecast Temp: ${dayFourTemp}&#176;C`, `High: ${dayFourTempHigh}&#176;C`, `Low: ${dayFourTempLow}&#176;C`]

    for (var i=0; i<dayFourArray.length; i++){
        var li=document.createElement('li');
        dayFourUL.appendChild(li);
        li.innerHTML=li.innerHTML + dayFourArray[i];
    }

}
















/* generate a display card on screen which states users location, the weather now, temp, min, max and displays a pciture of corresponding weather conditions*/





    

