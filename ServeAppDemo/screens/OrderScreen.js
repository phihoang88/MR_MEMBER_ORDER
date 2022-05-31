import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    ScrollView,
    FlatList
} from 'react-native'

import { images } from '../config'
import OrderItem from './subScreens/OrderItem'
import { listMenu } from '../contents'


const OrderScreen = (props) => {
    const [orders, setOrders] = useState(listMenu)

    return <View style={styles.container}>
        <ImageBackground
            style={styles.img_background}
            source={images.backgroundApp}>
            

        </ImageBackground>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img_background: {
        flex: 1,
        padding: 5
    }


})



export default OrderScreen

