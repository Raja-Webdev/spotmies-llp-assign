import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};

export const register = async (username, password) => {
  const response = await api.post("/register", { username, password });
  console.log(response.data);
  return response.data;
};
