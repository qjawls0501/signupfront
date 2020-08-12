import React from "react";
import { Route, Redirect } from "react-router-dom";

import storage from "lib/storage";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      storage.get("loggedInfo").username === "admin" &&
      storage.get("loggedInfo").email === "admin@coroyun.com" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/auth/login", state: { from: props.location } }}
        />
      )
    }
  />
);
