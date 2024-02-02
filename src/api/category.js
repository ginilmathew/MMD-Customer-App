import customAxios from "../customAxios";

export const getCategory = async () => customAxios.get('public/api/admin/categories');
export const postcategorybySub = async (data)=>customAxios.get(`public/api/customer/product-by-subcategory/${data}`)