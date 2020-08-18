import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import storage from "lib/storage";
import { UserCard } from "components/Card";
import classNames from "classnames";
import * as userActions from "redux/modules/user";
// @material-ui/icons
import styled from "styled-components";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import styles from "assets/HeaderLinkStyle";
import {
  MdExitToApp,
  MdHelp,
  MdMessage,
  MdPersonPin,
  MdSettingsApplications,
  MdInsertChart,
  MdEdit,
} from "react-icons/md";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
const ItemCenter = styled(ListGroupItem)`
  text-align: center;
`;
const CardProfile = styled(UserCard)`
  z-index: 0;
`;
class Mypage extends Component {
  // componentWillMount() {
  //   this.props.BaseActions.setHeaderVisibility(false);
  // }

  // // 페이지에서 벗어 날 때 다시 활성화
  // componentWillUnmount() {
  //   this.props.BaseActions.setHeaderVisibility(true);
  // }
  render() {
    return (
      <div>
        <CardProfile
          title={storage.get("loggedInfo").username}
          subtitle={storage.get("loggedInfo").email}
          text="Last updated 3 mins ago"
          className="border-light"
        >
          <ItemCenter tag="button" action className="border-light">
            <MdEdit /> Edit
          </ItemCenter>
          <ListGroup flush>
            <ItemCenter tag="button" action className="border-light">
              <MdInsertChart /> Stats
            </ItemCenter>
            <ItemCenter tag="button" action className="border-light">
              <MdMessage /> Messages
            </ItemCenter>
            <ItemCenter tag="button" action className="border-light">
              <MdSettingsApplications /> Settings
            </ItemCenter>
            <ItemCenter tag="button" action className="border-light">
              <MdHelp /> Help
            </ItemCenter>
            <ItemCenter tag="button" action className="border-light">
              <MdExitToApp /> Signout
            </ItemCenter>
          </ListGroup>
        </CardProfile>
        <br />
        {storage.get("loggedInfo").thumbnail}
      </div>
    );
  }
}
export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Mypage);
