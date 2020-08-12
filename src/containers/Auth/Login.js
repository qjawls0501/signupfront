import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError,
} from "components/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
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
    const query = queryString.parse(location.search);
    if (query.expired !== undefined) {
      this.setError("세션에 만료되었습니다. 다시 로그인하세요.");
    }
  }
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
      UserActions.setLoggedInfo(loggedInfo);
      history.push("/");
      // console.log(loggedInfo);
      storage.set("loggedInfo", loggedInfo);
      // console.log(storage.get("loggedInfo").email);
    } catch (e) {
      console.log("a");
      this.setError("올바른 이메일 또는 비밀번호를 입력해 주세요.");
    }
  };
  responseGoogle = (response) => {
    console.log(response);
  };
  keyPress = (e) => {
    if (e.key === "Enter") {
      this.handleLocalLogin();
    }
  };
  render() {
    const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
    const { handleChange, responseGoogle, handleLocalLogin, keyPress } = this;
    const { error } = this.props;
    return (
      <AuthContent title="로그인">
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handleChange}
          onKeyPress={keyPress}
        />
        {error && <AuthError>{error}</AuthError>}
        <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
        {/* <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        /> */}
        {document.getElementById("googleButton")}
        <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
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
  })
)(Login);
