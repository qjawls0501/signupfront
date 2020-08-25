import { createAction, handleActions } from "redux-actions";
import * as BookAPI from "lib/api/book";
import { pender } from "redux-pender";
import { Map } from "immutable";

const CHANGE_INPUT = "auth/CHANGE_INPUT"; // input 값 변경
const INITIALIZE_FORM = "auth/INITIALIZE_FORM"; // form 초기화
const CHECK_CLASS_EXISTS = "auth/CHECK_CLASS_EXISTS"; // 이메일 중복 확인
const LOCAL_CREATE = "auth/LOCAL_CREATE"; // 이메일 가입
const LOGOUT = "auth/LOGOUT"; // 로그아웃
const SET_ERROR = "auth/SET_ERROR"; // 오류 설정

export const createClass = createAction(LOCAL_CREATE, BookAPI.createClass); // { email, username, password }
export const setError = createAction(SET_ERROR); // { form, message }
export const deleteClass = createAction(LOGOUT, BookAPI.deleteClass);
export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form
export const checkClassExists = createAction(
  CHECK_CLASS_EXISTS,
  BookAPI.checkClass
); // email

const initialState = Map({
  create: Map({
    form: Map({
      title: "",
      authers: [""],
      price: "",
      tags: [""],
    }),
    exists: Map({
      title: false,
    }),
    error: null,
  }),
  result: Map({}),
});
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { form, name, value } = action.payload;
      return state.setIn([form, "form", name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    ...pender({
      type: CHECK_CLASS_EXISTS,
      onSuccess: (state, action) =>
        state.setIn(["create", "exists", "title"], action.payload.data.exists),
    }),
    ...pender({
      type: LOCAL_CREATE,
      onSuccess: (state, action) =>
        state.set("result", Map(action.payload.data)),
    }),
    [SET_ERROR]: (state, action) => {
      const { form, message } = action.payload;
      return state.setIn([form, "error"], message);
    },
  },
  initialState
);
