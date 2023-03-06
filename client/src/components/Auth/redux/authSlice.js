import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logIn, logUp, getUsers, removeUser } from "../../../api/auth";

export const signUp = createAsyncThunk("auth/signUp", async (body) => {
  const { navigate } = body;
  const data = await logUp(body);

  return { data, navigate };
});

export const signIn = createAsyncThunk("auth/signIn", async (body) => {
  const data = await logIn(body);
  return data;
});

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const { data } = await getUsers();
  return data;
});

export const deleteUser = createAsyncThunk("auth/deleteUser", async (id) => {
  const { data } = await removeUser(id);
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      localStorage.setItem("userToken", state.data.token);
      alert("You are Logged In...");
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      alert("Account Created Sucessfully");
      action.payload.navigate("/signin");
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = action.payload.data;
    });
  },
});

export default authSlice.reducer;
