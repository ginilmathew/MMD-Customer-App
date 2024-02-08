import React, { useState, useCallback, useEffect, useReducer, useContext, useRef, useMemo } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import { COLORS } from '../../constants/COLORS';
import CommonSelectDropdown from '../../components/CustomDropDown';
import CustomDropdown from '../../components/CommonDropDown';
import reactotron from 'reactotron-react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { AddToCart } from '../../components/ItemCard';
import Entypo from 'react-native-vector-icons/Entypo'
import { useMutation, useQuery } from 'react-query';
import { PostAddToCart } from '../../api/cart';
import CartContext from '../../context/cart';
import { singProduct } from '../../api/allProducts';
import SelectDropdown from 'react-native-select-dropdown';
import IonIcon from 'react-native-vector-icons/AntDesign'
import useRefetch from '../../hooks/useRefetch'
import { useFocusEffect } from '@react-navigation/native';
import { storage } from '../../../App';
import { useMMKVStorage } from 'react-native-mmkv-storage';


const SingleProduct = ({ navigation, route }) => {

    const { item } = route.params;
    const [cart_id] = useMMKVStorage('cart_id', storage);


    const [qty, setQty] = useState(null)
    const { cartItems, setCartItems, } = useContext(CartContext);
    reactotron.log({ cartItems })
    const { data, refetch } = useQuery({
        queryKey: 'single-product',
        initialData: item,
        queryFn: () => singProduct(item?.slug),
        onSuccess(data) {
            const initialQty = cartItems?.find(({ _id }) => _id === item?._id);
            setQty(initialQty?.qty || 1)
        },
        keepPreviousData: false
    })

    const [unit, setUnit] = useState("")
    const [unitList, setUnitList] = useState([])
    const { height } = useWindowDimensions()
    const [price, setPrice] = useState(0)
    const [selectedValue, setSelectedValue] = useState('')

    const variantRef = useRef(null);
    const unitRef = useRef(null);
    useRefetch(refetch)

    useFocusEffect(useCallback(() => {
        setQty(null)
        variantRef?.current?.reset()
        unitRef?.current?.reset()
        setUnit('')
        setSelectedValue('')
    }, []))

    // useEffect(() => {
    //     const focus = navigation.addListener('focus', () => {
    // setUnit(item.units[0]?.name)
    //     })

    //     const blur = navigation.addListener('blur', () => {
    //         variantRef?.current?.reset()
    //         unitRef?.current?.reset()
    //         setUnit('')
    //     })

    //     return () => {
    //         blur();
    //         focus()
    //     };
    // }, [data])

    useEffect(() => {
        if (data) {
            const list = item.units?.filter(({ name }) => name === unit)?.[0]?.variants?.map(({ name }) => name);
            setUnitList(list)
        }
    }, [unit, data])



    useEffect(() => {
        if (data) {
            let total = item.units?.[0]?.variants?.map(item => (
                item.offerPrice ? item.offerPrice ?? 0 : item.sellingPrice ?? 0
            ))
            let lowestPrice = Math.min(...total);
            setPrice(lowestPrice)
        }
    }, [data])


    const { mutate, isLoading } = useMutation({
        mutationKey: 'add-cart',
        mutationFn: PostAddToCart,
        onSuccess(data) {
            let myStructure = data?.data?.data?.product?.map((res) => (
                {
                    _id: res?._id,
                    qty: res?.qty,
                    unit_id: res?.unit?.id,
                    varientname: res?.variant?.name,
                    item: { ...res }
                }
            ))
            setCartItems(myStructure)
            storage.setString('success', 'Successfully added to cart')
        }
    })


    const defaultVal = useMemo(() => {
        if (data) {
            const initialQty = cartItems?.find(({ _id }) => _id === item?._id);

            if (initialQty) {
                return { unit: initialQty?.item?.unit, variant: initialQty?.item?.variant?.name };
            } else {
                return { unit: item.units[0]?.name, variant: item.units[0]?.variants[0]?.name }
            }

        }
    }, [data])


    const handleAddCart = useCallback(() => {

        const unitId = item.units?.find(({ name }) => name === (unit || item.units[0]?.name))
        const variant = unitId?.variants?.find(({ name }) => name === (selectedValue || unitId?.variants[0]?.name));
        const { variants, ...unitWithoutVariants } = { unitId };

        let selectedItem = {
            ...data?.data?.data?.product,
            _id: data?.data?.data?.product?._id,
            qty,
            image: Array.isArray(item?.image[0]) ? item?.image[0] : item?.image,
            unit: { id: unitWithoutVariants?.unitId?.id, name: unitWithoutVariants?.unitId?.name },
            variant: variant
        };

        // const productDetails = {
        //     item: {
        //         ...item,
        //         unit: { id: unitId?.id, name: unitId?.name },
        //         variant,
        //         qty
        //     },
        //     unit_id: unitId?.id,
        //     varientname: variant?.name,
        //     qty
        // }

        let filtering = cartItems?.filter(({ _id }) => _id !== item?._id)?.map(({ item }) => {
            if (item?.item) {
                const { item, ...others } = item?.item;
                return others;
            }
            return item;
        })

        mutate({
            product: [selectedItem, ...filtering],
            cartId: cart_id ? cart_id : null
        })

        storage.setString('success', 'Successfully added to cart')
    }, [qty, cartItems, unit, item, data, selectedValue])


    const BASEPATHPRODCT = item?.imageBasePath || "";
    const units = item.units?.map(({ name }) => name)


    return (
        <View style={[styles.mainContainer, { height: height, }]}>
            <Header />
            <CommonHeader heading={item?.name?.length > 18 ? item?.name?.slice(0, 18) + "..." : item?.name} backBtn />
            <ScrollView
                contentContainerStyle={[styles.container]}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <Animated.Image source={{ uri: BASEPATHPRODCT + item?.image?.[0] || "" }} style={styles.mainImage} resizeMode="contain" sharedTransitionTag={item?._id} />
                {/* <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.smallImagesContainer}
                >
                    {smallImages.map((image, index) => (
                        <SmallImage key={index} image={image} onPress={handleImagePress} />
                    ))}
                </ScrollView> */}
                <ProductData item={data?.data?.data?.product} price={price} />

                <View style={styles.dropdownContainer}>

                    <View style={{
                        width: 80,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginLeft: 'auto'
                    }}>
                    </View>


                    <View style={styles.dropDown}>
                        <View style={{
                            width: '45%'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                marginBottom: 10,
                            }}>Unit</Text>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: COLORS.primary_light,
                                borderRadius: 10,
                                // paddingRight: 10
                            }}>
                                <SelectDropdown
                                    ref={unitRef}
                                    data={units}
                                    defaultValue={defaultVal?.unit}
                                    buttonTextStyle={{
                                        fontSize: 13
                                    }}
                                    defaultButtonText={'Select'}
                                    buttonStyle={{
                                        width: '90%',
                                        borderRadius: 10,
                                        backgroundColor: COLORS.primary_light
                                    }}
                                    onSelect={(selectedItem, index) => {
                                        setUnit(selectedItem)
                                        variantRef?.current?.reset()
                                    }}
                                />

                                {/* <IonIcon name='arrowright' color={COLORS.blue} size={20} /> */}
                            </View>
                        </View>

                        <View style={{
                            width: '45%'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                marginBottom: 10,
                            }}>Variant</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: 10,
                                backgroundColor: COLORS.primary_light,
                                // paddingRight: 10
                            }}>
                                <SelectDropdown
                                    ref={variantRef}
                                    data={unitList}
                                    defaultValue={defaultVal?.variant}
                                    buttonTextStyle={{
                                        fontSize: 13,
                                    }}
                                    defaultButtonText={'Select'}
                                    renderSearchInputLeftIcon={() => <IonIcon name='home' size={23} />}
                                    buttonStyle={{
                                        width: '90%',
                                        borderRadius: 10,
                                        backgroundColor: COLORS.primary_light
                                    }}
                                    disabled={unitList?.length === 0}
                                    onSelect={(value) => {
                                        setSelectedValue(value)
                                    }}
                                />

                                {/* <IonIcon name='arrowright' color={COLORS.blue} size={20} /> */}
                            </View>
                        </View>
                    </View>

                </View>

                {data?.data?.data?.product?.details ? <AboutSection item={data?.data?.data?.product} /> : null}
                {data?.data?.data?.product?.description ? <DescriptionSection item={data?.data?.data?.product} /> : null}
            </ScrollView>


            <View style={{
                // marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 60,
                paddingHorizontal: 10,
                position: 'absolute',
                bottom: 20,
                left: 0,
                right: 0,
            }}>

                {/* Button */}
                <View style={{
                    flexDirection: 'row',
                    width: '40%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: COLORS.gray
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: COLORS.primary,
                        padding: 10,
                        height: '100%',
                    }} onPress={() => {
                        setQty(qty => {
                            if (qty > 1) return qty - 1
                            else return qty;
                        })
                    }}>
                        <Entypo name='minus' size={25} color='#fff' />
                    </TouchableOpacity>

                    <Text style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.dark
                    }}>{qty}</Text>

                    <TouchableOpacity style={{
                        backgroundColor: COLORS.primary,
                        padding: 10,
                        height: '100%',
                    }} onPress={() => {
                        setQty(qty + 1)
                    }}>
                        <Entypo name='plus' size={25} color='#fff' />
                    </TouchableOpacity>

                </View>

                <BuyButton loading={isLoading} disabled={!unit || !selectedValue} onPress={handleAddCart} />

            </View>
        </View>
    );
};



