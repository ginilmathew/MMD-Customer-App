import { StyleSheet, View, Modal, useWindowDimensions, Image, Platform } from 'react-native'
import React, { useCallback, useContext, useEffect } from 'react'
import { navigationRef } from './RootNavigation';
import SplashScreen from 'react-native-splash-screen'
import Login from '../screens/auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../screens/auth/Register';
import Forget from '../screens/auth/Forget';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { storage } from '../../App';
import { useNetInfo } from '@react-native-community/netinfo';
import Toast from '../components/Toast';
import LocationPage from '../screens/auth/LocationPage';
import { COLORS } from '../constants/COLORS';
import ChangePasswd from '../screens/Profile/ChangePasswd';
import GoogleLocation from '../screens/Profile/GoogleLocation';
import LocationContext from '../context/location';
import CartContext from '../context/cart';
import { useAppState } from '../hooks/appStateManagement';
import { useMutation } from 'react-query';
import { PostAddToCart, getCartItems } from '../api/cart';
import AuthNavigation from './AuthNavigation';



const Stack = createNativeStackNavigator();
const Navigation = ({ location }) => {
    

    const [cart_id, setCartId] = useMMKVStorage('cart_id', storage);
    const { isConnected } = useNetInfo();
    const [user] = useMMKVStorage('user', storage);
    const [error] = useMMKVStorage('error', storage, '')
    const [success] = useMMKVStorage('success', storage, '');
    const [homeAdd] = useMMKVStorage('homeAdd', storage, false)
    const { getLocation, location: locationData } = useContext(LocationContext)


    const { cartItems, setCartItems } = useContext(CartContext);
    const { mutate } = useMutation({
        mutationKey: 'post-cart',
        mutationFn: PostAddToCart,
        onSuccess(data) {
            // console.log(data?.data?.data?._id);
            setCartId(data?.data?.data?._id)
        }
    })

    const { mutate: getCarts } = useMutation({
        mutationKey: 'cartItems',
        mutationFn: getCartItems,
        onSuccess: (data) => {
            if(data?.data?.data?.product){
                setCartItems(data?.data?.data?.product)
            }
          
        }
      });


    const appState = useAppState();

    useEffect(() => {
        if(cart_id && user){
            getCarts({ cartId: cart_id })
        } else if(cart_id) {
            storage.setString('cart_id', '')
        }


        if(location){
            getLocation()
        }
    }, [cart_id, location])
    


    useEffect(() => {
        if (((appState === "background" || appState === "inactive"))) {
            const postCart = async () => {
                try {
                    // const updatedData = cartItems?.map(item => ({
                    //     ...item.item,
                    //     qty: item.qty
                    // }));
                   if(user) mutate({ product: cartItems, cartId: cart_id })
                   else await storage.setStringAsync('cart_id', '')

                } catch (err) {

                } finally {

                }
            }
            postCart()


        }
    }, [appState, cartItems])





    const { height, width } = useWindowDimensions()

    const onReady = useCallback(() => {
        SplashScreen.hide()
    }, [])




    if (!user) {
        return (
            <>
                <NavigationContainer ref={navigationRef} onReady={onReady}>
                    <Stack.Navigator
                        initialRouteName={'Login'}
                        screenOptions={{ headerShown: false }}>
                        {/* <Stack.Navigator initialRouteName={ 'HomeNavigator' } screenOptions={{ headerShown: false }}> */}
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Forget" component={Forget} />
                        <Stack.Screen name='ChangePasswd' component={ChangePasswd} />        
                        {/* <Stack.Screen name='LocationPage' component={LocationPage} />
                        <Stack.Screen name='GoogleLocation' component={GoogleLocation} /> */}
                    </Stack.Navigator>
                </NavigationContainer>


                {
                    isConnected !== null && !isConnected && (
                        <Modal visible transparent>
                            <View style={{ height, width, flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: 293, width: 250, resizeMode: 'contain' }}
                                    source={require('../images/no_internet.jpg')}
                                />
                            </View>
                        </Modal>

                    )
                }

                <Modal visible={!!error || !!success} transparent>
                    <View style={{ backgroundColor: 'rgba(0,0,0,.1)', flex: 1 }}>
                        <Toast error={error} success={success} />
                    </View>
                </Modal>
            </>
        )
    }

    if(!location){
        <View />
    }
    

    if (user) {
        return (
            <>
                <NavigationContainer ref={navigationRef} onReady={onReady}>
                    <Stack.Navigator
                        initialRouteName={location === true ? 'HomeNavigator' : 'LocationPage'}
                        screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='LocationPage' component={LocationPage} />
                        <Stack.Screen name="HomeNavigator" component={AuthNavigation} />
                        <Stack.Screen name='GoogleLocation' component={GoogleLocation} />
                    </Stack.Navigator>
                </NavigationContainer>
                
                {
                    isConnected !== null && !isConnected && (
                        <Modal visible transparent>
                            <View style={{ height, width, flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: 293, width: 250, resizeMode: 'contain' }}
                                    source={require('../images/no_internet.jpg')}
                                />
                            </View>
                        </Modal>

                    )
                }

                <Modal visible={!!error || !!success} transparent>
                    <View style={{ backgroundColor: 'rgba(0,0,0,.1)', flex: 1 }}>
                        <Toast error={error} success={success} />
                    </View>
                </Modal>
            </>
        )
    }
}

export default Navigation

const styles = StyleSheet.create({
    modal: { backgroundColor: 'rgba(0,0,0,.5)', flex: 1, justifyContent: 'center', alignItems: 'center' },
    box: {
        backgroundColor: COLORS.white,
        width: '80%',
        padding: 20,
        borderRadius: 10
    },
    box__container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    box__btn: {
        width: '45%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    box__header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    header__main: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: COLORS.dark,
        width: '60%'
    },
    box__description: {
        color: COLORS.light,
        fontFamily: 'Poppins-Medium',
        marginVertical: 3
    },
    btn__text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16
    }
})