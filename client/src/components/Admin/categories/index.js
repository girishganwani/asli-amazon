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
import Popup from "../common/popup";
import { DataGrid } from "@mui/x-data-grid";
import CategoryForm from "./categoryForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../redux/categorySlice";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";

const Categories = () => {
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editCategoryList, setEditCategoryList] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryList = useSelector((state) => state.category.data);

  useEffect(() => {
    if (categoryList.length) {
      setCategories(
        categoryList.map((category, index) => {
          return {
            id: index + 1,
            name: category.categoryName,
            status: category.isAvailable,
            categoryId: category._id,
          };
        })
      );
    }
  }, [categoryList]);

  const handleEdit = (row) => {
    console.log("ROW IS : ", row);
    setEditCategoryList({
      id: row.categoryId,
      categoryName: row.name,
      isAvailable: row.status,
    });
    setOpenPopup(true);
  };

  const editButton = (params) => {
    return (
      <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
        <UpdateIcon />
      </IconButton>
    );
  };

  const handleDelete = (id) => {
    console.log("id : ", id);
    dispatch(deleteCategory({ id }));
  };

  const deleteButton = (params) => {
    return (
      <IconButton
        aria-label="delete"
        onClick={() => handleDelete(params.row.categoryId)}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 100 },
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
              Categories
            </Typography>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => {
                setEditCategoryList({
                  id: null,
                  name: null,
                  status: null,
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
          rows={categories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Category Form"
      >
        <CategoryForm
          setOpenPopup={setOpenPopup}
          editCategoryList={editCategoryList}
        />
      </Popup>
    </>
  );
};

export default Categories;
