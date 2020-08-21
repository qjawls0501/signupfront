import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import CardprofilePage from "components/Profile/CardprofilePage";

const Mypage = ({ Component }) => {
  return (
    <div>
      <CardprofilePage></CardprofilePage>
    </div>
  );
};
export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Mypage);
