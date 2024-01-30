import React, { useState, useCallback } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../../components/Header';
import CommonHeader from '../../components/CommonHeader';
import { COLORS } from '../../constants/COLORS';

const SingleProduct = () => {
    const [mainImage, setMainImage] = useState(require('../../images/spinach.jpg'));
    const smallImages = [
        require('../../images/spinach.jpg'),
        require('../../images/spinach.jpg'),
        require('../../images/spinach.jpg'),
    ];

    const handleImagePress = useCallback((image) => {
        setMainImage(image);
    }, []);

    return (
        <>
            <Header />
            <CommonHeader heading={'Spinach....'} backBtn />
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Image source={mainImage} style={styles.mainImage} resizeMode="cover" />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.smallImagesContainer}
                >
                    {smallImages.map((image, index) => (
                        <SmallImage key={index} image={image} onPress={handleImagePress} />
                    ))}
                </ScrollView>
                <ProductData />
                <AboutSection />
              
                <DescriptionSection />
             
            </ScrollView>
            <BuyButton />
        </>
    );
};

const SmallImage = React.memo(({ image, onPress }) => (
    <TouchableOpacity onPress={() => onPress(image)}>
        <Image source={image} style={styles.smallImage} resizeMode="cover" />
    </TouchableOpacity>
));

const ProductData = React.memo(() => {
    return (
        <View style={styles.containerProduct}>
            <View style={styles.leftSide}>
                <Text style={styles.heading}>Product Name</Text>
                <Text style={styles.subheading}>Category : vegitable</Text>
            </View>
            <View style={styles.rightSide}>
                <Text style={styles.price}>₹ 99.99</Text>
                <Text style={styles.stock}>Stock</Text>
            </View>
        </View>
    );
});


const AboutSection = React.memo(() => (
    <View style={styles.aboutContainer}>
        <Text style={styles.containerHeading}>About Product</Text>
        <Text style={styles.descriptionText}>
            {/* Your long description goes here. It will be scrollable */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet justo et
            lacus tincidunt, nec ultrices dolor luctus. Sed auctor scelerisque nisl, vel malesuada
            ligula congue a.
        </Text>
    </View>
));

const DescriptionSection = React.memo(() => (
    <View style={styles.descriptionContainer}>
        <Text style={styles.containerHeading}>Description</Text>
        <Text style={styles.descriptionText}>
            {/* Your long description goes here. It will be scrollable */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet justo et
            lacus tincidunt, nec ultrices dolor luctus. Sed auctor scelerisque nisl, vel malesuada
            ligula congue a.
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

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    mainImage: {
        borderRadius: 6,
        width: '100%',
        height: height / 4,
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
 
        paddingVertical: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    },
    leftSide: {
        flex: 1,
        marginRight: 10,
    },
    rightSide: {
        flex: 1,
    },
    heading: {
      fontFamily: 'Poppins-Regular',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subheading: {
      fontFamily: 'Poppins-Regular',
        fontStyle:'italic',
        fontSize: 14,
        color: COLORS.text,
    },
    price: {
      fontFamily: 'Poppins-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    stock: {
        fontSize: 16,
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
      fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 1,
        fontSize: 16
    },
    descriptionText: {
      fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 24,
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
