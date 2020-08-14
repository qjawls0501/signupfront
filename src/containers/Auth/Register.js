import React, { Component, useState } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  PhoneButton,
  AuthError,
} from "components/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActions from "redux/modules/auth";
import { isEmail, isLength } from "validator";
import debounce from "lodash/debounce";
import storage from "lib/storage";
import * as UserActions from "redux/modules/user";
import { valid } from "semver";
class Register extends Component {
  setError = (message) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "register",
      message,
    });
  };
  validate = {
    email: (value) => {
      if (!isEmail(value)) {
        this.setError("잘못된 이메일 형식 입니다.");
        return false;
      }
      return true;
    },
    username: (value) => {
      if (!isLength(value, { min: 2 })) {
        this.setError("이름은 최소 2글자 이상으로 이루어져야 합니다.");
        return false;
      }
      this.setError(null);
      return true;
    },
    password: (value) => {
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+|<>?:{}]).*$/;
      if (!reg_pwd.test(value) || !isLength(value, { min: 6 })) {
        this.setError(
          "비밀번호는 6자리 이상이어야하고 최소 1개의 알파벳과 숫자와 특수문자가 포함되어야 합니다."
        );
        return false;
      }

      this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
    passwordConfirm: (value) => {
      if (this.props.form.get("password") !== value) {
        this.setError("비밀번호와 일치하지 않습니다.");
        return false;
      }
      this.setError(null);
      return true;
    },
    birthday: (value) => {
      if (!isLength(value, { min: 8, max: 8 })) {
        this.setError("8글자의 생년월일을 입력해 주세요");
        return false;
      }
      this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
    phonenum: (value) => {
      if (!isLength(value, { min: 13, max: 138 })) {
        this.setError("xxx-xxxx-xxxx 형식의 전화번호를 적어주세요.");
        return false;
      }

      this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
    authnum: (value) => {
      if (!isLength(value, { min: 4, max: 4 })) {
        this.setError("올바른 4자리의 인증번호를 입력해 주세요");
        return false;
      }
      this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
  };
  checkEmailExists = debounce(async (email) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmailExists(email);
      if (this.props.exists.get("email")) {
        this.setError("이미 존재하는 이메일입니다.");
      } else {
        this.setError(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  handleChange = (e) => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;
    // console.log(this.props.form.toJS().email);
    // console.log(this.props.form.toJS());
    // console.log(AuthActions);
    // console.log(e.target.value);
    // console.log(storage);
    AuthActions.changeInput({
      name,
      value,
      form: "register",
    });
    const validation = this.validate[name](value);
    if (name.indexOf("password") > -1 || !validation) return;
    // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
    else if (name === "email") {
      const check = this.checkEmailExists;
      check(value);
    } // name 에 따라 이메일체크할지 아이디 체크 할지 결정
  };
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("register");
  }
  keyPress = (e) => {
    if (e.key === "Enter") {
      this.handleLocalRegister();
    }
  };
  handleLocalRegister = async () => {
    const { form, AuthActions, error, history } = this.props;
    const {
      email,
      username,
      password,
      passwordConfirm,
      phonenum,
      birthday,
      authnum,
    } = form.toJS();

    const { validate } = this;

    if (error) return; // 현재 에러가 있는 상태라면 진행하지 않음
    if (
      !validate["email"](email) ||
      !validate["username"](username) ||
      !validate["password"](password) ||
      !validate["passwordConfirm"](passwordConfirm) ||
      !validate["phonenum"](phonenum) ||
      !validate["birthday"](birthday) ||
      !validate["authnum"](authnum)
    ) {
      // 하나라도 실패하면 진행하지 않음
      return;
    }

    try {
      await AuthActions.localRegister({
        email,
        username,
        password,
        passwordConfirm,
        phonenum,
        birthday,
        authnum,
      });
      const loggedInfo = this.props.result.toJS();

      console.log(loggedInfo);

      // TODO: 로그인 정보 저장 (로컬스토리지/스토어)
      history.push("/"); // 회원가입 성공시 홈페이지로 이동
    } catch (e) {
      // 에러 처리하기
      if (e.response.status === 409) {
        const { key } = e.response.data;
        if (key === "email") {
          const message = "이미 존재하는 이메일입니다.";
          return this.setError(message);
        }
      }
      this.setError("알 수 없는 에러가 발생했습니다.");
    }
  };
  render() {
    const { error } = this.props;
    const {
      email,
      password,
      passwordConfirm,
      username,
      birthday,
      phonenum,
      authnum,
    } = this.props.form.toJS();
    const { handleChange, handleLocalRegister, keyPress } = this;
    return (
      <AuthContent title="회원가입">
        <InputWithLabel
          label="이메일"
          type="email"
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
        <InputWithLabel
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={handleChange}
        />
        <InputWithLabel
          label="이름"
          name="username"
          placeholder="이름"
          value={username}
          onChange={handleChange}
        />
        <InputWithLabel
          label="생년월일"
          name="birthday"
          // type="date"
          placeholder="생년월일"
          value={birthday}
          onChange={handleChange}
        />
        <InputWithLabel
          label="전화번호"
          type="tel"
          name="phonenum"
          placeholder="xxx-xxxx-xxxx"
          value={phonenum}
          onChange={handleChange}
        />
        <PhoneButton>인증번호 받기</PhoneButton>
        <InputWithLabel
          label="인증번호"
          name="authnum"
          placeholder="인증번호"
          value={authnum}
          onChange={handleChange}
          onKeyPress={keyPress}
        />
        <PhoneButton>인증하기</PhoneButton>
        {error && <AuthError>{error}</AuthError>}
        <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
        <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  (state) => ({
    form: state.auth.getIn(["register", "form"]),
    error: state.auth.getIn(["register", "error"]),
    exists: state.auth.getIn(["register", "exists"]),
    result: state.auth.get("result"),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(AuthActions, dispatch),
    UserActions: bindActionCreators(UserActions, dispatch),
  })
)(Register);