const SmallImage = React.memo(({ image, onPress }) => (
    <TouchableOpacity onPress={() => onPress(image)}>
        <Image source={image} style={styles.smallImage} resizeMode="cover" />
    </TouchableOpacity>
));



const ProductData = React.memo(({ item, price }) => {
    return (
        <View style={styles.containerProduct}>
            <View style={styles.leftSide}>
                <Text style={styles.heading}>{item?.name}</Text>
                <Text style={styles.subheading}>Category : {item?.category?.name}</Text>
            </View>
            <View style={styles.rightSide}>
                <Text style={styles.price}>₹ {price}</Text>
                {/* <Text style={styles.stock}>Stock</Text> */}
            </View>
        </View>
    );
});



const AboutSection = React.memo(({ item }) => (
    <View style={[styles.aboutContainer, { marginTop: 10 }]}>
        <Text style={styles.containerHeading}>About Product</Text>
        <Text style={styles.descriptionText}>
            {item?.details}
        </Text>
    </View>
));



const DescriptionSection = React.memo(({ item }) => (
    <View style={styles.descriptionContainer}>
        <Text style={styles.containerHeading}>Description</Text>
        <Text style={styles.descriptionText}>
            {item?.description}
        </Text>
    </View>
));



const BuyButton = React.memo(({ onPress, loading, disabled }) => (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: disabled ? COLORS.primary_light : COLORS.primary }]} disabled={disabled} onPress={loading ? null : onPress}>
            {
                loading ? (
                    <ActivityIndicator color={'#fff'} />
                ) : (
                    <Text style={styles.buttonText}>Add to Cart</Text>
                )
            }
        </TouchableOpacity>
    </View>
));


