import { createAction, handleActions } from "redux-actions";
import * as BookAPI from "lib/api/book";
import { pender } from "redux-pender";
import { Map } from "immutable";

const CHANGE_INPUT = "books/CHANGE_INPUT"; // input 값 변경
const INITIALIZE_FORM = "books/INITIALIZE_FORM"; // form 초기화
const CHECK_CLASS_EXISTS = "books/CHECK_CLASS_EXISTS"; // 이메일 중복 확인
const LOCAL_CREATE = "books/LOCAL_CREATE"; // 이메일 가입
const DELETE_CLASS = "books/DELETE_CLASS"; // 로그아웃
const SET_ERROR = "books/SET_ERROR"; // 오류 설정

export const createClass = createAction(LOCAL_CREATE, BookAPI.createClass); // { email, username, password }
export const setError = createAction(SET_ERROR); // { form, message }
export const deleteClass = createAction(DELETE_CLASS, BookAPI.deleteClass);
export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form
export const checkClass = createAction(CHECK_CLASS_EXISTS, BookAPI.checkClass); // email

const initialState = Map({
  register: Map({
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
        state.setIn(
          ["register", "exists", "title"],
          action.payload.data.exists
        ),
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
