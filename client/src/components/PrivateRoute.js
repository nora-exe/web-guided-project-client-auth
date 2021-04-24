import React from 'react'
import { Route, Redirect } from 'react-router-dom';

// render a Route component
// take in same props as regular Route comp
// check if user is auth'd
    // if Y, render comp passed in
    // if N, redirect user to /login

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
        { ...rest }
        render={() => {
        if (window.localStorage.getItem('token')) {
            return <Component />;
        } else {
            return  <Redirect to="/login" />;
        }
    }}
    />
  );
};
export default PrivateRoute;