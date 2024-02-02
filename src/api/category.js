import customAxios from "../customAxios";

export const getCategory = async () => customAxios.get('public/api/admin/categories');
export const postcategorybySub = async (data)=>customAxios.post('public/api/admin/categories',data)