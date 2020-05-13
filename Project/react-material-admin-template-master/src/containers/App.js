import React, { PropTypes } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header";
//import LeftDrawer from '../components/LeftDrawer';
import withWidth, { LARGE, SMALL } from "material-ui/utils/withWidth";
import ThemeDefault from "../theme-default";

//const now = Date.now(); // Unix timestamp in milliseconds

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      isNight: false,
      time: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }
  componentDidMount() {
    window.createGoogleMap = this.createGoogleMap;
    this.loadscriptJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAGVEe14FpAXvLYF-d0BOxannqcSZrrCFw&libraries=places&callback=createGoogleMap"
    );

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
        var sunSet = data["sys"]["sunset"];
        var sunRise = data["sys"]["sunrise"];

        if (now > sunSet || now < sunRise) this.setState({ isNight: true });
        else this.setState({ isNight: false });
      });
  }

  loadscriptJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

  createGoogleMap() {
    var map = new window.google.maps.Map(
      window.document.getElementById("google-map"),
      {
        // var map = new window.google.maps.Map(this.refs.map.getDOMNode(), {
        center: { lat: 35.7827877, lng: -78.6996804 },
        zoom: 15,
        mapTypeId: "roadmap",
      }
    );
    this.goomap = map;
    const infoWindow = new window.google.maps.InfoWindow(); //An InfoWindow displays content (usually text or images) in a popup window above the map, at a given location.

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      //The Navigator.geolocation read-only property returns a Geolocation object that gives Web content access to the location of the device.
      //format: navigator.geolocation.getCurrentPosition(success[, error[, [options]])
      navigator.geolocation.getCurrentPosition(
        function (position) {
          //success : A callback function that takes a GeolocationPosition object as its sole input parameter
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here!");
          console.log(pos.lat);
          console.log(pos.lng);
          infoWindow.open(map);
          map.setCenter(pos);
        },
        function () {
          //error
          this.handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }

    // Create the search box and link it to the UI element.
    var input = document.getElementById("pac-input");
    var searchBox = new window.google.maps.places.SearchBox(input);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function () {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function (marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new window.google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new window.google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.goomap);
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      },
      container: {
        margin: "80px 20px 20px 15px",
        paddingLeft:
          navDrawerOpen && this.props.width !== SMALL
            ? paddingLeftDrawerOpen
            : 0,
      },
    };

    return (
      <div
        style={{
          backgroundColor: this.state.isNight ? "black" : "yellow",
          height: 1600,
        }}
      >
        <div>{this.state.time}</div>

        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div>
            <Header
              styles={styles.header}
              handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(
                this
              )}
            />

            <div style={styles.container}>{this.props.children}</div>
          </div>
        </MuiThemeProvider>

        <div
          style={{ width: 1400, height: 500, marginLeft: 50 }}
          id="google-map"
        />
        <input
          style={{ height: 30, marginTop: 10 }}
          id="pac-input"
          class="controls"
          type="text"
          placeholder="Search Box"
        />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number,
};

export default withWidth()(App);
