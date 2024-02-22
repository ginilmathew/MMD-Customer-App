import { storage } from "../../App"

const colorNew = storage.getMap("dynamicLogo")

export const COLORS = {
    primary: colorNew?.primary_color ? colorNew?.primary_color : '#8EBE44',
    primary_light: '#dae6dd',
    light: '#515151',
    dark: '#000000',
    blue: colorNew?.secondary_color ? colorNew?.secondary_color : '#569ED8',
    text: '#B2B2B2',
    red: '#FF6161',
    gray: '#F2F2F2',
    dark_gray: '#D8D8D8',
    status_created: '#0070AC',
    status_out: '#1C0B9D',
    status_processing: '#C53883',
    status_completed: '#66C538',
    status_cancelled: '#FF6161',
    status_accepted: '#1C70D1',
    status_paid: '#4D9FFF',
    white: '#fff',
    Offer_box:'#ffd8d8',
    border_color: "#707070" 
}