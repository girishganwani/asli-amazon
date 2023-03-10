import httpClient from "./interceptor";

export const saveCategory = async ({ categoryName, isAvailable }) => {
  const { data } = await httpClient.post("/category/admin/addCategory", {
    categoryName,
    isAvailable,
  });
  return data;
};

export const removeCategory = async ({ id }) => {
  const { data } = await httpClient.delete(
    `/category/admin/deleteCategory/${id}`
  );
  return data;
};

export const editCategory = async ({ id, categoryName, isAvailable }) => {
  const { data } = await httpClient.patch(
    `/category/admin/updateCategory/${id}`,
    {
      categoryName,
      isAvailable,
    }
  );
  return data;
};

export const getCategories = async () => {
  const { data } = await httpClient.get(`/category/admin/fetchCategories`);
  return data;
};
