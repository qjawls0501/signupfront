import React from "react";
import { Route } from "react-router-dom";

import storage from "lib/storage";

export const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      storage.get("loggedInfo") === null ? (
        <Component {...props} />
      ) : (
        (window.location.href = "/")
      )
    }
  />
);
