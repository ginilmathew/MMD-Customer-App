import { useMMKVStorage } from "react-native-mmkv-storage";
import customAxios from "../customAxios";
import { storage } from "../../App";

const [user] = useMMKVStorage('user', storage)

export const getOrders = async (data) => customAxios.get(`public/api/customer/myorders/${user?.user?._id}`)