import React, { Component } from 'react';
import './App.css';


import MapContainer from './MapContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer getPosition={this.getPosition} sport="sumo" />
      </div>
    );
  }
}

export default App;
