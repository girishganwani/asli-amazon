import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  logIn,
  logUp,
  getUsers,
  removeUser,
  passwordForgot,
  passwordReset,
} from "../../../api/auth";

export const signUp = createAsyncThunk("auth/signUp", async (body) => {
  const { navigate } = body;
  const data = await logUp(body);
  return { data, navigate };
});

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password, navigate }, { rejectWithValue }) => {
    const { data } = await logIn({ email, password }, rejectWithValue);
    console.log("here");
    return { data, navigate };
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, navigate }, { rejectWithValue }) => {
    const { data } = await passwordForgot({ email }, rejectWithValue);
    return { data, navigate };
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, otp, navigate }, { rejectWithValue }) => {
    console.log("here");
    const { data } = await passwordReset({ password, otp }, rejectWithValue);
    return { data, navigate };
  }
);

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
    error: null,
  },
  reducers: {
    logout(state, action) {
      localStorage.removeItem("userToken");
      action.payload.navigate("/signin");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      localStorage.setItem("userToken", action?.payload?.data?.token);
      alert("You are Logged In...");
      const role = action.payload.data.data.role;
      const navigate = action.payload.navigate;
      if (role === 1) {
        navigate("/admin/users");
      } else {
        navigate("/");
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.payload;
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
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      if (action.payload.data.msg === "OTP sent") {
        action.payload.navigate("/auth/resetpassword");
      }
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      alert("Password Changed Successfully");
      action.payload.navigate("/signin");
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
