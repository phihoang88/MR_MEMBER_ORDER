import React from 'react'
import {
    View,
    Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

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
            flexDirection:'row'
        }}>
            <Text style={{
                color: 'black',
                marginRight:10
            }}>{product_nm_vn || product_nm_jp || product_nm_en}</Text>
            {product_order_stt_id == 0 && <Icon name="hourglass-half" size={20} color={'grey'} />}
            {product_order_stt_id == 1 && <Icon name="check-circle" size={20} color={'green'} />}
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