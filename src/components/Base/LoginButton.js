import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link } from "react-router-dom";
import { shadow } from "../../lib/styleUtil";
const BorderedButton = styled(Link)`
  margin-left: 16px;
  font-weight: 600;
  color: ${oc.blue[6]};
  border: 1px solid ${oc.blue[4]};
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s all;
  outline: 1px solid ${oc.blue[6]};

  &:hover {
    background: ${oc.blue[6]};
    color: white;
    ${shadow(1)}
  }

  &:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    border: 1px solid ${oc.blue[6]};

    transform: translateY(3px);
  }
`;

const LoginButton = () => (
  <BorderedButton to="/auth/login">로그인 / 가입</BorderedButton>
);

export default LoginButton;
