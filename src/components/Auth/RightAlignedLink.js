import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link } from "react-router-dom";

const Aligner = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;
const StyledLink = styled(Link)`
  color: blue;
  &:hover {
    color: ${oc.blue[7]};
  }
`;
const StyledLink1 = styled(Link)`
  color: blue;
  &:hover {
    color: ${oc.blue[7]};
  }
`;
const RightAlignedLink = ({ to, children }) => (
  <Aligner>
    <StyledLink1 to="/passwordforget">비밀번호 찾기</StyledLink1>
    <StyledLink to={to}>{children}</StyledLink>
  </Aligner>
);

export default RightAlignedLink;
