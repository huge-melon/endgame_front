import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddDB from "./component/addDB";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddDB />
      </div>
    );
  }
}

export default App;
