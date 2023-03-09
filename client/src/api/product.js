import axios from "axios";

export const saveProduct = async (productFormData) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/admin/addProduct`,
    productFormData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const updatingProduct = async ({ productFormData, id }) => {
  const data = await axios.patch(
    `${process.env.REACT_APP_API_URL}/product/admin/updateProduct/${id}`,
    productFormData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const removeProduct = async (id) => {
  const data = await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/admin/deleteProduct/${id}`
  );
  return data;
};

export const getProducts = async () => {
  const data = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/admin/fetchProducts`
  );
  return data;
};
