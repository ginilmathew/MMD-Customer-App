import React, { useState, useCallback, useEffect, useReducer, useContext, useRef } from 'react';
import {
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
import Animated from 'react-native-reanimated';
import { AddToCart } from '../../components/ItemCard';
import Entypo from 'react-native-vector-icons/Entypo'
import { useMutation, useQuery } from 'react-query';
import { PostAddToCart } from '../../api/cart';
import CartContext from '../../context/cart';
import { singProduct } from '../../api/allProducts';
import SelectDropdown from 'react-native-select-dropdown';


let status = true;

const SingleProduct = ({ route }) => {

    const { item } = route.params;
    const { data } = useQuery({
        queryKey: 'single-product',
        queryFn: () => singProduct(item?.slug)
    })

    const variantRef = useRef(null);

    const [unit, setUnit] = useState('')
    const [unitList, setUnitList] = useState([])


    useEffect(() => {
        if (data) {
            const list = data?.data?.data.product.units?.filter(({ name }) => name === unit)?.[0]?.variants?.map(({ name }) => name);
            setUnitList(list)
        }
    }, [unit, data])

    const { cartItems, setCartItems, } = useContext(CartContext);
    const { mutate } = useMutation({
        mutationKey: 'add-cart',
        mutationFn: PostAddToCart
    })


    const initialQty = cartItems?.find(({ _id }) => _id === item?._id);

    const reducer = (state, action) => {

        if (action?.type.includes('variant_')) {
            return {
                ...state,
                variant: {
                    ...state?.variant,
                    [action.type.replace('variant_', '')]: action.value
                }
            }
        }

        for (let i = 0; i < item?.units?.length; i++) {
            switch (action?.type) {
                case item?.units[i]?.name: {
                    return {
                        ...state,
                        [`${item?.units[i]?.name}`]: action?.value
                    }
                }
                default:
                    return state
            }
        }

        return state;
    }

    const handleAddCart = useCallback(() => {
        const updatedData = cartItems.map(product => {
            if (item?._id === product?._id) {
                return {
                    ...product,
                    qty,
                    item: {
                        ...product?.item,
                        qty
                    }
                }
            }
            return product
        });
        mutate({ product: updatedData });
    }, [qty, cartItems])

    useEffect(() => {
        for (let i = 0; i < item?.units?.length; i++) {
            for (let j = 0; j < item?.units[i]?.variants?.length; j++) {
                dispatch({ type: 'variant_' + item?.units[i]?.id, value: item?.units[i]?.variants[j]?.name })
            }
        }
    }, [])



    const { height } = useWindowDimensions()
    const [mainImage, setMainImage] = useState(require('../../images/spinach.jpg'));
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(initialQty?.qty || 1)
    const [selectedValue, setSelectedValue] = useState('')

    const [state, dispatch] = useReducer(reducer, { variant: {} });

    const handleImagePress = useCallback((image) => {
        setMainImage(image);
    }, []);


    const BASEPATHPRODCT = item?.imageBasePath;

    const items = item?.units?.[0]?.variants?.map((value) => {
        return (
            { label: value?.name, value: value?.sellingPrice }
        )
    });

    useEffect(() => {
        if (item) {
            let total = item?.units?.[0]?.variants?.map(item => (
                item.offerPrice ? item.offerPrice ?? 0 : item.sellingPrice ?? 0
            ))
            let lowestPrice = Math.min(...total);
            setPrice(lowestPrice)
        }
    }, [item])


    const units = data?.data?.data.product.units?.map(({ name }) => name)


    return (
        <View style={{ backgroundColor: '#fff', height: height, paddingBottom: 60 }}>
            <Header />
            <CommonHeader heading={item?.name?.length > 18 ? item?.name?.slice(0, 18) + "..." : item?.name} backBtn />
            <ScrollView
                contentContainerStyle={[styles.container]}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <Animated.Image source={{ uri: BASEPATHPRODCT + item?.image?.[0] }} style={styles.mainImage} resizeMode="contain" sharedTransitionTag={item?._id} />
                {/* <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.smallImagesContainer}
                >
                    {smallImages.map((image, index) => (
                        <SmallImage key={index} image={image} onPress={handleImagePress} />
                    ))}
                </ScrollView> */}
                <ProductData item={item} price={price} />

                <View style={styles.dropdownContainer}>

                    <View style={{
                        width: 80,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginLeft: 'auto'
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.primary,
                            paddingHorizontal: 4,
                            paddingVertical: 4,
                            borderRadius: 6,
                            marginRight: 2,
                        }} onPress={() => {
                            setQty(qty => {
                                if (qty > 1) return qty - 1
                                else return qty;
                            })
                        }}>
                            <Entypo name='minus' size={15} color='#fff' />
                        </TouchableOpacity>

                        <Text style={{
                            justifyContent: 'center',
                            textAlign: 'center',
                            minWidth: 20,
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: COLORS.dark
                        }}>{qty}</Text>

                        <TouchableOpacity style={{
                            backgroundColor: COLORS.primary,
                            paddingHorizontal: 4,
                            paddingVertical: 4,
                            borderRadius: 6,
                            marginRight: 2,
                        }} onPress={() => {
                            setQty(qty + 1)
                        }}>
                            <Entypo name='plus' size={15} color='#fff' />
                        </TouchableOpacity>
                    </View>


                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 20,
                        justifyContent: 'center',
                        gap: 10
                    }}>
                        <View style={{
                            width: '45%'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                marginBottom: 10,
                            }}>Units</Text>
                            <SelectDropdown
                                data={units}
                                buttonTextStyle={{
                                    fontSize: 13
                                }}
                                defaultButtonText={null}
                                buttonStyle={{
                                    width: '100%',
                                    borderRadius: 10,
                                }}
                                onSelect={(selectedItem, index) => {
                                    setUnit(selectedItem)
                                    console.log(variantRef.current.reset())
                                }}
                            />
                        </View>

                        <View style={{
                            width: '45%'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                marginBottom: 10,
                            }}>Variant</Text>

                            <SelectDropdown
                                ref={variantRef}
                                data={unitList}
                                buttonTextStyle={{
                                    fontSize: 13,
                                }}
                                defaultButtonText={null}
                                buttonStyle={{
                                    width: '100%',
                                    borderRadius: 10,
                                }}
                                disabled={unitList?.length === 0}
                                onSelect={(value) => {
                                    setSelectedValue(value)
                                }}
                            />
                        </View>
                    </View>

                    {/* {item?.units.map((item, i) => {
                        console.log(state)
                        return (<CommonSelectDropdown changeValue={(props) => {
                            // dispatch({ type: item?.name, value: props?.label })
                            dispatch({ type: 'variant_' + item?.id, value: props?.label })
                            return changeValue(props)
                        }} topLabel={item?.name} key={item?.id} value={state?.variant ? state?.variant[item?.id] : null} datas={item?.variants?.map((value) => {
                            return (
                                { label: value?.name, value: value?.sellingPrice }
                            )
                        })} />)
                    })} */}


                    {/* <CommonSelectDropdown changeValue={() => {}} datas={unitList?.map((name) => {
                        return (
                            { label: name, value: name }
                        )
                    })} />

                    <CommonSelectDropdown changeValue={() => { }} datas={units?.map((name) => {
                        return (
                            { label: name, value: name }
                        )
                    })} /> */}
                </View>
                {item?.details ? <AboutSection item={item} /> : null}
                {item?.description ? <DescriptionSection item={item} /> : null}
            </ScrollView>
            <View>
                <BuyButton onPress={handleAddCart} />
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



const BuyButton = React.memo(({ onPress }) => (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
    </View>
));


const styles = StyleSheet.create({
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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