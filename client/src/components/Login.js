import React from "react";
import axios from "axios";
import { axiosWithAuth} from '../utils/axiosWithAuth'

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    // make a POST request with the username and password as the data body
    axiosWithAuth()
      .post("http://localhost:5000/api/login", this.state.credentials)
      .then((res) => {
        // res.data.payload
        // store the token in localStorage (sessions, cookies)
        window.localStorage.setItem("token", JSON.stringify(res.data.payload));
        // navigate to some landing/profile/dashboard page
        this.props.history.push("/protected");
        // function component => import the useHistory hook and use that to navigate
      })import { axiosWithAuth } from '../utils/axiosWithAuth';

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
