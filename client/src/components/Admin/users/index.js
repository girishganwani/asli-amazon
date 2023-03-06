import React, { useEffect, useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../Auth/redux/authSlice";

const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersList = useSelector((state) => state.auth.users);
  console.log("userList is : ", usersList);

  useEffect(() => {
    if (usersList.length) {
      setUsers(
        usersList.map((user, index) => {
          return {
            id: index + 1,
            name: user.name,
            email: user.email,
            role: user.role,
            userId: user._id,
          };
        })
      );
    }
  }, [usersList]);

  const handleDelete = (id) => {
    console.log("Delete Button is clicked");
    console.log(id);
    dispatch(deleteUser(id));
  };

  const deleteButton = (params) => {
    return (
      <IconButton
        aria-label="delete"
        onClick={() => handleDelete(params.row.userId)}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 100 },

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
              Users
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default Users;
