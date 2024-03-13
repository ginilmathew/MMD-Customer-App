import customAxios from "../customAxios";

export const loginApi = async (data) => customAxios.post('public/api/auth/login', { ...data, email: data?.email.toLowerCase(), role: 'customer' })

export const registerApi = async (data) => customAxios.post('public/api/auth/register', { ...data, role: 'customer' })

export const forgetApi = async (data) => customAxios.post('public/api/customer/forgot-customer-password-otp', data)

export const otpApi = async (data) => customAxios.post('public/api/customer/forgot-customer-password-change', data)

export const tokenApi = async (data) => customAxios.post('public/api/customer/updatecustomertoken', { token: data,type:'app' })
