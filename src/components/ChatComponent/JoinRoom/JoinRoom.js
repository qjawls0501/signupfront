import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./JoinRoom.css";

// Material-UI 적용하기
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import Image from "@material-ui/core/Image";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import storage from "lib/storage";
import styled from "styled-components";
const StyledButton = styled(Button)`
  margin-bottom: 16px;
`;

const JoinRoom = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const routechange = () => {
    window.location.href = "/";
  };
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="joinFormContainer" component={Paper}>
          <div className="joinFormBox">
            <div className="joinTitle">
              <Typography color="primary" component="h1" variant="h5">
                CominChat
              </Typography>
            </div>
            <form className="joinForm" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="room"
                label="room"
                type="room"
                // size="large"
                id="room"
                autoComplete="current-password"
                onChange={(e) => setRoom(e.target.value)}
                onKeyPress={(e) => setName(storage.get("loggedInfo").username)}
              />
              <div className="buttonBox mt-10">
                <Link
                  className="joinButtonLink"
                  onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                  to={`/chat/chatroom?name=${name}&room=${room}`}
                >
                  <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="joinButton mt-20"
                  >
                    채팅방 들어가기
                  </StyledButton>
                </Link>
                <Link className="joinButtonLink">
                  <StyledButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="joinButton mt-20"
                    onClick={routechange}
                  >
                    Home으로 돌아가기
                  </StyledButton>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