const styles = StyleSheet.create({
    mainContainer: { backgroundColor: '#fff', paddingBottom: 60 },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    mainImage: {
        borderRadius: 6,
        width: '100%',
        height: 150,
        marginBottom: 10,
    },
    smallImagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5,
    },
    containerProduct: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    },
    dropDown: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        gap: 20
    },
    dropdownContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F2F2F2',
        borderRadius: 2,
        borderStyle: "dashed",
        paddingVertical: 20,
    },

    leftSide: {
        flex: 0.8,
        marginRight: 10,
    },
    rightSide: {
        flex: 0.2,
    },
    heading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: COLORS.light,
    },
    subheading: {
        fontFamily: 'Poppins-Italic',
        fontSize: 12,
        color: COLORS.light,
        opacity: 0.5
    },
    price: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: COLORS.dark
    },
    stock: {
        fontFamily: 'Poppins-bold',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
        color: COLORS.red,
        textAlign: 'right',
    },
    descriptionContainer: {
        marginBottom: 60,
    },
    aboutContainer: {
        marginBottom: 10,

    },
    containerHeading: {
        fontFamily: 'Poppins-Medium',
        color: COLORS.light,
        letterSpacing: 1,
        fontSize: 14
    },
    descriptionText: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        lineHeight: 24,
        color: COLORS.light,
        marginTop: 2
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,

    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },

});

export default SingleProduct;