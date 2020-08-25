import React, { Component } from "react";
import bg1Image from "assets/img/bg/react.png";
import bg2Image from "assets/img/bg/vue.png";
import bg3Image from "assets/img/bg/javascript.png";
import bg4Image from "assets/img/bg/node.png";
import styled from "styled-components";
import oc from "open-color";
import {
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { AuthButton } from "components/Auth";
import { Link } from "react-router-dom";
const StyleRow = styled(Row)`
  margin-top: 8px;
`;
const TitleCenter = styled(CardTitle)`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;
const StyleImg = styled(CardImg)`
  border: 1px solid ${oc.gray[3]};
`;
class Classpage extends Component {
  render() {
    return (
      <div>
        <StyleRow>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <Card>
              <StyleImg top src={bg1Image} height="300px" />
              <CardBody>
                <TitleCenter>React</TitleCenter>
                <CardText>
                  This example shows how to use card with list group{" "}
                </CardText>
              </CardBody>
              {/* <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
              </ListGroup> */}
              <CardBody>
                <CardLink tag="a" href="classinfo">
                  More
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <Card>
              <StyleImg top src={bg2Image} height="300px" />
              <CardBody>
                <TitleCenter>Vue</TitleCenter>
                <CardText>
                  This example shows how to use card with list group{" "}
                </CardText>
              </CardBody>
              {/* <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
              </ListGroup> */}
              <CardBody>
                <CardLink tag="a" href="#">
                  More
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <Card>
              <StyleImg top src={bg3Image} height="300px" />
              <CardBody>
                <TitleCenter>Javascript</TitleCenter>
                <CardText>
                  This example shows how to use card with list group{" "}
                </CardText>
              </CardBody>
              {/* <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
              </ListGroup> */}
              <CardBody>
                <CardLink tag="a" href="classinfo">
                  More
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} sm={6} xs={12} className="mb-3">
            <Card>
              <StyleImg top src={bg4Image} height="300px" />
              <CardBody>
                <TitleCenter>node.js</TitleCenter>
                <CardText>
                  This example shows how to use card with list group{" "}
                </CardText>
              </CardBody>
              {/* <ListGroup flush>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
              </ListGroup> */}
              <CardBody>
                <CardLink tag="a" href="#">
                  More
                </CardLink>
              </CardBody>
            </Card>
          </Col>
        </StyleRow>
        <Link to="/classregister">강의 등록하기</Link>
      </div>
    );
  }
}

export default Classpage;
