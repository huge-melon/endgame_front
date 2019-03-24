import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./views/homepage";
import MyHeader from "./component/header";
import CleanPage from "./views/cleanpage";
import { Route } from 'react-router-dom';
import StoragePage from "./views/storagepage";

class App extends Component {
  render() {
    return (
      <div className="App">
          <MyHeader/>
          <main>
              <Route path="/" exact component={HomePage} />
              <Route path="/dataclean" component={CleanPage} />
              <Route path="/dataexport" component={StoragePage} />
          </main>
      </div>
    );
  }
}

export default App;

