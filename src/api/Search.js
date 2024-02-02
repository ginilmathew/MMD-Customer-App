import customAxios from "../customAxios";

export const getSearchList = async (data) => customAxios.get(`public/api/customer/products/${data}`)