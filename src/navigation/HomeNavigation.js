import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Orders from '../screens/orders';
import Profile from '../screens/Profile';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { COLORS } from '../constants/COLORS';
import Header from '../components/Header';
import EditProfile from '../screens/Profile/EditProfile';
import AddAddress from '../screens/Profile/AddAddress';
import SingleCategory from '../screens/Category/singleCategory';
import AllProducts from '../screens/AllProducts';
import Category from '../screens/Category';
import SingleOrder from '../screens/orders/SingleOrder';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, FadeInDown, BounceIn, BounceOut, FadeInUp } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { storage } from '../../App';
import LocationPage from '../screens/auth/LocationPage';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import locationContext from '../context/location';
import { navigationRef } from './RootNavigation';



const Tab = createBottomTabNavigator();

function HomeNavigation({ navigation }) {

    const { width } = useWindowDimensions()
    const [user] = useMMKVStorage('user', storage)



    const navToHome = useCallback(() => {
        navigation.navigate("Home")
    }, [navigation]);

    const navToOrder = useCallback(() => {
        navigation.navigate("Orders")
    }, [navigation]);

    const navToProfile = useCallback(() => {
        navigation.navigate("Profile")
    }, [navigation]);

    const FixedComponent = () => {
        // Add your fixed component here
        return (
            <View style={styles.fixedComponent}>
                {/* Your fixed component content goes here */}
            </View>
        );
    };


    const toCart = useCallback(() => {
        navigation.navigate('Profile')
    }, [navigation])

    const toNotification = useCallback(() => {
        navigation.navigate('Notification')
    }, [navigation])

//     const animatedValue = useSharedValue(0);

//   const iconStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: withTiming(animatedValue.value, { duration: 300 }),
//         },
//       ],
//     };
//   });

//   useEffect(() => {
//     animatedValue.value = withSpring(1);
//   }, [animatedValue]);

//   useFocusEffect(
//     useCallback(() => {
//       return () => {
//         // Clean up the animation when the screen is unfocused
//         animatedValue.value = withTiming(0);
//       };
//     }, [animatedValue])
//   );

    // storage.removeItem('user')

    const routeName = navigationRef?.getCurrentRoute()?.name;

    return (
        <>

            {
                (!routeName || routeName === 'Home') ? null : <Header toCart={toCart} toNotification={toNotification} />
            }

            <Tab.Navigator
                screenOptions={({ route }) => {

                    return ({
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        tabBarLabel: () => '',
                        tabBarIcon: ({ focused }) => (
                              <Animated.View entering={FadeInUp.delay(200).duration(200).springify().damping(12)}>
                                <TouchableOpacity onPress={route?.name === 'Home' ? navToHome : route?.name === "Orders" ? navToOrder : navToProfile} style={[{
                                    width: Math.floor(width / 3),
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}>

                                    <View style={[styles.icon, route?.name === "Orders" && { borderRightWidth: 2, borderLeftWidth: 2 }]}>
                                        <IonIcons name={route?.name === "Home" ?
                                            focused ? 'home' : 'home-outline'
                                            : route?.name === "Orders" ?
                                                focused ? 'basket' : 'basket-outline'
                                                : focused ? 'person-circle' : 'person-circle-outline'} color={focused ? COLORS.primary : COLORS.light} size={25} />
                                    </View>

                                </TouchableOpacity>
                            </Animated.View>
                        ),
                    })
                }}

            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Orders" component={Orders} />
                <Tab.Screen name='Profile' component={Profile} />

            </Tab.Navigator>
        </>
    );
}


const styles = StyleSheet.create({
    border: {
        height: 27,
        width: 2,
        backgroundColor: COLORS.gray
    },
    icon: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        borderColor: COLORS.gray,
    }
})

export default HomeNavigation