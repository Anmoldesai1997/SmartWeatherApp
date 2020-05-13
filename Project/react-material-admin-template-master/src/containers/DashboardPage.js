import React, { Component } from "react";
import {
  cyan600,
  purple600,
  orange600,
  pink600,
} from "material-ui/styles/colors";
import Assessment from "material-ui/svg-icons/maps/map";
import Face from "material-ui/svg-icons/image/dehaze";
import ThumbUp from "material-ui/svg-icons/file/cloud";

import InfoBox from "../components/dashboard/InfoBox";
import NewOrders from "../components/dashboard/NewOrders";
//import ShoppingCart from 'material-ui/svg-icons/image/brightness-4';
import ShoppingCart from "material-ui/svg-icons/image/wb-sunny";
import BrowserUsage from "../components/dashboard/BrowserUsage";
import Future from "../components/dashboard/Future";
import Power from "../components/dashboard/Power";
import Email from "../components/dashboard/Email";
import Remote from "../components/dashboard/Remote";
//import temp from './download.png'
import Data from "../data";

//const DashboardPage = () => {
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "",
      humidity: "",
      city: "",
      wind: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        "Iselin" +
        "&appid=e9fae9a5139dedd5fb23d5fa0187c018"
    )
      .then((results) => {
        // console.log(results.json());
        return results.json();
      })
      .then((data) => {
        var tempValue = Math.round(data["main"]["temp"] - 273) + "°C";
        var windspeed = data["wind"]["speed"] + "m/s";
        var humidity = data["main"]["humidity"] + "%";

        var name = data["name"];
        this.setState({
          temp: tempValue,
          humidity: humidity,
          city: name,
          wind: windspeed,
        });
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox
              Icon={ShoppingCart}
              color={pink600}
              title="Temperature"
              value={this.state.temp}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox
              Icon={ThumbUp}
              color={cyan600}
              title="Humidity"
              value={this.state.humidity}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox
              Icon={Assessment}
              color={purple600}
              title="City"
              value={this.state.city}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <InfoBox
              Icon={Face}
              color={orange600}
              title="Wind"
              value={this.state.wind}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <NewOrders data={Data.dashBoardPage.newOrders} />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <Future data={Data.dashBoardPage.newOrders} />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <Email data={Data.dashBoardPage.newOrders} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
            <BrowserUsage data={Data.dashBoardPage.browserUsage} />
          </div>

          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
            <Remote data={Data.dashBoardPage.browserUsage} />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <Power data={Data.dashBoardPage.newOrders} />
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;

// import React from 'react';
// import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';
// import Assessment from 'material-ui/svg-icons/action/assessment';
// import Face from 'material-ui/svg-icons/action/face';
// import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
// import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
// import InfoBox from '../components/dashboard/InfoBox';
// import NewOrders from '../components/dashboard/NewOrders';
// import MonthlySales from '../components/dashboard/MonthlySales';
// import BrowserUsage from '../components/dashboard/BrowserUsage';
// import RecentlyProducts from '../components/dashboard/RecentlyProducts';
// import globalStyles from '../styles';
// import Data from '../data';

// const DashboardPage = () => {

//   return (
//     <div>
//       <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

//       <div className="row">

//         <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
//           <InfoBox Icon={ShoppingCart}
//                    color={pink600}
//                    title="Total Profit"
//                    value="1500k"
//           />
//         </div>

//         <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
//           <InfoBox Icon={ThumbUp}
//                    color={cyan600}
//                    title="Likes"
//                    value="4231"
//           />
//         </div>

//         <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
//           <InfoBox Icon={Assessment}
//                    color={purple600}
//                    title="Sales"
//                    value="460"
//           />
//         </div>

//         <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
//           <InfoBox Icon={Face}
//                    color={orange600}
//                    title="New Members"
//                    value="248"
//           />
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
//           <NewOrders data={Data.dashBoardPage.newOrders}/>
//         </div>

//         <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
//           <MonthlySales data={Data.dashBoardPage.monthlySales}/>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
//           <RecentlyProducts data={Data.dashBoardPage.recentProducts}/>
//         </div>

//         <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
//           <BrowserUsage data={Data.dashBoardPage.browserUsage}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
