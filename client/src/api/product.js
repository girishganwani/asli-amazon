import httpClient from "./interceptor";

export const saveProduct = async (productFormData) => {
  const data = await httpClient.post(
    "/product/admin/addProduct",
    productFormData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const updatingProduct = async ({ productFormData, id }) => {
  const data = await httpClient.patch(
    `/product/admin/updateProduct/${id}`,
    productFormData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const removeProduct = async (id) => {
  const data = await httpClient.delete(`/product/admin/deleteProduct/${id}`);
  return data;
};

export const getProducts = async () => {
  const data = await httpClient.get(`/product/admin/fetchProducts`);
  return data;
};
