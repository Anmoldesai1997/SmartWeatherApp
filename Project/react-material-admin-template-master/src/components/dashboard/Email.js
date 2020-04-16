import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {white, red500, red600} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import emailjs from 'emailjs-com';




const styles = {
  paper: {
    backgroundColor: red500,
    height: 200
  },
  header: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: red600,
    padding: 10,
  },
  body: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: white,
    backgroundColor: red500,
    padding: 10,
  },
  box:{
    width: 150
  }
};


class Email extends Component {

 
  constructor(props){
    super(props);
    this.state = {reply_to: "ashrao94@gmail.com", message_html: "Weather data", tempValue: '281.3' , nameValue: "Raleigh", humidity: "81" , windspeed :"4.1" ,pressure :"1020", descValue : "Light Rain"};

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange2= this.handleChange2.bind(this);
    // this.changehumid=this.changehumid.bind(this);
    // this.changename=this.changename.bind(this);
    // this.changetemp=this.changetemp.bind(this);
    // this.changewind=this.changewind.bind(this);
    // this.changepressure = this.changepressure.bind(this);
    // this.changedesc = this.changedesc.bind(this);
  }
 
  render() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'Raleigh' + '&appid=fe8a90dcf3e80ad0b2e144756c4372f0')
    .then(results => {
      // console.log(results.json());
      return results.json();
    }).then(data => {
      var tValue = data["main"]["temp"];
      var nValue = data["name"];
      var humValue = data["main"]["humidity"];
      var wspeed = data["wind"]["speed"];
      var press= data["main"]["pressure"];
      var description=data["weather"][0]["description"];
      


      this.setState({tempValue: tValue, nameValue: nValue, humidity : humValue, windspeed : wspeed, pressure : press, descValue : description })});

    return(
      <form className="test-mailing">
      <Paper style={styles.paper}>
        <div>
        <div style={{...styles.header}}>Send an Email  </div>
        <div style={{...styles.body}}> Enter your mail ID </div>
        <input type="text" style={{marginLeft:12}} value= {this.state.reply_to} onChange={this.handleChange}/>
      	<input type="button" style={{marginLeft:12, marginTop:15}} value= "Submit" className="btn btn--submit" onClick={this.handleSubmit}/>
        </div>
      </Paper>
      </form>
    )
  }
  handleChange(event) {
    this.setState({reply_to: event.target.value});
  }
  handleChange2(event){
    this.setState({message_html: event.target.value});
  }
  handleSubmit () {
    console.log(this.state)
    var service_id = "default_service";
    var template_id = "template_68NzT7JN";
    var user_id = "user_4Fh5JfR0c0I2SYp7V1nQW";
    var template_params = {
      "reply_to": this.state.reply_to,
      "temp_value": this.state.tempValue,
      "name_value": this.state.nameValue,
      "humidity": this.state.humidity,
      "windspeed": this.state.windspeed,
      "pressure": this.state.pressure,
      "description" : this.state.descValue,
   }
   
    emailjs.send(service_id, template_id, template_params,user_id);
  }
  


}



export default Email;