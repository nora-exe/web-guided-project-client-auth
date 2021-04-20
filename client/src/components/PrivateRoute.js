import React from "react";
import { Route, Redirect } from "react-router-dom";

// render a Route component
// take in all of the same props as a regular Route comp
// check to see if the user is authenticated
// if they are, render the component that was passed in
// if not, redirect user to "/login"

function PrivateRoute(props) {
  return (
    <Route
      {...props}
      render={() => {
        if (window.localStorage.getItem("token")) {
          console.log("im here");
          return; // the component passed in through props
        } else {
          console.log("in the else");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
