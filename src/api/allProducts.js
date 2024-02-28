import customAxios from "../customAxios";

export const getAllProducts = async ({ pageParam = 1 }) => customAxios.get(`public/api/customer/products?page=` + pageParam);
export const getAllOffers = async ({ pageParam = 1 }) => customAxios.get(`public/api/customer/offer-products?page=` + pageParam);

export const singProduct = async (data) => customAxios.get('public/api/customer/product/'+ data)

export const offerProducts = async (data) => customAxios.post('public/api/customer/offer-products', data) 
