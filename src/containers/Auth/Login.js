import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError,
  Bar,
} from "components/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import * as baseActions from "redux/modules/base";
import * as footActions from "redux/modules/foot";
import storage from "lib/storage";
// import GoogleLogin from "react-google-login";
import queryString from "query-string";
class Login extends Component {
  handleChange = (e) => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: "login",
    });
  };
  componentDidMount() {
    const { location } = this.props;
    this.props.BaseActions.setHeaderVisibility(false);
    this.props.footActions.setFooterVisibility(false);
    const query = queryString.parse(location.search);
    if (query.expired !== undefined) {
      this.setError("세션에 만료되었습니다. 다시 로그인하세요.");
    }
  }
  componentWillMount() {
    this.props.BaseActions.setHeaderVisibility(false);
    this.props.footActions.setFooterVisibility(false);
  }

  // 페이지에서 벗어 날 때 다시 활성화
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("login");
  }
  setError = (message) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "login",
      message,
    });
    return false;
  };
  handleLocalLogin = async () => {
    const { form, AuthActions, UserActions, history } = this.props;
    const { email, password } = form.toJS();

    try {
      await AuthActions.localLogin({ email, password });
      const loggedInfo = this.props.result.toJS();

      // console.log(loggedInfo);
      history.push("/");
      // console.log(loggedInfo);
      storage.set("loggedInfo", loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      UserActions.setValidated(true);
      window.location.href = "/";
      // console.log(storage.get("loggedInfo").email);
    } catch (e) {
      console.log("a");
      this.setError("올바른 이메일 또는 비밀번호를 입력해 주세요.");
    }
  };
  // responseGoogle = (response) => {
  //   console.log(response);
  // };
  keyPress = (e) => {
    if (e.key === "Enter") {
      this.handleLocalLogin();
    }
  };
  render() {
    const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
    const { handleChange, handleLocalLogin, keyPress } = this;
    const { error } = this.props;
    return (
      <AuthContent>
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={handleChange}
          onKeyPress={keyPress}
        />
        {error && <AuthError>{error}</AuthError>}
        <AuthButton onClick={handleLocalLogin}>로그인하기</AuthButton>
        {/* <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        /> */}
        {/* {document.getElementById("googleButton")} */}
        <Bar></Bar>
        <RightAlignedLink to="/auth/register">회원가입 할래요</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  (state) => ({
    form: state.auth.getIn(["login", "form"]),
    error: state.auth.getIn(["login", "error"]),
    result: state.auth.get("result"),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    footActions: bindActionCreators(footActions, dispatch),
  })
)(Login);
