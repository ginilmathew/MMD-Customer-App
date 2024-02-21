import customAxios from "../customAxios";

export const getOrders = async (data) => customAxios.get(`public/api/customer/myorders/${data}`)

export const singleOrder = async (id) => customAxios.get(`public/api/customer/order/${id}`)