import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { apis } from '../../config'
import images from '../../config/images'

const BookTableItem = (props) => {
    let {
        id,
        tableNmVn,
        tableNmEn,
        tableNmJp,
        sortNo,
        tableAva,
    } = props.table
    let onPress = props.onPress
    let seleted = props.selected

    let onLongPress = props.onLongPress


    const [imageError, setImageError] = useState(true)

    const onImageNotFound = () => {
        setImageError(false)
    }
    return <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
            height: Dimensions.get('window').height / 2 / 3,
            width: Dimensions.get('window').width / 3 - 10,
            borderWidth: 1,
            margin: 1,
            borderRadius: 15,
            // borderColor: table_stt_nm == 'Emptying' ? 'black' : 'blue',
            backgroundColor: id == seleted ? 'cyan' : 'white'
        }}>
        <View style={{
            flex: 80,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                source={
                    imageError ?
                        { uri: `${images.image_folder}/${tableAva}` } :
                        require('../../assets/images/notfound.jpg')
                }
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    resizeMode: 'center',
                }}
                onError={() => onImageNotFound()}
            />
        </View>
        <View style={{
            flex: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'black',
                fontSize: 15
            }}>
                {tableNmVn || tableNmEn || tableNmJp}
            </Text>
        </View>
    </TouchableOpacity>
}

export default BookTableItem