import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { colors } from '../../config'

const MenuItem = (props) => {
    let {
        menu_id,
        menu_nm_vn,
        menu_nm_en,
        menu_nm_jp
    } = props.menu

    const { onPress } = props
    return <View style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
    }}>
        <TouchableOpacity
            style={{
                flex: 1,
                borderBottomRightRadius: 10,
                borderRightWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width / 4,
                backgroundColor: props.index == props.selected ? 'yellow' : colors.color_app,
            }}
            onPress={onPress}>
            <View>
                <Text style={{
                    color: props.index == props.selected ?
                        'red' : 'black',
                    textDecorationLine: props.index == props.selected ?
                        'underline' : 'none',
                    fontWeight: props.index == props.selected ?
                        'bold' : 'normal'
                }}
                >{menu_nm_vn || menu_nm_en || menu_nm_jp}
                </Text>
            </View>
        </TouchableOpacity>
    </View>

}

const styles = StyleSheet.create({

})
export default MenuItem

