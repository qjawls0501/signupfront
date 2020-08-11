import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
} from "components/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import GoogleLogin from "react-google-login";

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
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("login");
  }
  responseGoogle = (response) => {
    console.log(response);
  };
  render() {
    const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
    const { handleChange, responseGoogle } = this;

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
        />
        <AuthButton>로그인</AuthButton>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        {document.getElementById("googleButton")}
        <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  (state) => ({
    form: state.auth.getIn(["login", "form"]),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(Login);
