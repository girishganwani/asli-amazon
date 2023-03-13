import httpClient from "./interceptor";

<<<<<<< HEAD
export const saveCategory = async ({ categoryName, isAvailable, slug }) => {
  console.log("slug is : ", slug);
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/category/admin/addCategory`,
    {
      categoryName,
      isAvailable,
      slug,
    }
  );
=======
export const saveCategory = async ({ categoryName, isAvailable }) => {
  const { data } = await httpClient.post("/category/admin/addCategory", {
    categoryName,
    isAvailable,
  });
>>>>>>> 55b6dacbd67dc1b38392e18039a3ed3133249f8a
  return data;
};

export const removeCategory = async ({ id }) => {
  const { data } = await httpClient.delete(
    `/category/admin/deleteCategory/${id}`
  );
  return data;
};

<<<<<<< HEAD
export const editCategory = async ({ id, categoryName, isAvailable, slug }) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_API_URL}/category/admin/updateCategory/${id}`,
=======
export const editCategory = async ({ id, categoryName, isAvailable }) => {
  const { data } = await httpClient.patch(
    `/category/admin/updateCategory/${id}`,
>>>>>>> 55b6dacbd67dc1b38392e18039a3ed3133249f8a
    {
      categoryName,
      isAvailable,
      slug,
    }
  );
  return data;
};

export const getCategories = async () => {
  const { data } = await httpClient.get(`/category/admin/fetchCategories`);
  return data;
};
