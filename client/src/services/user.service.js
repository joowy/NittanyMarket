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
      if (response.data.token) {
        localStorage.setItem("user_credential", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user_credential");
};
const authService = {
  register,
  login,
  logout,
};
export default authService;
