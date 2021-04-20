import React from "react";
import { Route } from "react-router-dom";

// render a Route component
// take in all of the same props as a regular Route comp
// check to see if

function PrivateRoute(props) {
  return <Route {...props} />;
}

export default PrivateRoute;
