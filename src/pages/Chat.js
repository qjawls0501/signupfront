import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import * as FootActions from "redux/modules/foot";
import JoinRoom from "components/ChatComponent/JoinRoom/JoinRoom";
class Chat extends Component {
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
    return <JoinRoom></JoinRoom>;
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    FootActions: bindActionCreators(FootActions, dispatch),
  })
)(Chat);
