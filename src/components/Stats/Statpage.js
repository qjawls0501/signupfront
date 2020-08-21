import React from "react";

import { getColor } from "utils/colors";
import { randomNum } from "utils/demos.js";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { Line, Pie, Doughnut, Bar, Radar, Polar } from "react-chartjs-2";

import Page from "components/Admin/Page";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: "나의 평균",
        backgroundColor: getColor("primary"),
        borderColor: getColor("primary"),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData,
      },
      {
        label: "전체 평균",
        backgroundColor: getColor("secondary"),
        borderColor: getColor("secondary"),
        borderWidth: 1,
        data: [
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
          randomNum(),
        ],
        ...moreData2,
      },
    ],
  };
};

const Statpage = () => {
  return (
    <Page title="Stats">
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>강의 수강율</CardHeader>
            <CardBody>
              <Bar data={genLineData()} />
            </CardBody>
          </Card>
        </Col>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>강의 수강율</CardHeader>
            <CardBody>
              <Bar data={genLineData()} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default Statpage;
