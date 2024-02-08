import reactotron from "reactotron-react-native";
import customAxios from "../customAxios";

export const UpdateOrder = async (data) => {
    reactotron.log('Updating order:', data);
    return customAxios.post('public/api/customer/update-order', data);
};