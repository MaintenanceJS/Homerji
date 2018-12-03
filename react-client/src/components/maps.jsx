import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
  render() {
    return (
      <Map style= {{width: '500px', height: '500px'}} google={this.props.google} initialCenter={{
            lat: 31.986586499999998,
            lng: 35.8378334
          }} zoom={14}>
 
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
  apiKey: ('AIzaSyDEKhrwickTOSkRZSDDZ9--cNVJcJUqCE0')
})(MapContainer)