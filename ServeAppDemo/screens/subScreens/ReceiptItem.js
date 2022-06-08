import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { colors } from '../../config'

const ReceiptItem = (props) => {
    let {
        table_info_id,
        product_order_stt_id,
        table_nm_vn,
        table_nm_en,
        table_nm_jp,
        is_end,
        listProducts
    } = props.receipt
    let onPress = props.onPress

    function ListProductOrder() {
        if (listProducts.length == 1) {
            return <View style={{
                flexDirection: 'row',
                height: '50%',
                borderBottomWidth: 1,
                marginRight: 10
            }}>
                <View style={{ flex: 60, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{
                        color:'black',
                        fontSize:15
                    }}>{listProducts[0].product_nm_vn || listProducts[0].product_nm_en || listProducts[0].product_nm_jp}</Text>
                </View>
                <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        color:'black',
                        fontSize:15
                    }}>x {listProducts[0].count}</Text>
                </View>
                <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        color:'red',
                        fontSize:15
                    }}>${listProducts[0].price || listProducts[0].price_show}</Text>
                </View>
            </View>
        }
        else {
            return <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    height: '50%',
                    borderBottomWidth: 1,
                    marginRight: 10
                }}>
                    <View style={{ flex: 60, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{
                        color:'black',
                        fontSize:15
                    }}>{listProducts[0].product_nm_vn || listProducts[0].product_nm_en || listProducts[0].product_nm_jp}</Text>
                </View>
                <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        color:'black',
                        fontSize:15
                    }}>x {listProducts[0].count}</Text>
                </View>
                <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        color:'red',
                        fontSize:15
                    }}>${listProducts[0].price || listProducts[0].price_show}</Text>
                </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    height: '50%',
                    marginRight: 10
                }}>
                    <View style={{ flex: 60, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{
                        color:'black',
                        fontSize:15
                    }}>{listProducts[1].product_nm_vn || listProducts[1].product_nm_en || listProducts[1].product_nm_jp}</Text>
                </View>
                <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        color:'black',
                        fontSize:15
                    }}>x {listProducts[1].count}</Text>
                </View>
                <View style={{ flex: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        color:'red',
                        fontSize:15
                    }}>${listProducts[1].price || listProducts[1].price_show}</Text>
                </View>
                </View>
            </View>
        }
    }
    return <TouchableOpacity
        style={{
            flex: 1,
            height: 100,
            width: '100%',
            marginBottom: 5,
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: is_end == 1 ? 'grey':'white'
        }}
        onPress={onPress}
    >
        <View style={{ flex: 30, flexDirection: 'row' }}>
            <View style={{ flex: 50, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 10 }}>
                <Text style={{
                    color: 'black'}}>Table  </Text>
                <Text style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold'
                }}>{table_nm_vn || table_nm_en || table_nm_jp}</Text>
            </View>
            {is_end == 1 && <View style={{
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: 5,
                marginTop: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderWidth:2
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>Checkout</Text>
            </View>
            }
            {is_end == 0 && product_order_stt_id == 0 && <View style={{
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: 5,
                marginTop: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: 'red'
            }}>
                <Text style={{
                    color: 'yellow',
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>Serving</Text>
            </View>
            }
            {is_end == 0 && product_order_stt_id == 1 && <View style={{
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: 5,
                marginTop: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: 'green'
            }}>
                <Text style={{
                    color: 'yellow',
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>Done</Text>
            </View>
            }
        </View>

        <View style={{ flex: 70, marginLeft: 10 }}>
            {ListProductOrder()}
        </View>
    </TouchableOpacity>
}

export default ReceiptItem

