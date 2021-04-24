import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import GasPrices from './components/GasPrices';

import PrivateRoute from './components/PrivateRoute';

import axios from 'axios';

function App() {
  const logout = () => {
    window.localStorage.removeItem('token');
    //TODO req to /api/logout to let server know logged out
  };


  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={GasPrices} />
          <Route path="/login" component={Login} />
          <Route render={(props) => <Login { ...props } />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
