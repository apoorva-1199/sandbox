import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";

class App extends Component {
  render() {
    return (
      <Router>
        <AppRoutes />
      </Router>
    );
  }
}


export default App;
