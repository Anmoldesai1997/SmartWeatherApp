
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {white, orange500, orange600} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

const styles = {
  paper: {
    backgroundColor: orange500,
    height: 500
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: orange600,
    padding: 10,
  },
  body: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: orange500,
    padding: 10,
  },
  box:{
    width: 150
  }
};

class Power extends Component {

 
  constructor(props){
    super(props);
    this.state = {
      desiredTemperature: 0, height: 3, area: 30, feelsLike: 10, tempDiff: 0, energy: 0, HVAC: 1000, time: 0, verdict: ""
    };
  }
  componentDidMount(){

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Raleigh' + '&appid=e9fae9a5139dedd5fb23d5fa0187c018')
    .then(results => {
      
      return results.json();
    }).then(data => {

    
      var FL = data["main"]["feels_like"]-273;
      this.setState({feelsLike: FL})
      
    })
  }
    

  takeTemp(event)
  {
    this.setState({desiredTemperature: event.target.value});
    this.setState({tempDiff: event.target.value - this.state.feelsLike});
  }
  takeHeight(event)
  {
    this.setState({height: event.target.value});
  }

  takeArea(event)
  {
    this.setState({area: event.target.value});
    
  }

  takeWattage(event)
  {
    this.setState({HVAC: event.target.value*60});
    var eneg = 1275*this.state.area*this.state.height*Math.abs(this.state.tempDiff);
    this.setState({energy: eneg});
    var thc = Math.round(eneg/this.state.HVAC);
    this.setState({time: thc});
    if(this.state.tempDiff<0)
    this.setState({verdict: 'The amount of time taken to cool room'});
    else
    this.setState({verdict: 'The amount of time taken to heat room'});
  }
  render() {
    return(
      <Paper style={styles.paper}>
        <div>
        <div style={{...styles.header}}>Power Consumption</div>

        <div style={{...styles.body}}>Please enter Desired Temperature(°C)</div>
        <input style={{marginLeft:12}} type="text" value={this.state.DT} onChange={e => this.takeTemp(e)}/></div>

        <div style={{...styles.body}}>Please enter Room Height(m).</div>
        <input style={{marginLeft:12}} type="text" value={this.state.HT} onChange={e => this.takeHeight(e)}/>

        <div style={{...styles.body}}>Please enter Room Area(sq. m).</div>
        <input style={{marginLeft:12}} type="text" value={this.state.WD} onChange={e => this.takeArea(e)}/>  

        <div style={{...styles.body}}>Please enter HVACWattage(watt)</div>
        <input style={{marginLeft:12}} type="text" value={this.state.WD} onChange={e => this.takeWattage(e)}/>  

        <div style={{...styles.body}}> {this.state.verdict} {this.state.time} mins </div>
      </Paper>
    )
  }
}


export default Power;