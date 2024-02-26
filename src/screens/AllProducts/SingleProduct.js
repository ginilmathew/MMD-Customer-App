import React, { useState, useEffect, useContext, useRef } from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import { COLORS } from '../../constants/COLORS'
import Animated, { interpolate } from 'react-native-reanimated';
import { AddToCart } from '../../components/ItemCard';
import Entypo from 'react-native-vector-icons/Entypo'
import { useMutation, useQuery } from 'react-query';
import { PostAddToCart } from '../../api/cart';
import CartContext from '../../context/cart';
import { singProduct } from '../../api/allProducts';
import SelectDropdown from 'react-native-select-dropdown';
import IonIcon from 'react-native-vector-icons/AntDesign'
import { storage } from '../../../App';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const SingleProduct = ({ navigation, route }) => {

    const { item } = route.params;
    const { height } = useWindowDimensions()
    const [selectedUnit, setSelectedUnit] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [variantsList, setVariantsList] = useState([])
    const [unitList, setUnitList] = useState([])
    const [product, setProduct] = useState(null)
    const [price, setPrice] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const insets = useSafeAreaInsets();



    const [qty, setQty] = useState(null)
    const { cartItems, addItemToCart } = useContext(CartContext);
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

    useEffect(() => {

        async function setInitialDatas(product) {

            setSelectedUnit(product?.units?.[0])
            setUnitList(product?.units?.map(unit => unit?.name))

            setVariantsList(product?.units?.[0]?.variants?.map(vari => vari?.name))
            setSelectedVariant(product?.units?.[0]?.variants?.[0])



            //let quanti = cartsDatas?.find(cart => cart?._id === product?._id && cart?.unit?.id === product?.units?.[0]?.id && product?.units?.[0]?.variants?.[0]?.name === cart?.variant?.name)

            //if (quanti) {
            setQuantity(route?.params?.quantity)
            //}


        }

        if (data?.data?.data?.product) {
            let product = data?.data?.data?.product
            setProduct(product)
            setInitialDatas(product)
        }
    }, [data?.data?.data?.product?._id])



    useEffect(() => {
        if (selectedVariant && selectedUnit) {
            let price;
            let tax = product?.subcategories?.tax ? product?.subcategories?.tax : product?.categories?.tax
            const { offerPrice, fromDate, toDate, sellingPrice, costPrice } = selectedVariant

            if (fromDate && toDate && offerPrice) {

                let startDate = moment(fromDate, "YYY-MM-DD").add(-1, 'day');
                let endDate = moment(toDate, "YYYY-MM-DD").add(1, 'day')
                if (moment().isBetween(startDate, endDate)) {
                    price = {
                        ...selectedVariant,
                        finalPrice: offerPrice,
                        hasOfferPrice: true,
                        discount: parseFloat(sellingPrice) - parseFloat(offerPrice),
                        discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(offerPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
                        unitName: selectedUnit?.name,
                        tax,
                        taxValue: (offerPrice / 100) * tax
                    }


                }
                else {
                    price = {
                        ...selectedVariant,
                        finalPrice: sellingPrice,
                        hasOfferPrice: false,
                        discount: 0,
                        discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
                        unitName: selectedUnit?.name,
                        tax,
                        taxValue: (sellingPrice / 100) * tax
                    };
                }
            }
            else {

                price = {
                    ...selectedVariant,
                    finalPrice: sellingPrice,
                    hasOfferPrice: false,
                    discount: 0,
                    discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
                    unitName: selectedUnit.name,
                    tax,
                    taxValue: (sellingPrice / 100) * tax
                };

            }

            setPrice(price)
        }
    }, [selectedVariant, selectedUnit])



    // function calculatePrice() {

    // }


    // const [unit, setUnit] = useState("")
    // const [unitList, setUnitList] = useState([])

    // const [selectedValue, setSelectedValue] = useState('')

    const variantRef = useRef(null);
    const unitRef = useRef(null);
    // useRefetch(refetch)

    // useFocusEffect(useCallback(() => {
    //     setQty(null)
    //     variantRef?.current?.reset()
    //     unitRef?.current?.reset()
    //     setUnit('')
    //     setSelectedValue('')
    // }, []))

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

    // useEffect(() => {
    //     if (data) {
    //         const list = item.units?.filter(({ name }) => name === unit)?.[0]?.variants?.map(({ name }) => name);
    //         setUnitList(list)
    //     }
    // }, [unit, data])



    // useEffect(() => {
    //     if (data) {
    //         let total = item.units?.[0]?.variants?.map(item => (
    //             item.offerPrice ? item.offerPrice ?? 0 : item.sellingPrice ?? 0
    //         ))
    //         let lowestPrice = Math.min(...total);
    //         setPrice(lowestPrice)
    //     }
    // }, [data])


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
            //setCartItems(myStructure)
            storage.setString('success', 'Successfully added to cart')
        }
    })


    // const defaultVal = useMemo(() => {
    //     if (data) {
    //         const initialQty = cartItems?.find(({ _id }) => _id === item?._id);

    //         if (initialQty) {
    //             return { unit: initialQty?.item?.unit, variant: initialQty?.item?.variant?.name };
    //         } else {
    //             return { unit: item.units[0]?.name, variant: item.units[0]?.variants[0]?.name }
    //         }

    //     }
    // }, [data])


    // const handleAddCart = useCallback(() => {

    //     const unitId = item.units?.find(({ name }) => name === (unit || item.units[0]?.name))
    //     const variant = unitId?.variants?.find(({ name }) => name === (selectedValue || unitId?.variants[0]?.name));
    //     const { variants, ...unitWithoutVariants } = { unitId };

    //     let selectedItem = {
    //         ...data?.data?.data?.product,
    //         _id: data?.data?.data?.product?._id,
    //         qty,
    //         image: Array.isArray(item?.image[0]) ? item?.image[0] : item?.image,
    //         unit: { id: unitWithoutVariants?.unitId?.id, name: unitWithoutVariants?.unitId?.name },
    //         variant: variant
    //     };

    //     // const productDetails = {
    //     //     item: {
    //     //         ...item,
    //     //         unit: { id: unitId?.id, name: unitId?.name },
    //     //         variant,
    //     //         qty
    //     //     },
    //     //     unit_id: unitId?.id,
    //     //     varientname: variant?.name,
    //     //     qty
    //     // }

    //     let filtering = cartItems?.filter(({ _id }) => _id !== item?._id)?.map(({ item }) => {
    //         if (item?.item) {
    //             const { item, ...others } = item?.item;
    //             return others;
    //         }
    //         return item;
    //     })

    //     mutate({
    //         product: [selectedItem, ...filtering],
    //         cartId: cart_id ? cart_id : null
    //     })

    //     storage.setString('success', 'Successfully added to cart')
    // }, [qty, cartItems, unit, item, data, selectedValue])


    const changeQty = () => {
        setQuantity(1)
    }


    useEffect(() => {
        if (product && price) {
            const { description, details, image, imageBasePath, status, units, updated_at, created_at, featuredList, variants, categories, subcategories, unit, ...other } = product


            const { finalPrice, tax, taxValue, costPrice } = price

            let productObj = {
                ...other,
                unit: {
                    id: selectedUnit?.id,
                    name: selectedUnit?.name
                },
                variant: selectedVariant,
                qty: quantity,
                price: finalPrice,
                image: `${imageBasePath}${image[0]}`,
                tax,
                taxValue,
                total: finalPrice + taxValue,
                costPrice
                //tax: 
            }




            addItemToCart(productObj)
        }


    }, [quantity])



    const changeUnit = async (index) => {
        setSelectedUnit(product?.units?.[index])
        setVariantsList(product?.units?.[index]?.variants?.map(vari => vari?.name))
        setSelectedVariant(product?.units?.[index]?.variants?.[0])

        let carts = [...cartItems]
        let quanti = carts?.find(cart => cart?._id === product?._id && cart?.unit?.id === product?.units?.[index]?.id && product?.units?.[index]?.variants?.[0]?.name === cart?.variant?.name)

        if (quanti) {
            setQuantity(quanti?.qty)
        }
        else {
            setQuantity(0)
        }
    }


    const changeVariant = async (index) => {
        let selectedVariant = selectedUnit?.variants[index]
        setSelectedVariant(selectedVariant)

        let carts = [...cartItems]
        let quanti = carts?.find(cart => cart?._id === product?._id && cart?.unit?.id === selectedUnit?.id && selectedVariant?.name === cart?.variant?.name)

        if (quanti) {
            setQuantity(quanti?.qty)
        }
        else {
            setQuantity(0)
        }

        // let price;

        // const { offerPrice, fromDate, toDate, sellingPrice, costPrice } = selectedVariant

        // if (fromDate && toDate && offerPrice) {

        //     let startDate = moment(fromDate, "YYY-MM-DD").add(-1, 'day');
        //     let endDate = moment(toDate, "YYYY-MM-DD").add(1, 'day')
        //     if (moment().isBetween(startDate, endDate)) {
        //         price = {
        //             ...selectedVariant,
        //             finalPrice: offerPrice,
        //             hasOfferPrice: true,
        //             discount: parseFloat(sellingPrice) - parseFloat(offerPrice),
        //             discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(offerPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
        //             unitName: selectedUnit?.name
        //         }


        //     }
        //     else {
        //         price = {
        //             ...selectedVariant,
        //             finalPrice: sellingPrice,
        //             hasOfferPrice: false,
        //             discount: 0,
        //             discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
        //             unitName: selectedUnit?.name
        //         };
        //     }
        // }
        // else {

        //     price = {
        //         ...selectedVariant,
        //         finalPrice: sellingPrice,
        //         hasOfferPrice: false,
        //         discount: 0,
        //         discountPercentage: (100 * (parseFloat(costPrice) - parseFloat(sellingPrice)) / parseFloat(costPrice)).toFixed(2) * 1,
        //         unitName: selectedUnit?.name
        //     };
        // }

        // setPrice(price)
    }


    const BASEPATHPRODCT = item?.imageBasePath || "";
    //const units = item?.units?.map(({ name }) => name)


    return (
        <View style={[styles.mainContainer,]}>
            <View style={{ height: height / 1.05, }}>
                <Header icon={false} />
                <CommonHeader heading={item?.name?.length > 18 ? item?.name?.slice(0, 18) + "..." : item?.name} backBtn />
                <ScrollView
                    contentContainerStyle={[styles.container]}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}>
                    <Animated.Image source={{ uri: BASEPATHPRODCT + item?.image?.[0] || "" }} style={styles.mainImage} resizeMode="contain" sharedTransitionTag={item?._id} />
                    <ProductData item={product} price={price} quantity={quantity} />

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
                                        //ref={unitRef}
                                        data={unitList}
                                        defaultValue={selectedUnit?.name}
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
                                            changeUnit(index)
                                            // setUnit(selectedItem)
                                            // variantRef?.current?.reset()
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
                                        data={variantsList}
                                        defaultValue={selectedVariant?.name}
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
                                        disabled={variantsList?.length === 0}
                                        onSelect={(value, index) => {
                                            changeVariant(index)
                                        }}
                                    />

                                    {/* <IonIcon name='arrowright' color={COLORS.blue} size={20} /> */}
                                </View>
                            </View>
                        </View>

                    </View>

                    {product?.details ? <AboutSection item={product} /> : null}
                    {product?.description ? <DescriptionSection item={product} /> : null}

                </ScrollView>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: "flex-start",
                    width: '100%',
                    // backgroundColor: COLORS.red,
                    height: Platform.OS === 'android' ? 60 : 100,
                    // marginTop: Platform.OS === 'android' ? 0 : -50
                }}>
                    {/* Button */}
                    {quantity > 0 && <View style={{
                        flexDirection: 'row',
                        width: '40%',
                        alignSelf: 'flex-start',
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
                            setQuantity(qty => qty - 1)
                        }}>
                            <Entypo name='minus' size={25} color='#fff' />
                        </TouchableOpacity>

                        <Text style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: COLORS.dark
                        }}>{quantity}</Text>

                        <TouchableOpacity style={{
                            backgroundColor: COLORS.primary,
                            padding: 10,
                            height: '100%',
                        }} onPress={() => {
                            setQuantity(qty => qty + 1)
                        }}>
                            <Entypo name='plus' size={25} color='#fff' />
                        </TouchableOpacity>

                    </View>}

                    {quantity === 0 && <BuyButton
                        loading={isLoading}
                        onPress={changeQty}
                    />}
                </View>
            </View>
        </View>
    );
};



