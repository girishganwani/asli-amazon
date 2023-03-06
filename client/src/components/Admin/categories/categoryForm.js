import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addCategory, updateCategory } from "../redux/categorySlice";

const getInitialValues = (stateValues) => {
  return {
    categoryName: stateValues?.categoryName || "",
    isAvailable: stateValues?.isAvailable || false,
    id: stateValues?.id || undefined,
  };
};

const CategoryForm = ({ setOpenPopup, editCategoryList }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category Name is required"),
  });

  const initialValues = getInitialValues(editCategoryList);

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log("values are: ", values);
      const { id, categoryName, isAvailable } = values;

      if (id) {
        dispatch(updateCategory({ id, categoryName, isAvailable }));
      } else {
        dispatch(addCategory({ categoryName, isAvailable }));
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
      <TextField
        label="Category Name"
        variant="outlined"
        onChange={handleChange}
        name="categoryName"
        value={values.categoryName}
        helperText={errors.categoryName}
      />
      <FormControlLabel
        control={<Switch />}
        label="Available"
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

export default CategoryForm;
