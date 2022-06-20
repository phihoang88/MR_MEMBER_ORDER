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
        table_id,
        table_nm_vn,
        table_nm_en,
        table_nm_jp,
        sort_no,
        table_ava,
        book_dt,
        is_end,
        note_tx,
        serve_datetime,
        table_info_id,
        table_stt_id,
        table_stt_nm,
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
            borderWidth: table_stt_nm == 'Emptying' ? 1 : 10,
            margin: 1,
            borderRadius: 15,
            borderColor: table_stt_nm == 'Emptying' ? 'black' : 'blue',
            backgroundColor: props.index == seleted ? 'cyan' : 'white'
        }}>
        <View style={{
            flex: 80,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                source={
                    imageError ?
                        { uri: `${images.image_folder}/${table_ava}` } :
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
                {table_nm_vn || table_nm_en || table_nm_jp}
            </Text>
        </View>
    </TouchableOpacity>
}

export default BookTableItem