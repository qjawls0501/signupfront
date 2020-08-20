import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link } from "react-router-dom";

const Aligner = styled.div`
  height: 1px;
  border: 1px solid ${oc.gray[3]};
  margin: 24px 0px;
`;
const Bar = () => <Aligner></Aligner>;

export default Bar;
