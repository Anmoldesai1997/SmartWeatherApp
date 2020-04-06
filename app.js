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
            var id = data['weather']['id'];
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
            var activity="";
            var mode_of_transport = "";
            var severe_weather = false;
            //activity 
            if(id==800){
                activity = " running, walks, sport activities, picnics ";
            }
            if((id>=600&&id<=622)||(id>=500&&id<=531)){
                activity = " Netflix and chill, TV shows, board games ";
            }
            if(id==300||id==301){
                activity = " Preferably indoor, but can manage to play football or cricket. ";
            }
            //mode of transport
            if ((feelsliketempValue<277||feelsliketempValue>310k)||(windspeed>15&&descValue!='severe')) {
                mode_of_transport ='car';
            }
            else if((feelsliketempValue>277&&windspeed<15)||(feelsliketempValue<310&&humValue<30)){
                mode_of_transport =" car or bike ";
            }
            else if(windspeed&&humValue){
                mode_of_transport = " walk or bike ";
            }

            //severe weather notification
            if(feels_like<277&&windspeed>24&&visibility<100){
                severe_weather = true;
            }
            main.innerHTML = nameValue;
            desc.innerHTML = "Desc - " + descValue;
            temp.innerHTML = "Temp - " + tempValue;
            input.value = "";
            }

        })

        .catch(err => alert("Wrong city name!"));
})
