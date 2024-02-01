import customAxios from "../customAxios";

export const HomeApi = async (payload) => customAxios.post('public/api/customer/new-home', payload);

