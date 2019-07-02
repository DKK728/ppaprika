import axios from "axios";
axios.default.baseURL = "http://localhost:8080/api/private/v1/";

export const login = data => {
  return axios({
    method: "post",
    url: "login",
    data
  });
};
