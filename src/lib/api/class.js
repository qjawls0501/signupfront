import axios from "axios";

export const checkClassExists = (id) => axios.get("/api/class/exists/id/" + id);
