import { axiosClient as axios } from "../api/axios.config";
const register = (email, password) => {
  return axios.post("auth/register", {
    email,
    password,
  });
};

const login = async (email, password) => {
  
  return axios
    .post("auth/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
};
export default authService;
