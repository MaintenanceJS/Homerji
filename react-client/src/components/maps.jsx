import React, { Component } from 'react';
//import GoogleMapReact from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, GoogleMapReact} from 'google-maps-react';
 
// We have a bug with the map div style, check it on chrome
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Maps dont read but strings
      lat: String(this.props.lat), 
      lng: String(this.props.long)
    }
  }

  render() {
    return (
    <div id="mapBox">
      <Map style={{zIndex: 0}} google={this.props.google} style= {{marginBottom:'0', marginTop:'-65%', width: '85%', height: '30%'}}  initialCenter={this.state} zoom={14}>
        
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            
          </div>
        </InfoWindow>
      </Map>
    </div>
    );
  }
}

//API key
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCmsc0QpnUMshiGBiTrO4y68j6Jmoy41Xs')
})(MapContainer)

