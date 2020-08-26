import { combineReducers } from "redux";
import base from "./base";
import auth from "./auth";
import foot from "./foot";
import user from "./user";
import book from "./book";
import { penderReducer } from "redux-pender";
export default combineReducers({
  base,
  book,
  auth,
  user,
  foot,
  pender: penderReducer,
});
