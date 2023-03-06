import React, { useState } from "react";
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

const Products = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const editButton = (params) => {
    return (
      <IconButton
        color="secondary"
        onClick={() => {
          console.log("Edit button is clicked.");
        }}
      >
        <UpdateIcon />
      </IconButton>
    );
  };

  const deleteButton = (params) => {
    return (
      <IconButton
        aria-label="delete"
        onClick={() => {
          console.log("Delete Button is clicked.");
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

  const rows = [
    {
      id: 1,
      catName: "category 1",
      name: "product 1",
      image: "image 1",
      price: 100,
      qunatity: 5,
      isAvailable: true,
    },
    {
      id: 2,
      catName: "category 2",
      name: "product 2",
      image: "image 2",
      price: 200,
      qunatity: 10,
      isAvailable: false,
    },
    {
      id: 3,
      catName: "category 3",
      name: "product 3",
      image: "image 3",
      price: 300,
      qunatity: 5,
      isAvailable: true,
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Categories
            </Typography>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => {
                // setEditCategoryList({
                //   id: null,
                //   name: null,
                //   status: null,
                // });
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
          rows={rows}
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
        <ProductForm
        // setOpenPopup={setOpenPopup}
        // editCategoryList={editCategoryList}
        />
      </Popup>
    </>
  );
};

export default Products;
