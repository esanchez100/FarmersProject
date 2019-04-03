import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom"
import Login from "./Login"
import Homepage from "./Homepage"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Login} />
        <Route exact path={"/:userId(\\d+)"} component={Homepage} />
      </React.Fragment>
    );
  }
}

export default App;
