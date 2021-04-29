# Notes

## Key Terminology
* 📝 ...rest - [A means to get capture the remaining values within a javascript array or object easily.](https://medium.com/wesionary-team/spread-and-rest-operator-in-javascript-db3f15cec185)
* 📝 Redirect Route - [A redirect method used through react-router.](https://medium.com/wesionary-team/spread-and-rest-operator-in-javascript-db3f15cec185)
* 📝 this.history redirect - [A redirect method used through Route props.](https://medium.com/wesionary-team/spread-and-rest-operator-in-javascript-db3f15cec185)
* 📝 window.location redirect - [A redirect method used through the windows location object.](https://medium.com/wesionary-team/spread-and-rest-operator-in-javascript-db3f15cec185)
* 📝 Route - [A react router component that allows programmers to connect a component to a url path](https://medium.com/wesionary-team/spread-and-rest-operator-in-javascript-db3f15cec185)
* 📝 axios.create - [A means to create a stub of an axios call with preset values attached](https://medium.com/wesionary-team/spread-and-rest-operator-in-javascript-db3f15cec185)
* 📝 jwt tokens - [The current web standard for encrypted authentication tokens](https://medium.com/wesionary-team/spread-and-rest-operator-in-javascript-db3f15cec185)

## Key Concepts
* 📝 Authentication - [The process for identifying user identity.](https://www.youtube.com/watch?v=woNZJMSNbuo)
* 📝 Authorization - [The process for identifying user permissions.](https://www.youtube.com/watch?v=I0poT4UxFxE)
* 📝 http headers - [Additional data added to http requests for interperation within your backend code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

## handle authentication with tokens in a React app
Modern web services dealing with JSON data often use Jason Web Tokens (JWT)s - strings stored on client-side using local or session storage
* Server tells client it issued token, reads token, makes decisions for data transfer w client's permission
* Example: login endpoint, takes payload `username` and `password`. If the credentials are known, the server responds with a fresh JWT. From then on, it's the application's responsibility to add an `Authorization: <token>` header to every request, to be allowed access to protected resources that require authentication.

```
import axios from 'axios';

export const axiosWithAuth =() => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token,
        },
    });
};```



* Whenever the application needs to exchange data with a protected endpoint, it imports this module, instead of `import axios from "axios";` 
* Alternative: `Authorization: `Bearer ${token}`,`
* Save token to local storage so `axiosWithAuth` can grab it for other calls that require Auth header

```const login = () => {
  axios.post('endpoint/here', userCredentials)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      props.history.push('/dashboard');
    }
}
```

AJAX req to endpoint using `axiosWithAuth`:

```
 import { axiosWithAuth } from '../../path/to/axiosAuth.js';
  // etc
  axiosWithAuth()
    .get('endpoint/path/here')
    .then(data => /* do something with the data */);
```

## implement protected routes using an authentication token and Redirect
"Protected" routes - routes that should only render with authentication.

```javascript
function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
    </div>
  );
}
```
Anyone can click on the "Public Page" link, but if they click on the "Protected Page" link without authorization, they will be routed to the login page instead. Add a <PrivateRoute /> route:

```javascript
<Route path="/public" component={Public}/>
<Route path="/login" component={Login}/>
<PrivateRoute path='/protected' component={Protected} />
```

Build it out:

```javascript
// Requirement 1.
// It has the same API as `<Route />`
const PrivateRoute = ({ component: Component, ...rest }) => (
    // Requirement 2.
    // It renders a `<Route />` and passes all the props through to it.
  <Route
    {...rest}
    render={
        // Requirement 3.
        // It checks if the user is authenticated
        props =>
      localStorage.getItem("token") ? (
        // If they are, it renders the "component" prop.
        <Component {...props} />
      ) : (
        // If not, it redirects the user to /login.
        <Redirect to="/login" />
      )
    }
  />
);
```

A login page takes in a user's credentials, calls login endpoint with `POST` req, then redirects user to protected route when login API call returns.

```javascript
import React, { useState } from 'react';
import { axiosWithAuth } from '../path/to/module';

const Login = (props) => {
 const [credentials, setCredentials] = useState({});

  const login = e => {
    e.preventDefault();
    axiosWithAuth().post('login/endpoint', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this.props.history.push('/');
      })
  }

  const handleChange = e => {
      setCredentials: {
        ...credentials,
        [e.target.name]: e.target.value,
      }
  }

    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    )
}

export default Login;
```
## GP
🎥https://www.youtube.com/watch?v=4lyqwR67TQs
* LOGIN ⚙ user/pass sent login request ➡ server search db for user/pass ➡ if found, generate/store/return token ➡ receive/store token
* REQUEST ⚙ user sends request body/token ➡ server searches for active token ➡ if found, process/return request  ➡ client receives/processes req
* LOGOUT ⚙ user del local token, sends token to server ➡ server deletes token 

## MP
🎥https://www.loom.com/share/c669f5e7831741aaac192d50830735c0

⚙ https://github.com/nora-exe/web-module-project-client-auth?organization=nora-exe&organization=nora-exe