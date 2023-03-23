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
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import {
  fetchAllItmesFromWishList,
  removeFromWishList,
} from "../redux/wishListSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllItmesFromWishList());
  }, [dispatch]);

  const productsInWishList = useSelector((state) => state.wishList.data);

  useEffect(() => {
    if (productsInWishList?.length) {
      const newWishList = productsInWishList.map((product) => {
        return {
          id: product._id,
          name: product.productId.name,
          price: product.productId.price,
          image: `${process.env.REACT_APP_API_URL}/${product.productId.image}`,
        };
      });
      setProducts(newWishList);
    }
  }, [productsInWishList]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell> Image</TableCell>
            <TableCell align="right">Price</TableCell>
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

              <TableCell align="right">
                <IconButton
                  onClick={() => dispatch(removeFromWishList(product.id))}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ textAlign: "right", marginRight: "20px" }}></Box>
    </TableContainer>
  );
};

export default WishList;
