import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage"
//import { storage } from "../../App"
import reactotron from "reactotron-react-native"

//const [logo] = useMMKVStorage('dynamicLogo', storage)
let logo;

let COLORS = {
    primary: '#8EBE44',
    primary_light: '#dae6dd',
    light: '#515151',
    dark: '#000000',
    blue: '#569ED8',
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
    border_color: "#707070",
    logo: ''
}


let storage = new MMKVLoader().initialize();

// storage?.getMap("dynamicLogo", (error, result) => {
//     if (error) {
//       console.log(error);
//       return;
//     }

//     logo = result

//     if(logo) {
//         setColors(logo)
//     }
    
  
//     console.log({result}, result?.primary_color); // Logs 'string';
// });

export function setColors(color){
    COLORS.primary = color?.primary_color
    COLORS.blue = color?.secondary_color
    COLORS.logo = color?.image
}





export default COLORS;