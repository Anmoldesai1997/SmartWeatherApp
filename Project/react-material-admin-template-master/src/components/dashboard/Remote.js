
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {white, green500, green600} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';




const styles = {
  paper: {
    backgroundColor: green500,
    height: 200
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: green600,
    padding: 10,
  },
  body: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: green500,
    padding: 10,
  },
  box:{
    width: 150
  }
};

class Remote extends Component {

 
  constructor(props){
    super(props);
    this.state = {
      city: '', temp: '', humidity: '', wind: '', alert: ''
    };

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
  }
  handleChange(event) {
    this.setState({city: event.target.value});
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + event.target.value + '&appid=e9fae9a5139dedd5fb23d5fa0187c018')
    .then(results => {
     // console.log(results.json());
      return results.json();
    }).then(data => {
      var tempValue = Math.round(data["main"]["temp"]-273);
      var windspeed = data["wind"]["speed"];
      var humidity = data["main"]["humidity"];
      
     this.setState({temp: tempValue, humidity: humidity, wind: windspeed})
      
    }).catch(
    
      
      this.setState({alert: 'Wrong city name!', temp: '', humidity: '', wind: ''}) 
    );
  }

  handleSubmit() {

    
  }
  render() {
    return(
      <Paper style={styles.paper}>
        <div>
        <div style={{...styles.header}}>Weather statistics at Remote Location by city</div>
          
        <div style={{...styles.body}}>Please enter the city name</div>
        
        </div>

        <form onSubmit={this.handleSubmit()}>
        <label>
          <input style={{marginLeft:12}} type="text" onChange={e => this.handleChange(e)} />
        </label>
        
        </form>
        <div style={{...styles.body}}>City = {this.state.city}</div>
        <div style={{...styles.body}}>Temperature = {this.state.temp} °C</div>
        <div style={{...styles.body}}>Wind = {this.state.wind} m/s</div>
        <div style={{...styles.body}}>Humidity = {this.state.humidity} %</div>
        
      </Paper>
    )
  }
}


export default Remote;