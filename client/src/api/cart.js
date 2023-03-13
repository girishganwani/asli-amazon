import httpClient from "./interceptor";

export const saveToCart = async (productId) => {
  const { data } = await httpClient.post("/cart/addToCart", { productId });
  return data;
};
