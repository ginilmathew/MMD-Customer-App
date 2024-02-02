import customAxios from "../customAxios";

export const getNotifications = async (data) => customAxios.get(`public/api/admin/notifications`)