import { createAction, handleActions } from "redux-actions";
import * as ClassAPI from "lib/api/class";
import { pender } from "redux-pender";
import { Map } from "immutable";

const CHANGE_INPUT = "class/CHANGE_INPUT"; // input 값 변경
const INITIALIZE_FORM = "class/INITIALIZE_FORM"; // form 초기화
const LOCAL_REGISTER = "class/LOCAL_REGISTER"; // 이메일 가입
const SET_ERROR = "class/SET_ERROR"; // 오류 설정

export const classRegister = createAction(
  LOCAL_REGISTER,
  ClassAPI.localRegister
); // { email, username, password }
export const setError = createAction(SET_ERROR); // { form, message }
export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form

const initialState = Map({
  register: Map({
    form: Map({
      title: "",
      authors: "",
      price: "",
      tags: "",
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
      type: LOCAL_REGISTER,
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
