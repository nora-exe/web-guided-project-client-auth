import React from 'react';
import axios from 'axios';
import { resetWarningCache } from 'prop-types';
import axiosWithAuth from '../utils/axiosWithAuth';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = (e) => {
    e.preventDefault();
    //*💡 make POST request with username and password as the data body
    //axios.post("http://localhost:5000/api/login", payload) *MAKE SURE THIS GOES TO SERVER ENDPOINT NOT CLIENT you dummy
    //.then(res => {
    //   res.data.payload
    //   store the token in localStorage (Sessions, cookies, etc)
    //   navigate to landing/profile/dashboard/etc
    // })
    //.catch((err) => console.log(err))  
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((res) => {
        // set token to local storage
        window.localStorage.setItem('token', JSON.stringify(res.data.payload))
        // navigate to landing/profile/dashboard/etc
        this.props.history.push('/protected')
        // syntax for function component: import useHistory hook and use that to navigate
        })
      .catch((err) => console.log(err));
  };

    render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;