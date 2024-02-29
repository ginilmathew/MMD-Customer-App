import axios from "axios";
import { BASE_URL } from "./constants/API";
import { queryClient, storage } from "../App";
import { fetch } from "@react-native-community/netinfo";
import navRef, { getCurrentScreenPath } from "./navigation/RootNavigation";


const customAxios = axios.create({
    baseURL: BASE_URL,
});


customAxios.interceptors.request.use(async function (config) {

    try {

        const state = await fetch();

        if (!state?.isConnected) return;

        const user = await storage.getMapAsync('user')

        if (user) config.headers['Authorization'] = `Bearer ${user?.access_token}`;

        return Promise.resolve(config);

    } catch (error) {
        //console.log({ error, success });
        storage.setBool('loading', false);
    }
}, (err) => {
    storage.setBool('loading', false);
    return Promise.reject(err)
})


customAxios.interceptors.response.use(function (res) {

    storage.setBool('loading', false);
    return Promise.resolve(res);
}, async (err) => {


    const user = await storage.getMapAsync('user')

    if (err?.response?.status === 403) {
        queryClient.resetQueries();
        storage.clearStore();

        navRef?.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });

    }

    storage.setString('error', err?.response?.data?.message || err?.response?.data?.error);
    storage.setBool('loading', false);
    return Promise.reject(err?.response?.data?.message)

})

export default customAxios;