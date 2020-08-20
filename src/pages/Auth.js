import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import * as FootActions from "redux/modules/foot";
import { AuthWrapper } from "components/Auth";
import { Route } from "react-router-dom";
import { Login, Register } from "containers/Auth";
import { AuthRoute } from "components/AuthRoute";
import { bind } from "file-loader";
class Auth extends Component {
  // 페이지에 진입 할 때 헤더를 비활성화
  componentWillMount() {
    this.props.BaseActions.setHeaderVisibility(false);
    this.props.FootActions.setFooterVisibility(false);
  }

  // 페이지에서 벗어 날 때 다시 활성화
  componentWillUnmount() {
    this.props.BaseActions.setHeaderVisibility(true);
    this.props.FootActions.setFooterVisibility(true);
  }

  render() {
    return (
      <AuthWrapper>
        <AuthRoute path="/auth/login" component={Login} />
        <AuthRoute path="/auth/register" component={Register} />
      </AuthWrapper>
    );
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    FootActions: bindActionCreators(FootActions, dispatch),
  })
)(Auth);
