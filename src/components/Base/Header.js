import React, { useState } from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow, media } from "../../lib/styleUtil";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import SearchInput from "components/Admin/SearchInput";
const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    color: "gray",
    height: 50,
    width: 250,
    marginTop: "16px",
    alignItems: "center",
    display: "flex",
  },
  con: {
    height: 50,
    padding: 0,
  },
  icon: {
    height: 50,
    marginRight: "24px",
  },
});
// 상단 고정, 그림자
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0px;
  width: 100%;
  ${shadow(2)}
`;
const Item = styled(MenuItem)`
  font-size: 25px;
  background-color: ${oc.white[1]};
  color: gray;
  border: 1px solid ${oc.white[1]};
  border-radius: 2px;
  margin-top: 16px;
  outline: 1px solid ${oc.white[6]};
  &:hover {
    background: ${oc.gray[2]};
    color: ${oc.blue[6]};
    text-decoration: none;
    ${shadow(2)}
  }

  &:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    border: 1px solid ${oc.white[6]};
    transform: translateY(3px);
  }
`;
const DrawerBtn = styled(Link)`
  font-size: 25px;
  background-color: ${oc.white[1]};
  color: gray;
  border: 1px solid ${oc.white[2]};
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s all;
  outline: 1px solid ${oc.white[6]};
  &:hover {
    background: ${oc.gray[2]};
    text-decoration: none;
    color: ${oc.blue[6]};
    ${shadow(2)};
  }

  &:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    border: 1px solid ${oc.white[6]};

    transform: translateY(3px);
  }
`;
const Menubar = styled(Button)`
  color: ${oc.blue[6]};
  border-radius: 0px;
  border: 2px solid ${oc.blue[6]};
  outline: none;
  margin-right: 4px;
  &:hover {
    background: ${oc.blue[6]};
    color: white;
    ${shadow(1)}
  }
  &:focus {
    outline: none;
  }
`;
// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;
  ${media.wide`
        width: 100%;
    `}

  ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const Logo = styled.div`
  font-size: 1.4rem;
  letter-spacing: 2px;
  color: ${oc.blue[7]};
  font-family: "Rajdhani";
`;

// 중간 여백
const Spacer = styled.div`
  flex-grow: 1;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
  height: 3px;
  background: linear-gradient(to right, ${oc.blue[6]}, ${oc.cyan[6]});
`;

const Header = ({ children }) => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <Positioner>
        <WhiteBackground>
          <HeaderContents>
            <Menubar onClick={toggleMenu}>
              <MenuIcon className={classes.menu} />
            </Menubar>
            <SearchInput />
            <Drawer open={toggle}>
              <DrawerBtn className={classes.root} to="/">
                <CallMadeIcon className={classes.icon} />
                Home
              </DrawerBtn>
              <DrawerBtn className={classes.root} to="/auth">
                <CallMadeIcon className={classes.icon} />
                Auth
              </DrawerBtn>
              <DrawerBtn className={classes.root} to="/class">
                <CallMadeIcon className={classes.icon} />
                Class
              </DrawerBtn>
              <DrawerBtn className={classes.root} to="/teacher">
                <CallMadeIcon className={classes.icon} />
                Teacher
              </DrawerBtn>
              <DrawerBtn className={classes.root} to="/qna">
                <CallMadeIcon className={classes.icon} />
                QnA
              </DrawerBtn>
              <DrawerBtn className={classes.root} to="/notice">
                <CallMadeIcon className={classes.icon} />
                notice
              </DrawerBtn>
              <Item className={classes.con} onClick={toggleMenu}>
                <CloseIcon className={classes.icon} />
                닫기
              </Item>
            </Drawer>
            <Logo>Calmsw</Logo>
            <Spacer />
            {children}
          </HeaderContents>
        </WhiteBackground>
        <GradientBorder />
      </Positioner>
    </div>
  );
};

export default Header;
