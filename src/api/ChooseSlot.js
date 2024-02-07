import customAxios from "../customAxios";

export const ChooseSlot = async (data) => customAxios.post('public/api/customer/check-deliveryslots', data);