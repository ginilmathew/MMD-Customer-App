import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { COLORS } from '../../constants/COLORS'
import CommonButton from '../../components/CommonButton'
import locationContext from '../../context/location'

const LocationPage = () => {

    const { location, getLocation } = useContext(locationContext)

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.main_heading}>What's your location?</Text>
                <Text style={styles.description}>We need your location to show available products</Text>
            </View>

            <Image source={require('../../images/building.png')} style={styles.img} />

            <View style={styles.header}>
                <CommonButton text={'Allow location access'} onPress={getLocation} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 20,
    },
    header: {
        height: '20%',
        width: '100%',
        justifyContent: 'center',
    },
    img: {
        height: '60%',
        width: '100%'
    },
    main_heading: {
        fontFamily: 'Poppins-Bold',
        color: COLORS.dark,
        fontSize: 23
    },
    description: {
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        color: COLORS.light
    }
})

export default LocationPage