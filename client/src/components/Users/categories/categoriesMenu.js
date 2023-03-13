import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../Admin/redux/categorySlice";
import { useNavigate } from "react-router-dom";

const CategoriesMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (slug) => {
    navigate(`/category/${slug}`);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!categoryList?.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  const categoryList = useSelector((state) => state.category.data);
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categoryList.map((category) => (
          <MenuItem
            key={category._id}
            onClick={() => handleClose(category.slug)}
          >
            {category.categoryName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CategoriesMenu;
