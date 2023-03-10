import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
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

              {/* <CategoriesMenu /> */}

              <Link
                to="contact"
                variant="h6"
                component="div"
                style={{ margin: "10px" }}
              >
                Contact Us
              </Link>

              {/* <CartButtonInNavbar /> */}

              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                size="large"
                // onClick={handleWishList}
              >
                <FavoriteIcon />
              </IconButton>
              <Tooltip title="userId">
                <IconButton
                  color="primary"
                  // aria-label="add to shopping cart"
                  size="large"
                  //   onClick={() => dispatch(adminLogout({ navigate }))}
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
