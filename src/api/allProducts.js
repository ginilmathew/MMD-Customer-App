import customAxios from "../customAxios";

export const getAllProducts = async ({ pageParam = 1 }) => customAxios.get(`public/api/customer/products?page=` + pageParam);