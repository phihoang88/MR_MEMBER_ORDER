import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

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

    return <View>
        <View style={styles.container}>
            <View style={styles.image_bg}>
                <Image
                    source={product_ava}
                    style={styles.image}
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
        <View style={{
            height: 1,
            width: '100%',
            backgroundColor: 'black',
            marginBottom: 5,
        }}>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
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


