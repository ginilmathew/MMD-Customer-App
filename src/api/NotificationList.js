import customAxios from "../customAxios";

export const getNotifications = async (data) => customAxios.get(`public/api/admin/notifications`)
export const notStatus = async ({ id }) => customAxios.put(`public/api/customer/notification_read/` + id)