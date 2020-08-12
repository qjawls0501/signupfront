import axios from "axios";
export const checkEmailExists = (email) =>
  axios.get("/api/auth/exists/email/" + email);
export const localRegister = ({
  email,
  username,
  password,
  passwordConfirm,
  phonenum,
  birthday,
  authnum,
}) => {
  return axios.post("/api/auth/register/local", {
    email,
    username,
    password,
    passwordConfirm,
    phonenum,
    birthday,
    authnum,
  });
};
export const localLogin = ({ email, password }) =>
  axios.post("/api/auth/login/local", { email, password });

export const checkStatus = () => axios.get("/api/auth/check");
export const logout = () => axios.post("/api/auth/logout");
