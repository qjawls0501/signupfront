import React from "react";
import oc from "open-color";
import { Navbar, Nav, NavItem } from "reactstrap";
import styled from "styled-components";
import SourceLink from "components/Admin/SourceLink";
const StyledTag = styled.a`
  margin-right: 8px;
  color: ${oc.blue[6]};
  &:hover {
    color: ${oc.blue[9]};
  }
`;
const StyledNav = styled(Navbar)`
  border: 1px solid ${oc.blue[6]};
`;
const Footer = () => {
  return (
    <StyledNav>
      <Nav navbar>
        <NavItem>
          <StyledTag
            target="_blank"
            class="link"
            href="https://www.codingrobotlab.com"
          >
            회사소개
          </StyledTag>
          <StyledTag target="_blank" class="link" href="/home">
            이용약관
          </StyledTag>
          <StyledTag target="_blank" class="link" href="/home">
            개인정보 처리방침
          </StyledTag>
          <StyledTag
            target="_blank"
            class="link"
            href="mailto:contact@sweting.ai"
          >
            고객문의
          </StyledTag>
        </NavItem>
        <NavItem>법인상호명: (주)코딩로봇연구소 | 대표이사: 최영준 </NavItem>
        <NavItem>
          주소: 서울시 강남구 테헤란로55길 21, 401호 | 고객지원: 02-2039-9355
        </NavItem>
        <NavItem>
          통신 판매신고번호 제 2020-서울강남-02380 호 | 사업자등록번호
          439-87-00757
        </NavItem>
        <NavItem>Copyright(c) 2020. sweting.ai. All rights reserved</NavItem>
        <NavItem>
          <StyledTag
            target="_blank"
            class="link"
            href="https://www.facebook.com/codingrobotlab"
          >
            페이스북
          </StyledTag>
          <StyledTag target="_blank" class="link" href="http://calmsw.com">
            CALMS
          </StyledTag>
        </NavItem>
      </Nav>
    </StyledNav>
  );
};

export default Footer;
