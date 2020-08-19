import React from "react";
import classNames from "classnames";
import storage from "lib/storage";
import { UserCard } from "components/Card";
import { useHistory } from "react-router-dom";
import { shadow, media } from "../../lib/styleUtil";
import styled from "styled-components";
import oc from "open-color";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";

import styles from "assets/HeaderLinkStyle";
import {
  MdExitToApp,
  MdHelp,
  MdMessage,
  MdPersonPin,
  MdSettingsApplications,
  MdInsertChart,
} from "react-icons/md";
import { ListGroup, ListGroupItem } from "reactstrap";
const Stylebtn = styled(Button)`
  color: ${oc.blue[6]};
  // padding: 16px;
  border-radius: 4px;
  margin: 0px 2px;
  border: 2px solid ${oc.blue[6]};
  outline: none;
  &:hover {
    background: ${oc.blue[6]};
    color: white;
    ${shadow(1)}
  }
  &:focus {
    outline: none;
  }
`;
const StylePopper = styled(Poppers)`
  left: 0px;
  top: 0px;
  z-index: 1;
  outline: none;
  margin-top: 7px;
  border: none;
  margin-right: 8px;
`;

const useStyles = makeStyles(styles);

const AdminNavbarLinks = () => {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
      setOpenProfile(null);
    }
  };

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
      setOpenNotification(null);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const history = useHistory();
  const routeChange = () => {
    history.push("/mypage");
    setOpenProfile(null);
  };
  const routeChange1 = () => {
    history.push("/help");
    setOpenProfile(null);
  };
  const routeChange2 = () => {
    history.push("/stats");
    setOpenProfile(null);
  };
  const handleLogout = async (props) => {
    const { UserActions } = props;
    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }

    storage.remove("loggedInfo");
    window.location.href = "/"; // 홈페이지로 새로고침
  };
  return (
    <div>
      <div className={classes.manager}>
        <Stylebtn
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
        </Stylebtn>
        <StylePopper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <ListGroup flush>
                    <ListGroupItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </ListGroupItem>
                    <ListGroupItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </ListGroupItem>
                    <ListGroupItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You{"'"}re now friend with Andrew
                    </ListGroupItem>
                    <ListGroupItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </ListGroupItem>
                    <ListGroupItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </ListGroupItem>
                  </ListGroup>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </StylePopper>
      </div>
      <div className={classes.manager}>
        <Stylebtn
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
        </Stylebtn>
        <StylePopper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <UserCard
                    title={storage.get("loggedInfo").username}
                    subtitle={storage.get("loggedInfo").email}
                    text="Last updated 3 mins ago"
                    className="border-light"
                  >
                    <ListGroup flush>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                        onClick={routeChange}
                      >
                        <MdPersonPin /> Profile
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                        onClick={routeChange2}
                      >
                        <MdInsertChart /> Stats
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                        onClick={handleCloseProfile}
                      >
                        <MdMessage /> Messages
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                        onClick={handleCloseProfile}
                      >
                        <MdSettingsApplications /> Settings
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                        onClick={routeChange1}
                      >
                        <MdHelp /> Help
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                        onClick={handleLogout}
                      >
                        <MdExitToApp /> Signout
                      </ListGroupItem>
                    </ListGroup>
                  </UserCard>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </StylePopper>
      </div>
    </div>
  );
};
export default connect(
  (state) => ({
    visible: state.base.getIn(["header", "visible"]),
    user: state.user,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(AdminNavbarLinks);
