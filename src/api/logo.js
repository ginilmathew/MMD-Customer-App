import customAxios from "../customAxios";

export const getLogo = async () => customAxios.get('public/api/auth/logo');