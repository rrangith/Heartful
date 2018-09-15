/* global google */
import {withGoogleMap, GoogleMap } from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import React, { Component } from 'react';

const maps_key = process.env.REACT_APP_MAPS_KEY;
 
class MapContainer extends Component {
  render() {
    const GoogleMapContainer = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {{
          lat: 43.4728813,
          lng: -80.5400242
        }}
        defaultZoom = { 17 }
      >
        <HeatmapLayer
            data={[
                new google.maps.LatLng(43.4728813, -80.5400242),
                new google.maps.LatLng(43.4729813, -80.5400242),
                new google.maps.LatLng(43.4727813, -80.5400242),
                new google.maps.LatLng(43.4727313, -80.5400242)
            ]}
            options={{
              radius:35
            }}
        />
      </GoogleMap>
   ));
    return (
      <div>
        <GoogleMapContainer
          containerElement={ <div style={{ height: `100vh`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    );
  }
}

export default MapContainer;