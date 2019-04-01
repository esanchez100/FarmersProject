import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom"
import Login from "./Login"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Login} />
        <Route exact path="/homepage" component={Homepage} />
      </React.Fragment>
    );
  }
}

export default App;
