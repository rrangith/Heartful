/* global google */
import {Map, InfoWindow, Marker, GoogleApiWrapper, HeatmapLayer} from 'google-maps-react';
import React, { Component } from 'react';

const maps_key = process.env.REACT_APP_MAPS_KEY;
 
export class MapContainer extends Component {
  render() {
    return (
      <div>
        <Map 
        google={this.props.google} 
        zoom={14}
        initialCenter={{
          lat: 43.4728813,
          lng: -80.5400242
        }}
        >
          <HeatmapLayer
              data={[
                new google.maps.LatLng(43.4728813, -80.5400242)
              ]}
            />
        </Map>
        
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: maps_key
})(MapContainer)