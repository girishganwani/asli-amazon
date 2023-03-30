import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    password: "",
    cPassword: "",
    otp: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password Data : ", passwordData);
    if (passwordData.password !== passwordData.cPassword) {
      setConfirmPassword(true);
    } else {
      dispatch(
        resetPassword({
          password: passwordData.password,
          otp: passwordData.otp,
          navigate,
        })
      );
    }
    setPasswordData({ password: "", cPassword: "", otp: "" });
    return;
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={confirmPassword}
        autoHideDuration={3000}
        onClose={() => setConfirmPassword(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Password and confirm password are not same.
        </Alert>
      </Snackbar>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={passwordData.password}
              onChange={(e) =>
                setPasswordData({
                  password: e.target.value,
                  cPassword: "",
                  otp: "",
                })
              }
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cPassword"
              label="Confirm Password"
              type="password"
              id="password"
              value={passwordData.cPassword}
              onChange={(e) =>
                setPasswordData({
                  password: passwordData.password,
                  cPassword: e.target.value,
                  otp: passwordData.otp,
                })
              }
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="OTP"
              type="text"
              id="otp"
              value={passwordData.otp}
              onChange={(e) =>
                setPasswordData({
                  password: passwordData.password,
                  cPassword: passwordData.cPassword,
                  otp: e.target.value,
                })
              }
              inputProps={{ maxLength: 4 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;
