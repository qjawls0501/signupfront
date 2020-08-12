import React, { Component } from "react";
import Header, { LoginButton } from "components/Base";
import { connect } from "react-redux";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
import storage from "lib/storage";
import LogoutButton from "components/Base/LogoutButton";
import MypageButton from "components/Base/MypageButton";

class HeaderContainer extends Component {
  handleLogout = async () => {
    const { UserActions } = this.props;
    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }

    storage.remove("loggedInfo");
    window.location.href = "/"; // 홈페이지로 새로고침
  };

  render() {
    const { visible, user } = this.props;
    if (!visible) return null;

    return (
      <Header>
        {user.get("logged") ? (
          <div>
            {user.getIn(["loggedInfo", "username"])} 님
            <MypageButton>마이페이지</MypageButton>
            <LogoutButton onClick={this.handleLogout}>로그아웃</LogoutButton>
          </div>
        ) : (
          <LoginButton />
        )}
      </Header>
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(["header", "visible"]),
    user: state.user,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(HeaderContainer);
