import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList
} from 'react-native'
import { apis, images, contents } from '../config'
import { ProductOrderItem } from '../screens'
import axios from 'axios'
import { requestUserPermission, NotificationListener } from '../lib/pushnotification_helper'
import messaging from '@react-native-firebase/messaging'

const OrderScreen = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation

    // <--------------------------initload--------------------------------START>
    //set init list product order
    const [listProductsOrder, setListProductsOrder] = useState([])
    //set refresh status
    const [isRefreshing, setRefreshing] = useState(false)

    useEffect(() => {
        requestUserPermission()
        NotificationListener()
    },[])

    //get device token
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            //reload
            setRefreshing(false)
            callGetListProductOrder()
        });
        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //after goback
            setRefreshing(false)
            callGetListProductOrder()
        });
        //initload
        callGetListProductOrder()
        return unsubscribe;
    }, [navigation])
    // <--------------------------initload--------------------------------END>

    // <--------------------------functions--------------------------------START>
    const callGetListProductOrder = async () => {
        try {
            setRefreshing(true)
            const res = await axios.get(`${apis.TABLE_PATH}/getProductOrderList`)
            if (res.data.status == contents.status_ok) {
                setListProductsOrder(res.data.data)
            }
            else{
                setListProductsOrder([])
            }
        }
        catch (error) {
            console.log(`callGetListProductOrder ${error.message}`)
        }
    }

    const getTableClick = (indexMeal, indexTable) => {
        let meal = listProductsOrder[indexMeal]
        let table = meal.orderItemInfos[indexTable]
        navigate('TableOrderScreen', {
            'table_id': table.table_id,
            'table_info_id': table.table_info_id,
            'table_nm': table.table_nm_vn,
            'table_stt': 'Ordering',
        })
    }

    useEffect(()=>{
        setRefreshing(false)
    },[isRefreshing])
    // <--------------------------functions--------------------------------END>

    return <View style={styles.container}>
        <ImageBackground
            style={styles.img_background}
            source={{uri:images.backgroundApp}}>
            <FlatList
                data={listProductsOrder}
                renderItem={({ item, index }) =>
                    <ProductOrderItem
                        proOrder={item}
                        key={item.product_id}
                        index={index}
                        getTableClick={getTableClick}
                    />}
                keyExtractor={item => item.product_id}
                onRefresh={callGetListProductOrder}
                refreshing={isRefreshing}
                progressViewOffset={100}
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

