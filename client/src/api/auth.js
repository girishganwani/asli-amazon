import httpClient from "./interceptor";

export const logUp = async ({ email, password, name }) => {
  const data = await httpClient.post(`/auth/signUp`, {
    email,
    password,
    name,
  });
  return data;
};

export const logIn = async ({ email, password }, rejectWithValue) => {
  try {
    const data = await httpClient.post(`/auth/signIn`, {
      email,
      password,
    });
    return data;
  } catch (e) {
    throw rejectWithValue(e.response?.data?.msg);
  }
};

export const passwordForgot = async ({ email }, rejectWithValue) => {
  try {
    const data = await httpClient.post("auth/forgotPassword", { email });
    return data;
  } catch (error) {
    throw rejectWithValue(error.response?.data?.msg);
  }
};

export const passwordReset = async ({ password, otp }, rejectWithValue) => {
  try {
    const data = await httpClient.post("auth/resetPassword", { password, otp });
    return data;
  } catch (error) {
    throw rejectWithValue(error.response?.data?.msg);
  }
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
