import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home, Auth, Adminpage, Mypage } from "pages";
import HeaderContainer from "containers/Base/HeaderContainer";
import Menubar from "components/Base";
import PageSpinner from "components/Admin/PageSpinner";
import storage from "lib/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";
import { PrivateRoute } from "components/PrivateRoute";
import { AuthRoute } from "components/AuthRoute";
import { MypageRoute } from "components/MypageRoute";
import GAListener from "components/Admin/GAListener";
import "./styles/reduction.scss";
class App extends Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo");
    // console.log(loggedInfo); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);

    try {
      await UserActions.checkStatus();
    } catch (e) {
      storage.remove("loggedInfo");
      window.location.href = "/auth/login?expired";
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <GAListener>
          <React.Suspense fallback={<PageSpinner />}>
            <Route exact path="/" component={Home} />
            <Route path="/auth" component={Auth} />
            <MypageRoute path="/mypage" component={Mypage} />
            <PrivateRoute path="/admin" component={Adminpage} />
          </React.Suspense>
        </GAListener>
      </div>
    );
  }
}

export default connect(null, (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch),
}))(App);
