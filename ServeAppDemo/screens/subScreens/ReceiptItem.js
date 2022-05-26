import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

const ReceiptItem = (props) => {
    function _getStatus(stt) {
        if (stt == false) {
            return <View style={styles.bgStatus_new}>
                <Text style={styles.status_new}>New</Text>
            </View>
        }
        else {
            return <View style={styles.bgStatus_done}>
                <Text style={styles.status_done}>Done</Text>
            </View>
        }
    }
    let { order_id,
        name,
        price,
        image,
        note,
        ordertime,
        table_id,
        table_nm,
        is_done,
    } = props.order

    const { onPress } = props
    return <TouchableOpacity
        style={styles.bgItem}
        onPress={onPress}>
        {/* image meal */}
        <View style={{
            flex: 20,
            marginEnd: 15,
        }}>
            <Image
                source={image}
                style={styles.img_order}>
            </Image>
        </View>
        {/* info meal */}
        <View style={{
            flex: 45,
        }}>
            <Text style={styles.title}>{name}</Text>
            <View style={{ height: 1, backgroundColor: 'black' }} />
            <Text style={styles.number}>¥{price}</Text>
            <Text style={styles.text}>Note: {note}</Text>
            <Text style={styles.time}>Order time: {ordertime}</Text>
        </View>
        {/* status meal */}
        <View style={{
            flex: 15,
        }}>
            <Text style={styles.table_nm}>Table {table_nm}</Text>
            {_getStatus(is_done)}
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img_background: {
        flex: 1,
        padding: 5
    },
    bgItem: {
        height: 120,
        backgroundColor: '#edeec6',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        marginBottom: 5
    },
    img_order: {
        height: '100%',
        width: 100,
        borderRadius: 20,
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black'
    },
    number: {
        color: 'red'
    },
    text: {
        color: 'black'
    },
    time: {
        color: 'blue',
        fontStyle: 'italic',
        fontSize: 12
    },
    table_nm: {
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'red',
        fontSize: 13
    },
    bgStatus_new: {
        backgroundColor: 'red',
        width: 40,
        alignSelf: 'center',
        borderRadius: 8,
    },
    bgStatus_done: {
        backgroundColor: 'grey',
        width: 40,
        alignSelf: 'center',
        borderRadius: 8,
    },
    status_new: {
        textAlign: 'center',
        color: 'yellow'
    },
    status_done: {
        textAlign: 'center',
        color: 'white'
    }
})
export default ReceiptItem

