import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../redux/productsByCategorySlice";
import { addToCart } from "../redux/cartSlice";

export default function CategoryWiseProduct() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const categoryWiseProductsList = useSelector(
    (state) => state.productsByCategory.data
  );

  useEffect(() => {
    dispatch(getProductsByCategory(slug));
  }, [slug, dispatch]);

  const handleCartButton = (product) => {
    console.log("cart button is clicked");
    dispatch(addToCart(product._id));
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
                justifyContent: "space-between",
                width: 300,
                marginLeft: 5,
              }}
            >
              <Button size="small" onClick={() => handleCartButton(product)}>
                Add to Bag
              </Button>
              <Button size="small">Add to favorite</Button>
            </Box>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
