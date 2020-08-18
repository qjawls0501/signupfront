import React from "react";
import PropTypes from "utils/propTypes";

import classNames from "classnames";
import image1 from "assets/img/users/100_1.jpg";
import { Card, CardTitle, CardSubtitle, CardText, CardBody } from "reactstrap";
import storage from "lib/storage";
import Avatar from "../Admin/Avatar";
import { styled } from "@material-ui/core";
const StyledCard = styled(CardBody)`
  min-height: 500px;
`;
const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  children,
  className,
  ...restProps
}) => {
  const classes = classNames("bg-gradient-theme", className);

  return (
    <Card inverse className={classes} {...restProps}>
      <StyledCard className="d-flex justify-content-center align-items-center flex-column">
        <Avatar
          // src={storage.get("loggedInfo").thumbnail}
          src={image1}
          size={avatarSize}
          className="mb-2"
        />
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText>
          <small>{text}</small>
        </CardText>
      </StyledCard>
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  avatarSize: 80,
};

export default UserCard;
