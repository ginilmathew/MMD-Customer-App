import React, { useState, useCallback, useEffect } from 'react';
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

const SingleProduct = ({ route }) => {

    const { item } = route.params;

  
    const { height } = useWindowDimensions()
    const [mainImage, setMainImage] = useState(require('../../images/spinach.jpg'));
    const [select, setSelect] = useState(null)
    const [price, setPrice] = useState(0)
 
    const smallImages = [
        require('../../images/spinach.jpg'),
        require('../../images/spinach.jpg'),
        require('../../images/spinach.jpg'),
    ];

    const handleImagePress = useCallback((image) => {
        setMainImage(image);
    }, []);

    const BASEPATHPRODCT = item?.imageBasePath;

    const items = item?.units?.[0]?.variants?.map(item => (
        { label: item?.name, value: item?.sellingPrice }
    ));


    useEffect(() => {
        if (item) {
            let total = item?.units?.[0]?.variants?.map(item => (
                item.sellingPrice ?? 0
            ))
            let lowestPrice = Math.min(...total);
            setPrice(lowestPrice)
        }
    }, [item])

    const changeValue = (items) => {

        const find = item?.units?.[0]?.variants?.find((res) => res?.name === items?.label)
        //console.log({find})
        setPrice(find.sellingPrice)
        setSelect(items.label);
        // setIsFocus(false);
    }


    return (
        <View style={{ backgroundColor: '#fff', height: height, paddingBottom: 60 }}>
            <Header />
            <CommonHeader heading={item?.name.length > 18 ? item?.name?.slice(0, 18) + "..." : item?.name} backBtn />
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

                    {item?.units.map(item => (<CommonSelectDropdown changeValue={changeValue} topLabel={item?.name} key={item?.id} value={select} setValue={setSelect} datas={items} />))}
                </View>
                {item?.details ? <AboutSection item={item} /> : null}
                {item?.description ? <DescriptionSection item={item} /> : null}
            </ScrollView>
            <View>
                <BuyButton />
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



const BuyButton = React.memo(() => (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
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
