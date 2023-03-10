import React from "react";
import { Typography, AppBar, Toolbar, Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { adminLogout } from "./redux/adminLoginSlice";
// import { useNavigate } from "react-router-dom";

const Header = ({ drawerWidth }) => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          Admin Pannel
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(255,255,255,0.9)",
            color: "Blue",
          }}
          //   onClick={() => dispatch(adminLogout({ navigate }))}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
