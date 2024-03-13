import { View } from "react-native";
import CustomHeading from "../../components/CustomHeading";
import ProductCard from "../../components/ProductCard";
import reactotron from "reactotron-react-native";

const RelatedProduct = ({ item, time, cartItems }) => {

    return (
        <View>
            <CustomHeading label={'Releated Products'} hide={false} marginH={10} />
            {item?.map((item, index) => (
                <View style={{ marginBottom: 10 }}>
                    <ProductCard key={index} item={item} time={time} />
                </View>

            ))}
        </View>
    )
};


export default RelatedProduct;