import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home, Auth, Adminpage } from "pages";
import HeaderContainer from "./containers/Base/HeaderContainer";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/admin" component={Adminpage} />
      </div>
    );
  }
}

export default App;
