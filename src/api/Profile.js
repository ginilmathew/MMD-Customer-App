import { storage } from "../../App";
import { GOOGLE_API } from "../constants/API";
import customAxios from "../customAxios";

export const getLocation = ({ latitude, longitude }) => customAxios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_API}`)

export const getProfile = async (data) => customAxios.get('public/api/auth/user-profile')

export const updateProfile = async (data) => customAxios.post('public/api/customer/update-customer-profile', { 
    id: storage.getMap('user')?.user?._id,
    ...data
})

export const changePasswd = async ({ password }) => customAxios.post('public/api/customer/change-password', {
    user_id: storage.getMap('user')?.user?._id,
    password
})
