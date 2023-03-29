import httpClient from "./interceptor";

export const logUp = async ({ email, password, name }) => {
  const data = await httpClient.post(`/auth/signUp`, {
    email,
    password,
    name,
  });
  return data;
};

export const logIn = async ({ email, password }) => {
  const data = await httpClient.post(`/auth/signIn`, {
    email,
    password,
  });
  return data;
};

export const passwordForgot = async ({ email }) => {
  const data = await httpClient.post("auth/forgotPassword", { email });
  return data;
};

export const getUsers = async () => {
  const data = await httpClient.get(`/auth/fetchUsers`);
  return data;
};

export const removeUser = async (id) => {
  console.log(process.env.REACT_APP_API_URL);
  const data = await httpClient.delete(`/auth/deleteUser/${id}`);
  return data;
};
