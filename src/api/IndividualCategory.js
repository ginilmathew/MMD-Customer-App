import customAxios from "../customAxios";

export const getCatProducts = async (data) => customAxios.get(`public/api/customer/product-by-category/${data}`)