import customAxios from "../customAxios";

export const getCategory = async () => customAxios.get('public/api/admin/categories');