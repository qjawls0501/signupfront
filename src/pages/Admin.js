import React, { Component } from "react";
import * as AuthActions from "redux/modules/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";

class Adminpage extends Component {
  render() {
    return <div></div>;
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Adminpage);
