var input = document.querySelector(".input_text");
var main = document.querySelector("#name");
var temp = document.querySelector(".temp");
var desc = document.querySelector(".desc");
var clouds = document.querySelector(".clouds");
var button = document.querySelector(".submit");
var dayy = document.querySelector(".dayy");
button.addEventListener("click", function (name) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=e9fae9a5139dedd5fb23d5fa0187c018"
  )
    .then((response) => response.json())
    .then((data) => {
      var tempValue = data["main"]["temp"];
      var nameValue = data["name"];
      var descValue = data["weather"][0]["description"];
      var feelsliketempValue = data["main"]["feels_like"];
      var tempmin = data["main"]["temp_min"];
      var tempmax = data["main"]["temp_max"];
      var id = data["weather"][0]["id"];
      var latitude = data["coord"]["lon"];
      var longitude = data["coord"]["lat"];
      var humValue = data["main"]["humidity"];
      var pressuree = data["main"]["pressure"];
      var windspeed = data["wind"]["speed"];
      var sunrisee = data["sys"]["sunrise"];
      var sunsett = data["sys"]["sunset"];
      var countryy = data["sys"]["country"];
      //var visibilityval = data['visibility'];
      //var timezone = data['timezone'];
      var activity = "";
      var mode_of_transport = "";

      // var severe_weather = false;
      if (id == 800) {
        activity = " running, walks, sport activities, picnics ";
      }
      if ((id >= 600 && id <= 622) || (id >= 500 && id <= 531)) {
        activity = " Netflix and chill, TV shows, board games ";
      }
      if (id == 300 || id == 301) {
        activity =
          " Preferably indoor, but can manage to play football or cricket. ";
      }
      if (
        feelsliketempValue < 277 ||
        feelsliketempValue > 310 ||
        (windspeed > 15 && descValue != "severe")
      ) {
        mode_of_transport = "car";
      } else if (
        (feelsliketempValue > 277 && windspeed < 15) ||
        (feelsliketempValue < 310 && humValue < 30)
      ) {
        mode_of_transport = " car or bike ";
      } else if (windspeed && humValue) {
        mode_of_transport = " walk or bike ";
      }

      main.innerHTML = nameValue;
      desc.innerHTML =
        "Desc - " +
        descValue +
        " Feels like " +
        feelsliketempValue +
        " min temp " +
        tempmin +
        " max temp " +
        tempmax +
        " id " +
        id +
        " longitude " +
        longitude +
        " latitude " +
        latitude +
        " humidity value " +
        humValue +
        " pressure " +
        pressuree +
        " windspeed " +
        windspeed +
        " sunrise " +
        sunrisee +
        " sunset " +
        sunsett +
        " country " +
        countryy +
        " activity " +
        activity +
        " mode of transport " +
        mode_of_transport;
      temp.innerHTML = "Temp - " + tempValue;
      input.value = "";
      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=e9fae9a5139dedd5fb23d5fa0187c018"
      );
    })
    .then((response) => response.json())
    .then((data) => {
      var daily_day_temp = data.daily[0].temp.day;
      var daily_min_temp = data.daily[3].temp.min;
      var daily_max_temp = data.daily[3].temp.max;
      var daily_mor_temp = data.daily[3].temp.morn;
      var daily_eve_temp = data.daily[3].temp.eve;
      dayy.innerHTML =
        "Daily temp = " +
        daily_day_temp +
        " max " +
        daily_max_temp +
        " min " +
        daily_min_temp +
        " morning " +
        daily_mor_temp +
        " eve " +
        daily_eve_temp;
    })
    .catch((err) => alert("Wrong city name!"));
});
