import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

const maps_key = process.env.REACT_APP_MAPS_KEY;
 
export class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={14}
        initialCenter={{
          lat: 43.4728813,
          lng: -80.5400242
        }}
        >

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: maps_key
})(MapContainer)