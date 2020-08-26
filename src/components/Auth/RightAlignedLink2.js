import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link } from "react-router-dom";

const Aligner = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;
const StyledLink = styled(Link)`
  color: blue;
  &:hover {
    color: ${oc.blue[7]};
  }
`;

const RightAlignedLink2 = ({ to, children }) => (
  <Aligner>
    <StyledLink to={to}>{children}</StyledLink>
  </Aligner>
);

export default RightAlignedLink2;
