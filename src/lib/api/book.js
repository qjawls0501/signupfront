import axios from "axios";
export const existsClass = (title) => axios.get("/api/books/exist/" + title);
export const createClass = ({ title, authors, price, tags }) => {
  return axios.post("/api/books/create", {
    title,
    authors,
    price,
    tags,
  });
};
export const checkClass = () => axios.get("/api/books/check");
export const updateClass = (title) => axios.patch("api/books/update/" + title);
export const deleteClass = (title) =>
  axios.delete("/api/books/delete/" + title);
