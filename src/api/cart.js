import customAxios from "../customAxios";

export const PostAddToCart = async (data) => customAxios.post('public/api/customer/add-to-cart', data);

export const getCartItems = async (data) => customAxios.post('public/api/customer/getcartitems',data)