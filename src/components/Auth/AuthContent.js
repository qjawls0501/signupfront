import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${oc.blue[9]};
  margin-top: 0px;
  margin-bottom: 32px;
  text-align: center;
`;

const AuthContent = ({ title, children }) => (
  <div>
    <Title>
      코더들의 고민을 해결해주는 <br />
      코드 라이브 페어링 에디터
    </Title>
    {children}
  </div>
);

export default AuthContent;
