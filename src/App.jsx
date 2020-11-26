import React, { Component } from "react";
import DisplayProductData from "./components/DisplayProductData";
import Login from "./components/Login";

class App extends Component {

  state = {
    authenticated: false
  }
  toggleAuthenticatedState() {
    this.setState({authenticated: !this.state.authenticated })
  }
  render() {
    return (
      <>
      <Login toggleAuthenticatedState={() => this.toggleAuthenticatedState()}/>
      <h1>Slowfood</h1>
      <DisplayProductData />
        
      </>
    );
  }
}

export default App;
