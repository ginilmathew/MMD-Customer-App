import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../App';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants/COLORS';
import CartContext from '../context/cart';
import { useNavigation } from '@react-navigation/native';


const CartButton = ({ bottom }) => {

    const { cartItems } = useContext(CartContext);
    const [cart_id] = useMMKVStorage('cart_id', storage)
    const navigation = useNavigation()

    const onPress = useCallback(() => {
        navigation.navigate('Cart', { cart_id: cart_id ?? null });
    }, [cart_id, navigation])
    

    const total = cartItems?.reduce((acc, curr) => {
        return acc + parseFloat(curr?.price) * parseFloat(curr?.qty)
    }, 0)

    if(cartItems?.length < 1) return;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.container, { bottom }]}
        >
            <View style={styles.leftContainer}>
                <IonIcon
                    color="#fff"
                    name='cart'
                    size={30}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>{"Go to Cart"}</Text>
                    <Text style={styles.items}>{cartItems?.length} Items</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.totalText}>{'total'}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹ {total}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 60,
        marginHorizontal: 20,
        position: 'absolute',
        borderRadius: 10
    },
    leftContainer: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#b1bd9f',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        flex: 3
    },
    icon: {
        height: 24,
        width: 24,
        marginRight: 10
    },
    textContainer: {
        marginLeft: 20,
        justifyContent: 'center',
        flexShrink: 1
    },
    mainText: {
        fontFamily: 'Quicksand-Bold',
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    items: {
        color: 'white',
        fontSize: 12
    },
    subTextContainer: {
        flexDirection: 'row',

        marginTop: 2
    },
    subText: {
        color: 'white',
        marginRight: 5
    },
    rightContainer: {
        backgroundColor: COLORS.primary,
        flex: 1,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 8,
        paddingLeft: 8,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalText: {
        color: 'white',
        fontSize: 12
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2
    },
    price: {
        fontFamily: 'Quicksand-Bold',
        color: 'white',
        fontSize: 16
    },
    currency: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'flex-end',
        marginLeft: 2
    }
});


export default CartButton