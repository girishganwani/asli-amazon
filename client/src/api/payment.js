import httpClient from "./interceptor";

export const checkout = async (body) => {
  const { successUrl, cancelUrl, products } = body;
  const { data } = await httpClient.post("/checkout", {
    successUrl,
    cancelUrl,
    products,
  });
  return data;
};
