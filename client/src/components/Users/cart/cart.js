import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllItmesFromCart, removeFromCart } from "../redux/cartSlice";
import ClearIcon from "@mui/icons-material/Clear";
import { makePayment } from "../redux/paymentSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [totalArray, setTotalArray] = useState([]);

  useEffect(() => {
    dispatch(fetchAllItmesFromCart());
  }, [dispatch]);

  const productsInCart = useSelector((state) => state.cart.data);

  useEffect(() => {
    if (productsInCart?.length) {
      const newCartList = productsInCart.map((product) => {
        return {
          id: product._id,
          name: product.productId.name,
          price: product.productId.price,
          quantity: product.quantity,
          total: product.productId.price * product.quantity,
          image: `${process.env.REACT_APP_API_URL}/${product.productId.image}`,
        };
      });
      setProducts(newCartList);
      setTotalArray(newCartList.map((product) => product.total));
    }
  }, [productsInCart]);

  const getGrandTotal = () => {
    let sum = 0;
    totalArray.forEach((item) => {
      sum += item;
    });
    return <Typography>Total Pay : {sum} </Typography>;
  };

  const handlePayment = () => {
    const successUrl = `${process.env.REACT_APP_APP_URL}/payment/success`;
    const cancelUrl = `${process.env.REACT_APP_APP_URL}/payment/cancel`;
    dispatch(makePayment({ successUrl, cancelUrl, products }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell> Image</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell>
                <img src={product.image} alt="product" width="80"></img>
              </TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">{product.total}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ textAlign: "right", marginRight: "20px" }}>
        {getGrandTotal()}
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Button variant="contained" onClick={handlePayment}>
          Make Payment{" "}
        </Button>
      </Box>
    </TableContainer>
  );
};

export default Cart;