// const SmallImage = React.memo(({ image, onPress }) => (
//     <TouchableOpacity onPress={() => onPress(image)}>
//         <Image source={image} style={styles.smallImage} resizeMode="cover" />
//     </TouchableOpacity>
// ));



const ProductData = React.memo(({ item, price, quantity }) => {
    return (
        <View style={styles.containerProduct}>
            <View style={styles.leftSide}>
                <Text style={styles.heading}>{item?.name}</Text>
                <Text style={styles.subheading}>Category : {item?.category?.name}</Text>
            </View>
            <View style={styles.rightSide}>
                <Text style={styles.price}>₹ {quantity > 1 ? parseFloat(price?.finalPrice) * quantity : price?.finalPrice}</Text>
                {price?.hasOfferPrice &&
                    <Text style={styles.strikePrice}>₹ {quantity > 1 ? parseFloat(price?.sellingPrice) * parseInt(quantity) : price?.sellingPrice}</Text>}
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
        paddingBottom: 100
        //flex: 1
    },
    mainImage: {
        borderRadius: 6,
        width: '100%',
        height: 200,
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
        color: COLORS.dark,
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
        marginBottom: 20,
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
    strikePrice: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 12,
        color: COLORS.light,
        opacity: 0.5,
        marginTop: -5,
        textAlign: 'right',
        textDecorationLine: 'line-through',
    }
});

export default SingleProduct;