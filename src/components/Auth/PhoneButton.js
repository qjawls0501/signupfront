import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow } from "../../lib/styleUtil";

const Wrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  background: ${oc.blue[6]};
  color: white;

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

const PhoneButton = ({ children, onClick }) => (
  <Wrapper onClick={onClick}>{children}</Wrapper>
);

export default PhoneButton;
