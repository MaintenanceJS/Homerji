import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, GoogleMapReact} from 'google-maps-react';
 
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

      lat: String(this.props.lat),
      lng: String(this.props.long)
    }
  }
  render() {
    
    return (

      <Map  google={this.props.google} style= {{width: '300px', height: '300px'}}  initialCenter={this.state} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCmsc0QpnUMshiGBiTrO4y68j6Jmoy41Xs')
})(MapContainer)