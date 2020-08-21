import React from "react";
import { Route, Redirect } from "react-router-dom";

import storage from "lib/storage";

export const MypageRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      storage.get("loggedInfo") !== null ? (
        <Component {...props} />
      ) : (
        (window.location.href = "/")
      )
    }
  />
);
