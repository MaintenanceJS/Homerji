import React, { Component } from 'react';
//import GoogleMapReact from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, GoogleMapReact} from 'google-maps-react';
 
// We have a bug with the map div style, check it on chrome
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Maps dont read except for strings
      lat: String(this.props.lat), 
      lng: String(this.props.long)
    }
  }

  render() {
    if (!this.props.signin) {
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
    )} else {
      return (
      <div id="mapBox">
        <Map style={{zIndex: 0}} google={this.props.google} style= {{width: '85%', height: '30%'}}  initialCenter={this.state} zoom={14}>
          
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              
            </div>
          </InfoWindow>
        </Map>
      </div>
      )
    };
  }
}

//API key
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBvfa5G7e7vtSMtbgYuL5IEjNMRWNDH20k')
})(MapContainer)

