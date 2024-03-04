import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigation from './HomeNavigation';
import SingleOrder from '../screens/orders/SingleOrder';
import NotificationPage from '../screens/notification';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
import Category from '../screens/Category';
import AllProducts from '../screens/AllProducts';
import SingleCategory from '../screens/Category/singleCategory';
import Search from '../screens/search';
import SingleProduct from '../screens/AllProducts/SingleProduct';
import FeaturedProduct from '../screens/featuredProducts';
import LocationPage from '../screens/auth/LocationPage';
import EditProfile from '../screens/Profile/EditProfile';
import AddAddress from '../screens/Profile/AddAddress';
import ChangePasswd from '../screens/Profile/ChangePasswd';
import GoogleLocation from '../screens/Profile/GoogleLocation';
import MapAddress from '../screens/Profile/MapAddress';
import OrderPlaced from '../screens/checkout/OrderPlaced';
import EditAddress from '../screens/checkout/EditAddress';
import ProcessingOrder from '../screens/checkout/ProcessingOrder';
import Highlights from '../screens/Highlights';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={"home"}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={HomeNavigation} />
            <Stack.Screen name="SingleOrder" component={SingleOrder} />
            <Stack.Screen name="Notification" component={NotificationPage} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="AllProducts" component={AllProducts} />
            <Stack.Screen name="SingleCategory" component={SingleCategory} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SingleProduct" component={SingleProduct} />
            <Stack.Screen name="FeaturedProduct" component={FeaturedProduct} />
            <Stack.Screen name='LocationPage' component={LocationPage} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='Address' component={AddAddress} />
            <Stack.Screen name='ChangePasswd' component={ChangePasswd} />
            <Stack.Screen name='GoogleLocation' component={GoogleLocation} />
            <Stack.Screen name='MapPage' component={MapAddress} />
            <Stack.Screen name='OrderPlaced' component={OrderPlaced} />
            <Stack.Screen name='EditAddress' component={EditAddress} />
            <Stack.Screen name='Processing' component={ProcessingOrder} />
            <Stack.Screen name='Highlights' component={Highlights}/>
        </Stack.Navigator>
    )
}

export default AuthNavigation

const styles = StyleSheet.create({})