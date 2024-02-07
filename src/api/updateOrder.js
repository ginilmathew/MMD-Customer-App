import customAxios from "../customAxios";

export const UpdateOrder = async (data) => customAxios.post('public/api/customer/update-order', data);