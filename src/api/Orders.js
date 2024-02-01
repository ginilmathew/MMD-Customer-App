import customAxios from "../customAxios";

export const getOrders = async (data) => customAxios.get(`public/api/customer/myorders/${data}`)