
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {white, yellow600, yellow500} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import { darkBlack } from 'material-ui/styles/colors';
const styles = {
  paper: {
    backgroundColor: yellow500,
    height: 200
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: yellow600,
    padding: 10,
  },
  body: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: darkBlack,
    backgroundColor: yellow500,
    padding: 10,
  }
};

class Future extends Component {

 
  constructor(props){
    super(props);
    this.state = {
      lat: "", long: "", temp: "", max: "", min: ""
    };
  }

  
  
  componentDidMount(){

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Raleigh' + '&appid=e9fae9a5139dedd5fb23d5fa0187c018')
    .then(results => {
      // console.log(results.json());
      return results.json();
    }).then(data => {

    
      var latitude = data["coord"]["lat"];
      var longitude = data["coord"]["lon"];
      this.setState({lat: latitude, long: longitude})
      
      

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
          "&lon=" +
          longitude+
          "&appid=e9fae9a5139dedd5fb23d5fa0187c018"
      ).then((response) => response.json())
      .then((data2) => {
        var daily_day_temp = Math.round(data2.daily[1].temp.day-273)+'°C';
        var MAX = Math.round(data2.daily[1].temp.max-273)+'°C';
        var MIN = Math.round(data2.daily[1].temp.min-273)+'°C';
        
        this.setState({temp: daily_day_temp, max: MAX, min: MIN})

        
        var temp = data2.current.feels_like;
        var humid = data2.current.humidity;
        var wspeed = data2.current.wind_speed;
        var visib = data2.current.visibility;

        if(temp<277 || temp>310 || humid > 90)
        {
          temp = Math.round(data2.current.feels_like-273)+'°C';
          alert('Severe temperature alert: ' + temp + ' humidity: ' + humid +'%');
        }

        if(wspeed>24)
        alert('Severe windspeed alert: ' + wspeed);

        if(visib<100)
        alert('Severe visibility alert: ' + visib);
      })

    }) 

  }


  



  render() {
    return(
      <Paper style={styles.paper}>
        <div>
        <div style={{...styles.header}}>24 Hour Future Forecast</div>
          
        <div style={{...styles.body}}> Temperature = {this.state.temp} </div>
          
        <div style={{...styles.body}}> Maximum = {this.state.max} </div>

        <div style={{...styles.body}}> Minimum = {this.state.min} </div>
        </div>
      </Paper>
    )
  }
}


export default Future;