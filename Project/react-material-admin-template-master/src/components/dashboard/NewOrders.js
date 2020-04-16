
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {white, purple600, purple500} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
const styles = {
  paper: {
    backgroundColor: purple500,
    height: 200
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: purple600,
    padding: 10,
  },
  body: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: purple500,
    padding: 10,
  }
};

class NewOrders extends Component {

 
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  getInput()
  {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Raleigh' + '&appid=e9fae9a5139dedd5fb23d5fa0187c018')
    .then(results => {
      // console.log(results.json());
      return results.json();
    }).then(data => {

    
      var descValue = data["weather"][0]["description"];
      var feelsliketempValue = data["main"]["feels_like"];
    
      var humValue = data["main"]["humidity"];
    
      var windspeed = data["wind"]["speed"];
      
      var mode_of_transport = "";

      
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
      this.setState({data: [mode_of_transport]})
      
    })
  }
  
  componentDidMount(){

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Raleigh' + '&appid=e9fae9a5139dedd5fb23d5fa0187c018')
    .then(results => {
      // console.log(results.json());
      return results.json();
    }).then(data => {

    
      var descValue = data["weather"][0]["description"];
      var feelsliketempValue = data["main"]["feels_like"];
    
      var humValue = data["main"]["humidity"];
    
      var windspeed = data["wind"]["speed"];
      
      var mode_of_transport = "";

      
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
      this.setState({data: [mode_of_transport]})
      
    })
    



    this.interval = setInterval(this.getInput, 5000);

  }


  



  render() {
    return(
      <Paper style={styles.paper}>
        <div style={{...styles.header}}>Mode of Transport</div>
          <div>
          {this.state.data.map(item =>(
            <div style={{...styles.body}}>{item}</div>
          ))}
          
        </div>
      </Paper>
    )
  }
}


export default NewOrders;