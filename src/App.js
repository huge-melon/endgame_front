import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddDB from "./component/addDB";
import HomePage from "./views/homepage"
class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage/>
        {/*<AddDB />*/}
      </div>
    );
  }
}

export default App;

