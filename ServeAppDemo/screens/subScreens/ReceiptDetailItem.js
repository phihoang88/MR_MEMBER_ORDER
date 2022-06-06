import React from 'react'
import {
    View,
    Text
} from 'react-native'


const ReceiptDetailItem = (props) => {

    let { 
        count,
        price,
        price_show,
        product_id,
        product_nm_en,
        product_nm_jp,
        product_nm_vn,
        product_order_stt_id
    } = props.detail
    let index = props.index
    console.log(props.detail)

    return <View style={{
        marginBottom: 5,
        height: 30,
        flexDirection: 'row',
        borderBottomWidth: 1,
    }}>
        <View style={{
            flex: 10,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                color: 'black'
            }}>{index + 1}</Text>
        </View>
        <View style={{
            flex: 55,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                color: 'black'
            }}>{product_nm_vn || product_nm_jp || product_nm_en}</Text>
        </View>
        <View style={{
            flex: 15,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                color: 'black'
            }}>x {count}</Text>
        </View>
        <View style={{
            flex: 20,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                color: 'black'
            }}>${price || price_show}</Text>
        </View>
    </View>
}

export default ReceiptDetailItem