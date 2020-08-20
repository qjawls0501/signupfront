import { combineReducers } from "redux";
import base from "./base";
import auth from "./auth";
import foot from "./foot";
import user from "./user";
import { penderReducer } from "redux-pender";
export default combineReducers({
  base,
  auth,
  user,
  foot,
  pender: penderReducer,
});
