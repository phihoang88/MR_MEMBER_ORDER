import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { contents } from '../../config';

const TableOrderItem = (props) => {

    const {
        product_id,
        product_nm_en,
        product_nm_jp,
        product_nm_vn,
        price_show,
        price,
        product_count,
        product_order_stt_id,
        count
    } = props.order
    const index = props.index

    function _getStatus(stt) {
        if (stt == 0) {
            return <View style={styles('').status}>
                <TouchableOpacity
                    onPress={() => {
                        props.onConfirm()
                    }}>
                    <Icon name="chevron-circle-down" size={18} color={'green'} />
                </TouchableOpacity>
            </View>
        }
        else if (stt == 1) {
            return <View style={styles('').status}>
                <Icon name="check-circle" size={18} color={'grey'} />
            </View>
        }
        else {
            return <View style={styles('').status}>
                <TouchableOpacity
                    onPress={() => {
                        props.onDelete()
                    }}>
                    <Icon name="minus-circle" size={18} color={'red'} />
                </TouchableOpacity>
            </View>
        }
    }

    return <View>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 10 }}>
                <Text style={styles(product_order_stt_id).tbText}>{index + 1}</Text>
            </View>
            <TouchableOpacity
                style={{ flex: 45 }}
                onPress={() => { props.onSelected() }}>
                <Text style={styles(product_order_stt_id).tbText}>{product_nm_vn || product_nm_en || product_nm_jp}</Text>
            </TouchableOpacity>
            <View style={{ flex: 10 }}>
                <Text style={styles(product_order_stt_id).tbText}>{product_count || count}</Text>
            </View>
            <View style={{ flex: 15 }}>
                <Text style={styles(product_order_stt_id).tbText}>{price || price_show}</Text>
            </View>
            {_getStatus(product_order_stt_id)}
        </View>
        <View style={{
            flex: 1,
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginBottom:20
        }}>
            <TextInput
                maxLength={40}
                style={{
                    width: '90%',
                    borderWidth: 1,
                    borderRadius: 15,
                }}
                placeholder={contents.cont_plh_note}
            />
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



