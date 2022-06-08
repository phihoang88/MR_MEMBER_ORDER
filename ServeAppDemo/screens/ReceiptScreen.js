import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList
} from 'react-native'

import { apis, contents, images } from '../config'
import { ReceiptItem } from '../screens'
import axios from 'axios'


const ReceiptScreen = (props) => {

    const { navigation, route } = props
    const { navigate, gpBack } = navigation

    // <-------------------------------initload---------------------------------START>
    const [listReceipt, setListReceipt] = useState([])
    const [isRefreshing, setRefreshing] = useState(false)

    //initload
    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            //goback
            setRefreshing(false)
            callGetTableOrderingList()
        })
        //initload
        callGetTableOrderingList()
        return unsub
    }, [navigation])

    // <-------------------------------initload---------------------------------END>


    // <-------------------------------function---------------------------------START>
    const callGetTableOrderingList = async () => {
        try {
            setRefreshing(true)
            const res = await axios.get(`${apis.RECEIPT_PATH}/getListOrderForReceipt`)
            if(res.data.status == contents.status_ok){
                setListReceipt(res.data.data.filter(item => item.is_end == 0))
            }
            else{
                setListReceipt([])
            }
        }
        catch(error){
            console.log(`callGetTableOrderingList ${error}`)
        }
    }

    useEffect(() => {
        setRefreshing(false)
    },[isRefreshing])
    // <-------------------------------function---------------------------------END>

    return <View style={styles.container}>
        <ImageBackground
            style={styles.img_background}
            source={{
                uri:images.backgroundApp
            }}>
            <FlatList
                data={listReceipt}
                renderItem={({ item, index }) =>
                    <ReceiptItem
                        receipt={item}
                        key={item.table_info_id}
                        index={index}
                        onPress={()=>{
                            navigate('ReceiptDetailScreen',{
                                'receiptDetail' : item
                            })
                        }}
                    />}
                keyExtractor={item => item.table_info_id}
                onRefresh={callGetTableOrderingList}
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

export default ReceiptScreen

