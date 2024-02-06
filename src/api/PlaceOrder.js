import customAxios from "../customAxios";

export const PlaceOrder = async (data) => customAxios.post('public/api/customer/place-order', data);