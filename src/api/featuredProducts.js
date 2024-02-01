import customAxios from "../customAxios";

export const getfeaturedProduct = async (id) => customAxios.get(`public/api/customer/featured-products/${id}`);