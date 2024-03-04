import customAxios from "../customAxios";

export const FeaturedApi = async () => customAxios.get('/public/api/customer/featured-product');