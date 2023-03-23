import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../redux/productsByCategorySlice";
import { addToCart, removeFromCart, updateCart } from "../redux/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { addToWishList, removeFromWishList } from "../redux/wishListSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function CategoryWiseProduct() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const cartItemsList = useSelector((state) => state.cart.data);
  const wishListItemsList = useSelector((state) => state.wishList.data);

  useEffect(() => {
    dispatch(getProductsByCategory(slug));
  }, [slug, dispatch]);

  const categoryWiseProductsList = useSelector(
    (state) => state.productsByCategory.data
  );

  const handleProductQuantity = (id, qty, type) => {
    let productQty;
    if (type === 0) {
      productQty = qty - 1;
    } else {
      productQty = qty + 1;
    }
    if (productQty < 1) {
      dispatch(removeFromCart(id));
      return;
    }
    dispatch(updateCart({ id, productQty }));
  };

  const cartButton = (product) => {
    const productInCart = cartItemsList?.find(
      (cartProduct) => cartProduct?.productId?._id === product?._id
    );

    if (productInCart) {
      return (
        <Box>
          <IconButton
            onClick={() =>
              handleProductQuantity(
                productInCart._id,
                productInCart.quantity,
                0
              )
            }
          >
            <RemoveIcon />
          </IconButton>
          <label>{productInCart.quantity}</label>
          <IconButton
            onClick={() =>
              handleProductQuantity(
                productInCart._id,
                productInCart.quantity,
                1
              )
            }
          >
            <AddIcon />
          </IconButton>
          <Button
            color="error"
            size="small"
            onClick={() => {
              dispatch(removeFromCart(productInCart._id));
            }}
          >
            <RemoveShoppingCartIcon />
          </Button>
        </Box>
      );
    }
    return (
      <>
        <Button size="small" onClick={() => dispatch(addToCart(product._id))}>
          <AddShoppingCartIcon />
        </Button>
      </>
    );
  };

  const wishListButton = (product) => {
    const productInWishList = wishListItemsList?.find(
      (wishListProduct) => wishListProduct?.productId?._id === product?._id
    );

    if (productInWishList) {
      return (
        <Button
          color="error"
          size="small"
          onClick={() => dispatch(removeFromWishList(productInWishList._id))}
        >
          <FavoriteIcon />
        </Button>
      );
    }

    return (
      <Button size="small" onClick={() => dispatch(addToWishList(product._id))}>
        <FavoriteBorderIcon />
      </Button>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {categoryWiseProductsList.map((product) => (
        <Card sx={{ width: 400 }} key={product._id}>
          <CardMedia
            sx={{ height: 140, margin: "10px" }}
            image={`${process.env.REACT_APP_API_URL}/${product.image}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>

            <Typography gutterBottom variant="h6" component="div">
              {product.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                width: 300,
                marginLeft: 14,
              }}
            >
              {cartButton(product)}
              {wishListButton(product)}
            </Box>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
