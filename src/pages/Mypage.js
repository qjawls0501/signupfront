import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import { useHistory } from "react-router-dom";
import storage from "lib/storage";
import { UserCard } from "components/Card";
import oc from "open-color";
import classNames from "classnames";
import * as userActions from "redux/modules/user";
// @material-ui/icons
import styled from "styled-components";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import styles from "assets/HeaderLinkStyle";
import reactimg from "assets/img/bg/react.png";
import vueimg from "assets/img/bg/vue.png";
import {
  MdExitToApp,
  MdHelp,
  MdMessage,
  MdPersonPin,
  MdSettingsApplications,
  MdInsertChart,
  MdEdit,
} from "react-icons/md";
import {
  ListGroup,
  CardTitle,
  CardBody,
  CardImg,
  Card,
  Col,
  Row,
  CardText,
  ListGroupItem,
  Button,
} from "reactstrap";
const ItemCenter = styled(ListGroupItem)`
  text-align: center;
`;
const CardProfile = styled(UserCard)`
  z-index: 0;
`;
const TextArea = styled(ListGroupItem)`
  color: ${oc.blue[6]};
  border: none;
  padding-top: 16px;
`;
const TextInCard = styled(CardText)`
  color: black;
  text-align: left;
`;
const TitleInCard = styled(CardTitle)`
  color: black;
`;

const Mypage = ({ Component }) => {
  // componentWillMount() {
  //   this.props.BaseActions.setHeaderVisibility(false);
  // }

  // // 페이지에서 벗어 날 때 다시 활성화
  // componentWillUnmount() {
  //   this.props.BaseActions.setHeaderVisibility(true);
  // }

  const history = useHistory();
  const routeChange = () => {
    history.push("/edit");
  };
  const routeChange1 = () => {
    history.push("/stats");
  };
  const routeChange2 = () => {
    history.push("/settings");
  };
  const handleLogout = async (props) => {
    const { UserActions } = props;
    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }

    storage.remove("loggedInfo");
    window.location.href = "/"; // 홈페이지로 새로고침
  };
  return (
    <div>
      <CardProfile
        title={storage.get("loggedInfo").username}
        subtitle={storage.get("loggedInfo").email}
        text="Last updated 3 mins ago"
        className="border-light"
      >
        <ItemCenter
          tag="button"
          onClick={routeChange}
          action
          className="border-light"
        >
          <MdEdit /> Edit
        </ItemCenter>
        <ListGroup flush>
          <ItemCenter
            tag="button"
            onClick={routeChange1}
            action
            className="border-light"
          >
            <MdInsertChart /> Stats
          </ItemCenter>
          <ItemCenter tag="button" action className="border-light">
            <MdMessage /> Messages
          </ItemCenter>
          <ItemCenter
            tag="button"
            onClick={routeChange2}
            action
            className="border-light"
          >
            <MdSettingsApplications /> Settings
          </ItemCenter>
          <ItemCenter
            tag="button"
            onClick={handleLogout}
            action
            className="border-light"
          >
            <MdExitToApp /> Signout
          </ItemCenter>
        </ListGroup>
        <TextArea>강의정보</TextArea>
        <ItemCenter>
          <Row>
            <Col md={6} sm={6} xs={12} className="mb-3">
              <Card>
                <CardImg top src={reactimg} height="282px" />
                <CardBody>
                  <TitleInCard>React</TitleInCard>
                  <TextInCard>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </TextInCard>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} sm={6} xs={12} className="mb-3">
              <Card>
                <CardImg top src={vueimg} height="282px" />
                <CardBody>
                  <TitleInCard>Vue</TitleInCard>
                  <TextInCard>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </TextInCard>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ItemCenter>
      </CardProfile>
      {/* {storage.get("loggedInfo").username}
      <br />
      {storage.get("loggedInfo").email}
      <br />
      {storage.get("loggedInfo").thumbnail} */}
    </div>
  );
};
export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Mypage);
