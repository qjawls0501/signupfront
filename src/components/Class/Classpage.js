import React, { Component } from "react";
import bg1Image from "assets/img/bg/react.png";
import bg2Image from "assets/img/bg/vue.png";
import bg3Image from "assets/img/bg/javascript.png";
import bg4Image from "assets/img/bg/node.png";
import styled from "styled-components";
import { shadow } from "../../lib/styleUtil";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import * as footActions from "redux/modules/foot";
import * as BookActions from "redux/modules/book";
import * as UserActions from "redux/modules/user";
import oc from "open-color";
import storage from "lib/storage";
import {
  Card,
  CardBody,
  CardImg,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Row,
  Button,
} from "reactstrap";
const Container = styled.div`
  padding: 0px 10%;
`;
const StyleRow = styled(Row)`
  margin-top: 8px;
`;
const StyleCard = styled(Card)`
  margin: 8px 16px;
`;
const BodyCenter = styled(CardBody)`
  text-align: center;
`;
const TitleCenter = styled(CardTitle)`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;
const TextCenter = styled(CardText)`
  text-align: center;
  font-size: 16px;
`;
const StyleImg = styled(CardImg)`
  border: 1px solid ${oc.gray[3]};
`;
const StyleLink = styled(Button)`
  margin: 0px 0px 24px 16px;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  background: ${oc.blue[6]};
  color: white;
  border: none;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    background: ${oc.blue[5]};
    ${shadow(0)}
  }

  &:active {
    background: ${oc.blue[7]};
  }
`;

class Classpage extends Component {
  routeChange = () => {
    // window.location.href = "/classregister";
  };
  componentWillMount() {
    this.props.BaseActions.setHeaderVisibility(true);
    this.props.FootActions.setFooterVisibility(true);
  }
  componentDidMount() {
    this.props.BaseActions.setHeaderVisibility(true);
    this.props.FootActions.setFooterVisibility(true);
  }
  render() {
    const { routeChange } = this;
    var result = this.props.BookActions.checkClass();
    result.then(function (response) {
      const classtable = response.data;
      for (let i = 0; i < response.data.length; i++) {
        const classInfo = response.data[i];
        storage.set("classInfo" + i, classInfo);
      }
      console.log(classtable);
      console.log(response);
    });
    return (
      <Container>
        <StyleRow>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <StyleCard>
              <StyleImg top src={bg1Image} height="250px" />
              <CardBody>
                <TitleCenter>{storage.get("classInfo" + 0).title}</TitleCenter>
                <TextCenter>{storage.get("classInfo" + 0).tags}</TextCenter>
              </CardBody>
              <BodyCenter>
                <CardLink tag="a" href="classinfo">
                  More
                </CardLink>
              </BodyCenter>
            </StyleCard>
          </Col>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <StyleCard>
              <StyleImg top src={bg1Image} height="250px" />
              <CardBody>
                <TitleCenter>{storage.get("classInfo" + 1).title}</TitleCenter>
                <TextCenter>{storage.get("classInfo" + 1).tags}</TextCenter>
              </CardBody>
              {/* <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
              </ListGroup> */}
              <BodyCenter>
                <CardLink tag="a" href="classinfo">
                  More
                </CardLink>
              </BodyCenter>
            </StyleCard>
          </Col>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <StyleCard>
              <StyleImg top src={bg1Image} height="250px" />
              <CardBody>
                <TitleCenter>{storage.get("classInfo" + 2).title}</TitleCenter>
                <TextCenter>{storage.get("classInfo" + 2).tags}</TextCenter>
              </CardBody>
              {/* <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
              </ListGroup> */}
              <BodyCenter>
                <CardLink tag="a" href="classinfo">
                  More
                </CardLink>
              </BodyCenter>
            </StyleCard>
          </Col>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <StyleCard>
              <StyleImg top src={bg1Image} height="250px" />
              <CardBody>
                <TitleCenter>{storage.get("classInfo" + 3).title}</TitleCenter>
                <TextCenter>{storage.get("classInfo" + 3).tags}</TextCenter>
              </CardBody>
              {/* <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
              </ListGroup> */}
              <BodyCenter>
                <CardLink tag="a" href="classinfo">
                  More
                </CardLink>
              </BodyCenter>
            </StyleCard>
          </Col>
        </StyleRow>
        <StyleLink onClick={routeChange}>강의 등록하기</StyleLink>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    form: state.book.getIn(["create", "form"]),
    error: state.book.getIn(["create", "error"]),
    exists: state.book.getIn(["create", "exists"]),
    result: state.book.get("result"),
  }),
  (dispatch) => ({
    BookActions: bindActionCreators(BookActions, dispatch),
    UserActions: bindActionCreators(UserActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    FootActions: bindActionCreators(footActions, dispatch),
  })
)(Classpage);
