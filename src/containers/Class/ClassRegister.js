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
import * as baseActions from "redux/modules/base";
import * as footActions from "redux/modules/foot";
import * as BookActions from "redux/modules/book";
import { isEmail, isLength } from "validator";
import debounce from "lodash/debounce";
import storage from "lib/storage";
import * as UserActions from "redux/modules/user";
import { valid } from "semver";
class Register extends Component {
  setError = (message) => {
    const { BookActions } = this.props;
    BookActions.setError({
      form: "create",
      message,
    });
  };
  // validate = {
  //   email: (value) => {
  //     if (!isEmail(value)) {
  //       this.setError("잘못된 이메일 형식 입니다.");
  //       return false;
  //     }
  //     return true;
  //   },
  //   username: (value) => {
  //     if (!isLength(value, { min: 2 })) {
  //       this.setError("이름은 최소 2글자 이상으로 이루어져야 합니다.");
  //       return false;
  //     }
  //     this.setError(null);
  //     return true;
  //   },
  //   password: (value) => {
  //     var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+|<>?:{}]).*$/;
  //     if (!reg_pwd.test(value) || !isLength(value, { min: 6 })) {
  //       this.setError(
  //         "비밀번호는 6자리 이상이어야하고 최소 1개의 알파벳과 숫자와 특수문자가 포함되어야 합니다."
  //       );
  //       return false;
  //     }

  //     this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
  //     return true;
  //   },
  //   passwordConfirm: (value) => {
  //     if (this.props.form.get("password") !== value) {
  //       this.setError("비밀번호와 일치하지 않습니다.");
  //       return false;
  //     }
  //     this.setError(null);
  //     return true;
  //   },
  //   birthday: (value) => {
  //     if (!isLength(value, { min: 8, max: 8 })) {
  //       this.setError("8글자의 생년월일을 입력해 주세요");
  //       return false;
  //     }
  //     this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
  //     return true;
  //   },
  //   phonenum: (value) => {
  //     if (!isLength(value, { min: 13, max: 138 })) {
  //       this.setError("xxx-xxxx-xxxx 형식의 전화번호를 적어주세요.");
  //       return false;
  //     }

  //     this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
  //     return true;
  //   },
  //   authnum: (value) => {
  //     if (!isLength(value, { min: 4, max: 4 })) {
  //       this.setError("올바른 4자리의 인증번호를 입력해 주세요");
  //       return false;
  //     }
  //     this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
  //     return true;
  //   },
  // };
  // checkEmailExists = debounce(async (email) => {
  //   const { BookActions } = this.props;
  //   try {
  //     await BookActions.checkEmailExists(email);
  //     if (this.props.exists.get("email")) {
  //       this.setError("이미 존재하는 이메일입니다.");
  //     } else {
  //       this.setError(null);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, 300);

  handleChange = (e) => {
    const { BookActions } = this.props;
    const { name, value } = e.target;
    // console.log(this.props.form.toJS().email);
    // console.log(this.props.form.toJS());
    // console.log(BookActions);
    // console.log(e.target.value);
    // console.log(storage);
    BookActions.changeInput({
      name,
      value,
      form: "create",
    });
    // const validation = this.validate[name](value);
    // if (name.indexOf("password") > -1 || !validation) return;
    // // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
    // else if (name === "email") {
    //   const check = this.checkEmailExists;
    //   check(value);
    // } // name 에 따라 이메일체크할지 아이디 체크 할지 결정
  };
  componentWillMount() {
    this.props.BaseActions.setHeaderVisibility(false);
    this.props.FootActions.setFooterVisibility(false);
  }
  componentDidMount() {
    this.props.BaseActions.setHeaderVisibility(false);
    this.props.FootActions.setFooterVisibility(false);
  }
  // 페이지에서 벗어 날 때 다시 활성화
  componentWillUnmount() {
    const { BookActions } = this.props;
    BookActions.initializeForm("create");
  }
  keyPress = (e) => {
    if (e.key === "Enter") {
      this.handleLocalRegister();
    }
  };
  handleLocalRegister = async () => {
    const { form, BookActions, error, history } = this.props;
    const { title, authors, price, tags } = form.toJS();

    const { validate } = this;

    if (error) return; // 현재 에러가 있는 상태라면 진행하지 않음
    if (
      !validate["title"](title) ||
      !validate["authors"](authors) ||
      !validate["price"](price) ||
      !validate["tags"](tags)
    ) {
      // 하나라도 실패하면 진행하지 않음
      return;
    }

    try {
      await BookActions.localRegister({
        title,
        authors,
        price,
        tags,
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
    const { title, authors, price, tags } = this.props.form.toJS();
    const { handleChange, handleLocalRegister, keyPress } = this;
    return (
      <AuthContent title="Sign Up">
        <InputWithLabel
          label="강의명"
          name="title"
          placeholder="react"
          value={title}
          onChange={handleChange}
        />
        <InputWithLabel
          label="강사명"
          name="authors"
          placeholder="velopert"
          value={authors}
          onChange={handleChange}
        />
        <InputWithLabel
          label="가격"
          name="price"
          placeholder="20000"
          value={price}
          onChange={handleChange}
        />
        <InputWithLabel
          label="태그"
          name="username"
          placeholder="react,vue"
          value={tags}
          onChange={handleChange}
        />
        <AuthButton onClick={handleLocalRegister}>Sign Up</AuthButton>
        <RightAlignedLink to="/">Home으로 돌아가기</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  (state) => ({
    form: state.auth.getIn(["create", "form"]),
    error: state.auth.getIn(["create", "error"]),
    exists: state.auth.getIn(["create", "exists"]),
    result: state.auth.get("result"),
  }),
  (dispatch) => ({
    BookActions: bindActionCreators(BookActions, dispatch),
    UserActions: bindActionCreators(UserActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    FootActions: bindActionCreators(footActions, dispatch),
    BookActions: bindActionCreators(BookActions, dispatch),
  })
)(Register);
