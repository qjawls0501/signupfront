import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";

class Mypage extends Component {
  // componentWillMount() {
  //   this.props.BaseActions.setHeaderVisibility(false);
  // }

  // // 페이지에서 벗어 날 때 다시 활성화
  // componentWillUnmount() {
  //   this.props.BaseActions.setHeaderVisibility(true);
  // }
  render() {
    return <div></div>;
  }
}
export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Mypage);
