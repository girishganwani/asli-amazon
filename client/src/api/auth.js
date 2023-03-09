import axios from "axios";

export const logUp = async ({ email, password, name }) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/signUp`,
    {
      email,
      password,
      name,
    }
  );
  return data;
};

export const logIn = async ({ email, password }) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/signIn`,
    {
      email,
      password,
    }
  );
  return data;
};

export const getUsers = async () => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}/auth/fetchUsers`
  );
  return data;
};

export const removeUser = async (id) => {
  console.log(process.env.REACT_APP_API_URL);
  const data = await axios.delete(
    `${process.env.REACT_APP_API_URL}/auth/deleteUser/${id}`
  );
  return data;
};
