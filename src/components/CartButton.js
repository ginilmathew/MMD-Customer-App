import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '../../App';
import IonIcon from 'react-native-vector-icons/Ionicons'


const CartButton = ({ onPress: callback, toCart, grand, w }) => {

    const [disable, setDisable] = useState(false);

    // const [products] = useMMKVStorage('products', storage, (storage.getMap('products') || {})); // cart items
    // const minimum = Object.keys(products)?.filter(key => products[key]?.quantity && products[key]?.price).length;
    const minimum = 0
    const user = storage.getMap('user');
    const total = 0;
    // const total = useMemo(() => {
    //     let sum = 0;
    //     for (const key in products) {
    //         if (products[key]?.quantity && products[key]?.price) {
    //             sum += products[key].quantity * products[key].price
    //         }
    //     }

    //     return !isNaN(sum) ? sum.toFixed(2) : sum;
    // }, [products])


    const onPress = useCallback(() => {
        if (!disable) {
            setDisable(true);
            callback();
        }
    }, [disable, callback])

    if (!user || (toCart && minimum <= 0)) {
        return null;
    }

    return (
        <TouchableOpacity
            disabled={grand ? disable : null}
            onPress={grand ? onPress : callback}
            activeOpacity={0.8}
            style={styles.container}
        >
            <View style={styles.leftContainer}>
                <IonIcon
                    color="#fff" 
                    name='cart'
                />
                {/* <Image
                    source={grand ? require('../assets/images/wallet.png') : require('../assets/images/cart.png')}
                    resizeMode='contain'
                    style={styles.icon}
                /> */}
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>{"Go to Cart"}</Text>
                    {/* <View style={styles.subTextContainer}>
                        <Text style={styles.subText}>{minimum}</Text>
                        <Text style={styles.subText}>{`${minimum > 1 ? 'items' : 'item'}`}</Text>
                    </View> */}
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.totalText}>{grand ? "grand_total" : 'total'}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{grand || total}</Text>
                    <Text style={styles.currency}>SAR</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        bottom: 60,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 60,
        marginHorizontal: 20,
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: 10
    },
    leftContainer: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        paddingLeft: 10,
        flex: 3
    },
    icon: {
        height: 24,
        width: 24,
        marginRight: 10
    },
    textContainer: {
        justifyContent: 'center',
        flexShrink: 1
    },
    mainText: {
        fontFamily: 'Quicksand-Bold',
        color: 'white',
        fontSize: 16
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
        backgroundColor: 'red',
        flex: 1,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 8,
        paddingLeft: 8,
        borderRadius: 10,
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