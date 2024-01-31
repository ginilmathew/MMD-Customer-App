import { GOOGLE_API } from "../constants/API";
import customAxios from "../customAxios";

export const getLocation = ({ latitude, longitude }) => customAxios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_API}`)