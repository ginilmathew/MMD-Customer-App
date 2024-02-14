import customAxios from "../customAxios";

export const UpdateOrder = async (data) => {
    return customAxios.post('public/api/customer/update-order', data);
};