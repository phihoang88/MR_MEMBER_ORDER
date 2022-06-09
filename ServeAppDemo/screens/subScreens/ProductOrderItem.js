import React, { useState } from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

import { colors, system, images } from '../../config/'

const ProductOrderItem = (props) => {

    let {
        product_id,
        product_nm_vn,
        product_nm_en,
        product_nm_jp,
        price,
        price_show,
        product_avatar,
        orderItemInfos
    } = props.proOrder
    let getTableClick = props.getTableClick
    let mealIndex = props.index
    let onPress = props.onPress
    const [imageError, setImageError] = useState(true)

    const onImageNotFound = () => {
        setImageError(false)
    }
    function ListTableOrder() {
        let maxItemRow = 3
        let tableRow = []
        let tableList = []
        for (let i = 0; i <= orderItemInfos.length - 1; i++) {
            if (i % maxItemRow == 0) {
                tableRow.push(
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {tableList}
                    </View>
                )
                tableList = []
            }
            tableList.push(
                <TouchableOpacity
                    onPress={() => {
                        getTableClick(mealIndex, i)
                    }}
                    style={{
                        width: `${99 / 3}%`,
                        height: 60,
                        padding: 2
                    }}>
                    <View style={{
                        height: 25,
                        width: 25,
                        backgroundColor: 'red',
                        position: 'absolute',
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -8,
                        marginLeft: -3,
                        zIndex: 1
                    }}>
                        <Text style={{
                            color: 'yellow',
                            fontWeight: 'bold',
                        }}>{orderItemInfos[i].count}</Text>
                    </View>
                    <View style={{
                        flex: 60,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        backgroundColor: 'darkseagreen'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: 'bold'
                        }}>{system.getTimeFormatByString(orderItemInfos[i].order_tm)}</Text>
                    </View>
                    <View style={{
                        flex: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5
                    }}>
                        <Text style={{
                            color: 'black'
                        }}>{orderItemInfos[i].table_nm_vn || orderItemInfos[i].table_nm_en || orderItemInfos[i].table_nm_jp}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        tableRow.push(
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {tableList}
            </View>
        )
        return tableRow
    }

    return <View style={{
        flex: 1,
        backgroundColor: 'white', //colors.color_app,
        marginBottom: 5,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 5,
    }}>
        {/* avatar */}
        <View style={{
            flex: 30,
        }}>
            <Image source={
                imageError ? 
                { uri: `${images.image_folder}/${product_avatar}` } : 
                require('../../assets/images/notfound.jpg')
            }
                style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    resizeMode: 'cover',
                }}
                onError={() => onImageNotFound()}
            />
        </View>

        {/* list order */}
        <View style={{
            flex: 70,
            padding: 5
        }}>
            {/* product info */}
            <View style={{
                flexDirection: 'row',
                height: 30
            }}>
                <View style={{ flex: 50, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>{product_nm_vn || product_nm_en || product_nm_jp}</Text>
                </View>
                <View style={{ flex: 50, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                    <Text style={{
                        color: 'red',
                        fontSize: 15
                    }}>${price || price_show}</Text>
                </View>
            </View>

            {/* list table order */}
            <View style={{
                flex: 100,
            }}>
                {ListTableOrder()}
            </View>

        </View>

    </View>
}

export default ProductOrderItem