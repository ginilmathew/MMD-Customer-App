import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Orders from '../screens/orders';
import Profile from '../screens/Profile';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { COLORS } from '../constants/COLORS';
import Header from '../components/Header';
import EditProfile from '../screens/Profile/EditProfile';
import AddAddress from '../screens/Profile/AddAddress';
import ProfileNavigator from './ProfileNavigator';
import LocationContext from '../context/location/locationContext';



const Tab = createBottomTabNavigator();

function HomeNavigation({ navigation }) {

    const { width } = useWindowDimensions()

    const navToHome = useCallback(() => {
        navigation.navigate("Home")
    }, [navigation]);

    const navToOrder = useCallback(() => {
        navigation.navigate("Orders")
    }, [navigation]);

    const navToProfile = useCallback(() => {
        navigation.navigate("ProfileNavigator")
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
        navigation.navigate('ProfileNavigator')
    }, [navigation])

    const toNotification = useCallback(() => {
        navigation.navigate('Notification')
    }, [navigation])

    return (
        <LocationContext>

            <Header toCart={toCart} toNotification={toNotification} />

            <Tab.Navigator
                initialRouteName='Profile'
                screenOptions={({ route }) => {

                    const nav = ['Home', 'ProfileNavigator', 'Orders'].includes(route?.name);

                    return ({
                        headerShown: false,
                        tabBarItemStyle: { display: !nav ? 'none' : 'flex' },
                        tabBarHideOnKeyboard: true,
                        tabBarLabel: () => '',
                        tabBarIcon: ({ focused }) => nav && (
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
                        ),
                    })
                }}

            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Orders" component={Orders} />
                <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} />

            </Tab.Navigator>
        </LocationContext>
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