import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import { addProduct, updateProduct } from "../redux/productSlice";

const getInitialState = (editProduct) => {
  console.log("from edit product ", editProduct.isAvailable);
  return {
    id: editProduct.id || undefined,
    name: editProduct.name || "",
    catId: editProduct.catId || "",
    image: editProduct.image || "",
    price: editProduct.price || 0,
    quantity: editProduct.quantity || 0,
    isAvailable: editProduct.isAvailable || false,
  };
};

const ProductForm = ({ setOpenPopup, editProduct }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState({ preview: "", data: "" });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryList = useSelector((state) => state.category.data);

  const imageHandler = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product Name is required"),
  });

  const initialValues = getInitialState(editProduct);

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      const { id, name, price, quantity, catId, isAvailable } = values;
      const body = {
        id,
        name,
        catId,
        price,
        isAvailable,
        quantity,
        image,
      };

      if (!id) {
        dispatch(addProduct(body));
      } else {
        dispatch(updateProduct(body));
      }
      setOpenPopup(false);
    },
  });

  const { handleSubmit, values, setFieldValue, handleChange, errors } = formik;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "400px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="select-label">Category</InputLabel>
        <Select
          labelId="select-label"
          id="demo-simple-select"
          value={values.catId}
          name="catId"
          input={<OutlinedInput label="Category" />}
          onChange={handleChange}
        >
          {categoryList.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              <ListItemText primary={category.categoryName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Name"
        variant="outlined"
        onChange={handleChange}
        name="name"
        value={values.name}
        helperText={errors.name}
        fullWidth
      />
      <TextField
        type="number"
        label="price"
        value={values.price}
        name="price"
        onChange={handleChange}
        helperText={errors.price}
        fullWidth
        error={errors.price}
      />
      <TextField
        type="number"
        label="quantity"
        value={values.quantity}
        name="quantity"
        onChange={handleChange}
        helperText={errors.quantity}
        fullWidth
        error={errors.quantity}
      />
      <Button variant="contained" component="label">
        Upload Image
        <input
          hidden
          name="file"
          id="file"
          onChange={imageHandler}
          type="file"
        />
      </Button>
      {values?.image && (
        <img src={values.image} alt="productphoto" width="50" height="50" />
      )}
      {image?.preview && (
        <img src={image.preview} alt="productphoto" width="50" height="50" />
      )}

      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Available"
        checked={values.isAvailable}
        onChange={(event) => {
          setFieldValue("isAvailable", Boolean(event.target.checked));
        }}
        sx={{ padding: "10px" }}
      />

      <Button
        type="submit"
        style={{ marginTop: 10 }}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </Box>
  );
};

export default ProductForm;
