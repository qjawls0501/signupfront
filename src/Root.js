import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import HeaderContainer from "containers/Base/HeaderContainer";
import FooterContainer from "containers/Base/FooterContainer";
const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <HeaderContainer />
        <Route path="/" component={App} />
        <FooterContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
