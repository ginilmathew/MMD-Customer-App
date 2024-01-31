import customAxios from "../customAxios";

export const loginApi = async (data) => customAxios.post('public/api/auth/login', data)