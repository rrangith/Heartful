import React, { Component } from 'react';
import MapContainer from './components/MapContainer.js';

const maps_key = process.env.REACT_APP_MAPS_KEY;

class App extends Component {

  render() {
    return (
      <MapContainer/>
    );
  }
}

export default App;
