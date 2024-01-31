import axios from "axios";
import { BASE_URL } from "./constants/API";
import { queryClient, storage } from "../App";
import { fetch } from "@react-native-community/netinfo";
import navRef from "./navigation/RootNavigation";


const customAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});


customAxios.interceptors.request.use(async function (config) {

    try {

        const state = await fetch();

        if (!state?.isConnected) return;

        const user = storage.getMap('user')

        if (user) config.headers['Authorization'] = `Bearer ${user?.access_token}`;

        return Promise.resolve(config);

    } catch (error) {
        storage.setBool('loading', false);
    }
}, (err) => {
    storage.setBool('loading', false);

    return Promise.reject(err)
})


customAxios.interceptors.response.use(function (res) {
    storage.setBool('loading', false);
    return Promise.resolve(res);
}, (err) => {
    if (err?.response?.data?.message) {

        if ((err?.response?.status === 403 || err?.response?.status === 401) && err?.response?.data?.message === "Unauthenticated.") {


            if (navRef.getCurrentRoute().name === 'Login') {
                queryClient.resetQueries();
                storage.clearStore();

                return Promise.reject(err);
            }

            navRef?.reset({
                index: 0,
                routes: [{ name: LOGIN }]
            });

            // storage.setString('error', "Something went wrong!");
            queryClient.resetQueries();
            storage.clearStore();
        }

        // storage.setString('error', err?.response?.data[i18n.language === 'ar' ? err?.response?.data?.message_ar ? 'message_ar' : 'message' : 'message']);
    }
    storage.setBool('loading', false);
    return Promise.reject(err)
})

export default customAxios;