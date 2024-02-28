import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useContext, useEffect } from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/COLORS';
import CartContext from '../context/cart';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LocationContext from '../context/location';
import { PostAddToCart } from '../api/cart';
import { useMutation } from 'react-query';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { storage } from '../../App';
import { navigationRef } from '../navigation/RootNavigation';
import NotificationContext from '../context/notification';



const Header = memo(({ onPress, text, icon }) => {

    const { cartItems, setCartItems } = useContext(CartContext);
    const { count } = useContext(NotificationContext);
    const { setMode, location } = useContext(LocationContext);
    const [user] = useMMKVStorage('user', storage);
    const [cart_id] = useMMKVStorage('cart_id', storage);
    const navigation = useNavigation();
    const [logo] = useMMKVStorage('dynamicLogo', storage)

    const badgeJumpAnimation = useSharedValue(0);

    const animateBadgeJump = useCallback(() => {
        // Get the position of the button
        const buttonPositionY = 0;
        // Calculate the initial position of the badge
        const initialPosition = buttonPositionY - 20; // Adjust the initial position as needed
        // Animate the badge to the top of the badge
        badgeJumpAnimation.value = initialPosition;
        badgeJumpAnimation.value = withSpring(0);
    }, []);

    


    const { mutate, refetch } = useMutation({
        mutationKey: 'addToCart_query',
        mutationFn: PostAddToCart,
        onSuccess: async (data) => {
            let myStructure = data?.data?.data?.product?.map((res) => ({
                _id: res?._id,
                qty: res?.qty,
                unit_id: res?.unit?.id,
                varientname: res?.variant?.name,
                item: { ...res },
            }));
            setCartItems(myStructure);
            await storage.setStringAsync('cart_id', data?.data?.data?._id);
            navigation.navigate('Cart', { cart_id: data?.data?.data?._id ?? null });
            // Trigger badge jump animation
            animateBadgeJump();
        },
    });

    const notPage = useCallback(() => {
        navigation.navigate('Notification');
    }, [navigation]);

    const cartPage = useCallback(() => {
        navigation.navigate('Cart', { cart_id: null });
        // if (cartItems?.length > 0) {
        //     const updatedData = cartItems?.map((item) => ({
        //         ...item.item,
        //         qty: item.qty,
        //     }));
        //     //mutate({ product: updatedData, cartId: cart_id ? cart_id : null });
        // } else {
        //     navigation.navigate('Cart', { cart_id: null });
        // }
    }, [navigation, cartItems, cart_id]);

    const textLeng = location?.address?.length;

    const changeLoc = () => {
        setMode('home');
        navigation.navigate('GoogleLocation', { mode: 'header' });
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            animateBadgeJump();
        }
    }, [cartItems.length]);

    const badgeAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: badgeJumpAnimation.value }],
        };
    });

    if (user) {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: COLORS.logo }} style={styles.logo} resizeMode='cover'/>
                </View>

                {location && user && (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            gap: 2,
                            marginRight: 30,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={changeLoc}>
                        <IonIcon name="location" size={20} color={COLORS.primary} />
                        <Text
                            style={{
                                fontSize: 11,
                                color: COLORS.dark,
                                fontFamily: 'Poppins-Regular',
                            }}>
                            {location?.address
                                ?.slice(...(textLeng ? [0, 24] : [0]))
                                ?.concat(textLeng ? ' ...' : '')}
                        </Text>
                    </TouchableOpacity>
                )}

                {user && (
                    <View style={styles.iconContainer}>
                        {
                            icon && (
                                <TouchableOpacity onPress={cartPage}>
                                    <IonIcons name="cart" size={20} color={COLORS.light} />
                                    <Animated.View
                                        style={[
                                            styles.cartBadge,
                                            { opacity: cartItems.length > 0 ? 1 : 0 },
                                            badgeAnimatedStyle,
                                        ]}>
                                        <Text style={styles.countStyle}>{cartItems?.length}</Text>
                                    </Animated.View>
                                </TouchableOpacity>
                            )
                        }

                        <TouchableOpacity style={{
                            zIndex: 10
                        }} onPress={notPage}>
                            {count > 0 &&
                                <View style={[styles.badgeStyle, styles.cartBadge, { backgroundColor: COLORS.red }]}>
                                    <Text style={[styles.countStyle]}>{count}</Text>
                                </View>
                            }
                            <IonIcons name="notifications" size={20} color={COLORS.light} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    } else {
        return <View />;
    }
});

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 22,
        height: 60,
        backgroundColor: COLORS.white,
    },
    imageContainer: {
        marginLeft: -5,
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    count: {
        color: COLORS.white,
        fontWeight: '700',
    },
    badgeStyle: {
        backgroundColor: COLORS.red,
        borderRadius: 100,
        position: 'absolute',
        zIndex: 1,
        right: 1,
        top: -6,
        paddingHorizontal: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    countStyle: {
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.white,
        fontSize: 10,
    },
    cartBadge: {
        width: 15,
        height: 15,
        backgroundColor: COLORS.blue,
        borderRadius: 100,
        position: 'absolute',
        right: -4,
        top: -4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
