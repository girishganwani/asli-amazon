import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton, Popover, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItmesFromCart } from "../redux/cartSlice";
import Cart from "./cart";

const CartButtonInNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleCart = () => {
    navigate("/cart");
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  useEffect(() => {
    dispatch(fetchAllItmesFromCart());
  }, [dispatch]);

  const productsInCart = useSelector((state) => state.cart.data);

  const open = Boolean(anchorEl);

  const handlePopoverClose = (event) => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event) => {
    if (productsInCart?.length) {
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <>
      <IconButton
        color="primary"
        size="large"
        onClick={handleCart}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <StyledBadge badgeContent={productsInCart?.length} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Cart />
      </Popover>
    </>
  );
};

export default CartButtonInNavbar;
