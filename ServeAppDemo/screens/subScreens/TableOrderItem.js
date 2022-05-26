import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const TableOrderItem = (props) => {

    const {
        product_id,
        product_nm_en,
        product_nm_jp,
        product_nm_vn,
        price_show,
        price,
        product_count,
        product_order_stt_id
    } = props.order
    const index = props.index

    function _getStatus(stt) {
        if (stt == 0) {
            return <View style={styles('').status}>
                <TouchableOpacity
                    onPress={() => {
                        props.onDelete()
                    }}>
                    <Icon name="minus-circle" size={18} color={'red'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.onConfirm()
                    }}>
                    <Icon name="check-circle" size={18} color={'green'} />
                </TouchableOpacity>
            </View>
        }
        else {
            return <View style={styles('').status}>
                <Icon name="check-circle" size={18} color={'grey'} />
            </View>
        }
    }

    return <View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <View style={{ flex: 10 }}>
                <Text style={styles(product_order_stt_id).tbText}>{index + 1}</Text>
            </View>
            <View style={{ flex: 45 }}>
                <Text style={styles(product_order_stt_id).tbText}>{product_nm_vn||product_nm_en||product_nm_jp}</Text>
            </View>
            <View style={{ flex: 10 }}>
                <Text style={styles(product_order_stt_id).tbText}>{product_count}</Text>
            </View>
            <View style={{ flex: 15 }}>
                <Text style={styles(product_order_stt_id).tbText}>{price || price_show}</Text>
            </View>
            {_getStatus(product_order_stt_id)}
        </View>
    </View>

}

const styles = (stt) => StyleSheet.create({
    tbText: {
        textAlign: 'center',
        color: stt == 'done' ? 'grey' : 'black'
    },
    status: {
        flex: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})


export default TableOrderItem



