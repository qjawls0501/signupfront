import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink2,
  AuthWrapper,
  AuthError,
} from "components/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import * as footActions from "redux/modules/foot";
import * as BookActions from "redux/modules/book";
import storage from "lib/storage";
import * as UserActions from "redux/modules/user";
class ClassRegister extends Component {
  setError = (message) => {
    const { BookActions } = this.props;
    BookActions.setError({
      form: "create",
      message,
    });
  };
  handleChange = (e) => {
    const { BookActions } = this.props;
    const { name, value } = e.target;
    // console.log(this.props.form.toJS().email);
    // console.log(this);
    // console.log(BookActions);
    // console.log(e.target.value);
    // console.log(storage);
    BookActions.changeInput({
      name,
      value,
      form: "create",
    });
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
      this.handleLocalCreate();
    }
  };
  routechange = () => {
    window.location.href = "/";
  };
  handleLocalCreate = async () => {
    const { form, BookActions, error, history } = this.props;
    const { title, authors, price, tags } = form.toJS();

    if (error) return; // 현재 에러가 있는 상태라면 진행하지 않음

    try {
      await BookActions.createClass({
        title,
        authors,
        price,
        tags,
      });
      const classInfo = this.props.result.toJS();
      storage.set("classInfo", classInfo);
      console.log(storage.get("classInfo"));
      // TODO: 로그인 정보 저장 (로컬스토리지/스토어)
      history.push("/class"); // 회원가입 성공시 홈페이지로 이동
    } catch (e) {
      // 에러 처리하기
      if (e.response.status === 409) {
        const { key } = e.response.data;
        if (key === "title") {
          const message = "이미 존재하는 강의명입니다.";
          return this.setError(message);
        }
      }
      this.setError("알 수 없는 에러가 발생했습니다.");
    }
  };
  render() {
    const { title, authors, price, tags } = this.props.form.toJS();
    const { error } = this.props;
    const { handleChange, handleLocalCreate, routechange } = this;
    return (
      <AuthWrapper>
        <AuthContent title="Class">
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
            name="tags"
            placeholder="react,vue"
            value={tags}
            onChange={handleChange}
          />
          <AuthButton onClick={handleLocalCreate}>강의 등록</AuthButton>
          {error && <AuthError>{error}</AuthError>}
          <AuthButton onClick={routechange}>Home으로 돌아가기</AuthButton>
        </AuthContent>
      </AuthWrapper>
    );
  }
}

export default connect(
  (state) => ({
    form: state.book.getIn(["create", "form"]),
    error: state.book.getIn(["create", "error"]),
    exists: state.book.getIn(["create", "exists"]),
    result: state.book.get("result"),
  }),
  (dispatch) => ({
    BookActions: bindActionCreators(BookActions, dispatch),
    UserActions: bindActionCreators(UserActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    FootActions: bindActionCreators(footActions, dispatch),
  })
)(ClassRegister);
