import customAxios from "../customAxios";

export const PosttoCheckout = async (payload) => customAxios.post('public/api/customer/getcheckoutdata', payload);