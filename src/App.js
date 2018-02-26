import React, { Component } from 'react';

import './App.css';
import NetflixList from './components/NetflixList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NetflixList />
      </div>
    );
  }
}

export default App;
