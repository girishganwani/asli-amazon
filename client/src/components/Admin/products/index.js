import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import Popup from "../common/popup";
import ProductForm from "./productForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../redux/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState(null);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const productsList = useSelector((state) => state?.product?.data);

  useEffect(() => {
    if (productsList?.length) {
      const newProductsList = productsList.map((product, index) => {
        return {
          id: index + 1,
          catName: product?.catId?.categoryName,
          name: product.name,
          image: `${process.env.REACT_APP_API_URL}/${product.image}`,
          price: product.price,
          quantity: product.quantity,
          isAvailable: product.isAvailable,
          productId: product._id,
          catId: product.catId?._id,
        };
      });
      setProducts(newProductsList);
    }
  }, [productsList]);

  const handleUpdate = (row) => {
    const { catId, name, price, quantity, isAvailable, image, productId } = row;
    setUpdateProduct({
      id: productId,
      name,
      price,
      isAvailable,
      image,
      catId,
      quantity,
    });
    setOpenPopup(true);
  };

  const editButton = (params) => {
    return (
      <IconButton color="secondary" onClick={() => handleUpdate(params.row)}>
        <UpdateIcon />
      </IconButton>
    );
  };

  const deleteButton = (params) => {
    return (
      <IconButton
        aria-label="delete"
        onClick={() => {
          dispatch(deleteProduct(params.row.productId));
        }}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "catName", headerName: "Category", width: 120 },
    { field: "name", headerName: "Name", width: 120 },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      editable: true,
      renderCell: (params) => (
        <img src={params.row.image} alt="not found" width="100%" />
      ),
    },
    { field: "price", headersName: "Price", width: 70 },
    { field: "quantity", headersName: "Quantity", width: 70 },
    { field: "isAvailable", headersName: "Status", width: 120 },
    {
      field: "Update",
      width: 60,
      sortable: false,
      renderCell: editButton,
    },
    {
      field: "Delete",
      width: 60,
      sortable: false,
      renderCell: deleteButton,
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Products
            </Typography>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => {
                setUpdateProduct({
                  id: null,
                  catId: null,
                  name: null,
                  price: null,
                  quantity: null,
                  image: null,
                  isAvailable: null,
                });
                setOpenPopup(true);
              }}
            >
              <AddIcon />
              Add New
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Product Form"
      >
        <ProductForm setOpenPopup={setOpenPopup} editProduct={updateProduct} />
      </Popup>
    </>
  );
};

export default Products;
