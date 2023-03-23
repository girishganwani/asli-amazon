import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoriesMenu from "../categories/categoriesMenu";
import CartButtonInNavbar from "../cart/cartButtonInNavbar";
import WishListButtonInNavbar from "../wishList/wishListButtonInNavbar";
import { logout } from "../../Auth/redux/authSlice";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const decodedToken = decode(token);
    setUserName(decodedToken.name);
  }, []);

  return (
    <>
      <Box
        sx={{
          color: "#fff",
          bgcolor: "#b39342",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ marginX: "15px", marginY: "10px" }}>
          Call Us: +91-9166207292
        </Typography>
        <Typography sx={{ marginX: "15px", marginY: "10px" }}>
          Email Us: girishganwani20@gmail.com
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "white",
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ marginTop: "10px" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/800px-Amazon.com-Logo.svg.png"
                alt="logo"
                width="200px"
              />
            </Box>

            <Box sx={{ display: "flex" }}>
              <Link
                to="/"
                variant="h6"
                component="div"
                style={{ margin: "10px" }}
              >
                Home
              </Link>
              <Link
                to="/about"
                variant="h6"
                component="div"
                style={{ margin: "10px" }}
              >
                About Us
              </Link>

              <CategoriesMenu />

              <Link
                to="contact"
                variant="h6"
                component="div"
                style={{ margin: "10px" }}
              >
                Contact Us
              </Link>

              <CartButtonInNavbar />

              <WishListButtonInNavbar />

              <Tooltip title={userName}>
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => dispatch(logout({ navigate }))}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
