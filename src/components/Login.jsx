//import React from 'react';
//import DisplayProductData from './components/DisplayProductData';
import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    renderRegistrationForm: false,
  };
  async authenticate(event) {
    event.preventDefault();
    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password_confirmation.value,
    };

    let response = await axios.post(
      "http:/localhost:3000/api/auth/sign_up",
      credentials
    );
    const userData = {
      uid: response.headers.uid,
      client: response.headers.client,
      token_type: response.headers.token_type,
      expiry: response.headers.expiry,
    };
    localStorage.setItem("credentials", JSON.stringify(userData));
    localStorage.setItem("authenticated", true);
    this.props.toggleAuthenticateState();
    this.setState({ renderRegistrationForm: false });
  }

  render() {
    return (
      <>
        {this.state.renderRegistrationForm ? (
          <form onSubmit={(event) => this.authenticate(event)}>
            <input type="text" name="email" data-cy="email" />
            <input type="password" name="password" data-cy="password" />
            <input
              type="password"
              name="password_confirmation"
              data-cy="password_confirmation"
            />
            <input type="submit" value="Register" data-cy="register" />
          </form> //when we use form, it is advised to use preventDefault() function
        ) : (
          <button
            data-cy="register-cta"
            onClick={() => this.setState({ renderRegistrationForm: true })}
          >
            Register
          </button>
        )}
      </>
    );
  }
}

export default Login;