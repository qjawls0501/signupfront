import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow } from "../../lib/styleUtil";
import { Link } from "react-router-dom";

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
  width: 500px;
  ${shadow(4)};
`;

// 로고
const LogoWrapper = styled.div`
  color: ${oc.blue[6]};
  padding-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(Link)`
  color: blue;
  font-family: "Rajdhani";
  font-size: 2.4rem;
  margin-bottom: 16px;
  font-weight: bold;
  text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
  background: white;
  padding: 0rem 2rem 2rem 2rem;
  height: auto;
`;

const AuthWrapper = ({ children }) => (
  <Positioner>
    <ShadowedBox>
      <LogoWrapper>
        <Logo to="/">COMIN</Logo>
      </LogoWrapper>
      <Contents>{children}</Contents>
    </ShadowedBox>
  </Positioner>
);

export default AuthWrapper;
