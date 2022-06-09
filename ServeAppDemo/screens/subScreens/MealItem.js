import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { images } from '../../config'

const MealItem = (props) => {
    let {
        product_id,
        product_nm_vn,
        product_nm_en,
        product_nm_jp,
        price,
        price_show,
        description,
        product_ava,
    } = props.product

    const { onPress } = props

    const [imageError, setImageError] = useState(true)

    const onImageNotFound = () => {
        setImageError(false);
    }

    return <View>
        <View style={styles.container}>
            <View style={styles.image_bg}>
                <Image
                    source={
                        imageError ?
                            { uri: `${images.image_folder}/${product_ava}` } :
                            require('../../assets/images/notfound.jpg')
                    }
                    style={styles.image}
                    onError={() => onImageNotFound()}
                />
            </View>
            <View style={styles.meal}>
                <Text style={styles.meal_nm}>{product_nm_vn || product_nm_en || product_nm_jp}</Text>
            </View>
            <View style={styles.price_bg}>
                <Text style={styles.price}>{price || price_show}</Text>
            </View>
            <View style={styles.add}>
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Icon name='plus-circle' color={'green'} size={18}></Icon>
                </TouchableOpacity>
            </View>
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        borderBottomWidth: 1
    },
    image_bg: {
        flex: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 10,
    },
    meal: {
        flex: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    meal_nm: {
        textAlign: 'center',
        color: 'black'
    },
    price_bg: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    price: {
        textAlign: 'center',
        color: 'black'
    },
    add: {
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MealItem


