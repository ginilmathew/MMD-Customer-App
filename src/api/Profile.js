import { storage } from "../../App";
import { GOOGLE_API } from "../constants/API";
import customAxios from "../customAxios";

const id = storage.getMap('user')?.user?._id;

export const getLocation = ({ latitude, longitude }) => customAxios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_API}`)

export const getProfile = async (data) => customAxios.get('public/api/auth/user-profile')

export const updateProfile = async (data) => customAxios.post('public/api/customer/update-customer-profile', { 
    id,
    ...data
})

export const changePasswd = async ({ password, user_id }) => customAxios.post('public/api/customer/change-password', {
    user_id: user_id ? user_id : id,
    password
})

export const addAddress = async (data) => customAxios.post('public/api/customer/add-customer-address', { 
    user_id: id,
    default: 'false',
    address: 'somethingg...'
})