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
import { listMenu } from '../contents'
import ReceiptItem from './subScreens/ReceiptItem'


const ReceiptScreen = (props) => {
    const [orders, setOrders] = useState(listMenu)

    return <View style={styles.container}>
        <ImageBackground
            style={styles.img_background}
            source={images.backgroundApp}>
            <FlatList
                data={orders}
                renderItem={({ item }) =>
                    <ReceiptItem order={item}
                               key={item.order_id}
                               onPress={() => {
                                    //alert(item.order_id)
                               }} />}
                keyExtractor={item => item.order_id}
            />

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



export default ReceiptScreen

