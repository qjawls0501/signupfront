import axios from "axios";
export const checkClassExists = (title) =>
  axios.get("/api/class/exists/title/" + title);
export const localRegister = ({ title, authors, price, tags }) => {
  return axios.post("/api/class/register/local", {
    title,
    authors,
    price,
    tags,
  });
};
export const checkStatus = () => axios.get("/api/auth/check");
