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
            {/* <ScrollView>
                {orders.map(or => <OrderItem order={or} key={or.order_id}/>)}
            </ScrollView> */}
            <FlatList
                data={orders}
                renderItem={({ item }) =>
                    <OrderItem order={item}
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



export default OrderScreen

