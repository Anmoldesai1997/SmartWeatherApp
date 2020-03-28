var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');


button.addEventListener('click', function (name) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=fe8a90dcf3e80ad0b2e144756c4372f0')
        .then(response => response.json())
        .then(data => {
            var tempValue = data['main']['temp'];
            var feelsliketempValue = data['main']['feels_like'];
            var tempmin = data['main']['temp_min'];
            var tempmax = data['main']['temp_max'];

            var latitude = data['coord']['lon'];
            var longitude = data['coord']['lat'];
            var nameValue = data['name'];
            var descValue = data['weather'][0]['description'];
            var conditionValue = data['weather'][0]['main'];
            var humValue = data['main']['humidity'];
            var pressure = data['main']['pressure'];
            var windspeed = data['wind']['speed'];
            var winddeg = data['wind']['deg'];
            var rain = data['rain']['1h'];
            var cloudsValue = data['clouds']['all']; // returns value like 90
            var sunrise = data['sys']['sunrise'];
            var sunset = data['sys']['sunset'];
            var country = data['sys']['country'];
            var visibilityval = data['visibility'];
            var timezone = data['timezone'];


            main.innerHTML = nameValue;
            desc.innerHTML = "Desc - " + descValue;
            temp.innerHTML = "Temp - " + tempValue;
            input.value = "";

        })

        .catch(err => alert("Wrong city name!"));
})
