
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {white, blue400, blue500} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
const styles = {
  paper: {
    backgroundColor: blue400,
    height: 200
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: blue500,
    padding: 10,
  },
  body: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: blue400,
    padding: 10,
  }
};



class BrowserUsage extends Component {

 
  constructor(){
    super();
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
    }).then(obj => {

      var id = obj["weather"][0]["id"];
      var activity = "12345";
      // var severe_weather = false;
      if (id >= 800) {
        activity = ' running, walks, sport activities, picnics ';
      }
      if ((id >= 600 && id <= 622) || (id >= 500 && id <= 531)  || (id >= 700 && id <= 781)) {
        activity = ' Netflix and chill, TV shows, board games ';
      }
      if (id == 300 || id == 301) {
        activity =
          ' Preferably indoor, but can manage to play football or cricket. ';
      }
     this.setState({data: [activity]})
      
    })
  }

  componentDidMount(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Bangalore' + '&appid=e9fae9a5139dedd5fb23d5fa0187c018')
    .then(results => {
     // console.log(results.json());
      return results.json();
    }).then(obj => {

      var id = obj["weather"][0]["id"];
      this.setState({ide: id});
      var activity = "12345";
      // var severe_weather = false;
      if (id >= 800) {
        activity = ' running, walks, sport activities, picnics ';
      }
      if ((id >= 600 && id <= 622) || (id >= 500 && id <= 531)  || (id >= 700 && id <= 781)) {
        activity = ' Netflix and chill, TV shows, board games ';
      }
      if (id == 300 || id == 301) {
        activity =
          ' Preferably indoor, but can manage to play football or cricket. ';
      }
     this.setState({data: [activity]})
      
     this.interval = setInterval(this.getInput, 5000);
    })
  }



  render() {
    return(
      <Paper style={styles.paper}>
        <div style={{...styles.header}}>Activity Recomendation</div>
          <div>
          {this.state.data.map(item =>(
            <div style={{...styles.body}}>{item}</div>
          ))}
        </div>
      </Paper>
    )
  }
}


export default BrowserUsage;