import httpClient from "./interceptor";

export const saveToCart = async (productId) => {
  const { data } = await httpClient.post("/cart/addToCart", { productId });
  return data;
};

export const getAllItemsFromCart = async () => {
  const { data } = await httpClient.get("/cart/fetchAllItmesFromCart");
  return data;
};

export const deleteFromCart = async (id) => {
  const { data } = await httpClient.delete(`/cart/removeFromCart/${id}`);
  return data;
};

export const removeAll = async () => {
  const { data } = await httpClient.delete("/cart/deleteAll");
  return data;
};

export const editCart = async ({ id, productQty }) => {
  const { data } = await httpClient.patch(`/cart/updateCart/${id}`, {
    quantity: productQty,
  });
  return data;
};
