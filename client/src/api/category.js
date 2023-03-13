import axios from "axios";

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
  return data;
};

export const removeCategory = async ({ id }) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API_URL}/category/admin/deleteCategory/${id}`
  );
  return data;
};

export const editCategory = async ({ id, categoryName, isAvailable, slug }) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_API_URL}/category/admin/updateCategory/${id}`,
    {
      categoryName,
      isAvailable,
      slug,
    }
  );
  return data;
};

export const getCategories = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/category/admin/fetchCategories`
  );
  return data;
};
