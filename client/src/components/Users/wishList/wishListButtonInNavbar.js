import React from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const WishListButtonInNavbar = () => {
  const navigate = useNavigate();

  const handleWishList = () => {
    navigate("/wishlist");
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to shopping cart"
      size="large"
      onClick={handleWishList}
    >
      <FavoriteIcon />
    </IconButton>
  );
};

export default WishListButtonInNavbar;
