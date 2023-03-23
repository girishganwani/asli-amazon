import httpClient from "./interceptor";

export const saveToWishList = async (productId) => {
  const { data } = await httpClient.post("/wishList/addToWishList", {
    productId,
  });
  return data;
};

export const deleteFromWishList = async (id) => {
  const { data } = await httpClient.delete(
    `/wishList/removeFromWishList/${id}`
  );
  return data;
};

export const getAllItemsFromWishList = async () => {
  const { data } = await httpClient.get(`/wishList/fetchAllItemsFromWishList`);
  return data;
};
