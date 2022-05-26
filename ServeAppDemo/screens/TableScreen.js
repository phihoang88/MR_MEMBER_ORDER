import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet
} from 'react-native'
import { images,apis } from '../config'
import TableItem from './subScreens/TableItem'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'

const TableScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    const [tables, setTables] = useState([])

    const GET_URL = apis.BASE_URL + '/Table/getList'

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //after goback
            callGet()
        });
        //initload
        callGet()

        return unsubscribe;
    }, [navigation])


    const callGet = async () => {
        try {
            const res = await axios.get(GET_URL)
            setTables(res.data.data)
        } catch (error) {
            console.log(`huy ${error.message}`)
        }
    }

    return <View style={styles('').container}>
        <ImageBackground
            source={images.backgroundApp}
            style={styles('').container}>
            <View style={styles('').note_bg}>
                <View>
                    <Icon name='phone-alt' size={16} color={'red'}/>
                </View>
                <Text style={styles('').stt_tx}>Calling</Text>

                <View style={styles('red').stt_bg}></View>
                <Text style={styles('').stt_tx}>Ordering</Text>

                <View style={styles('green').stt_bg}></View>
                <Text style={styles('').stt_tx}>Serving</Text>

                <View style={styles('blue').stt_bg}></View>
                <Text style={styles('').stt_tx}>Booking</Text>

                <View style={styles('#edeec6').stt_bg}></View>
                <Text style={styles('').stt_tx}>Empty</Text>
            </View>
            <FlatList
                data={tables}
                numColumns={3}
                renderItem={({ item }) =>
                    <TableItem table={item}
                        key={item.table_info_id}
                        onPress={() => {
                            navigate('TableOrderScreen', {
                                'table_info_id': item.table_info_id,
                                'table_nm': item.table_nm_vn,
                                'table_stt': item.table_stt_nm,
                            })
                        }}
                    />}
                keyExtractor={item => item.table_id}
            />
        </ImageBackground>
    </View>
}

const styles = (color) => StyleSheet.create({
    container: {
        flew: 1
    },
    stt_bg: {
        backgroundColor: color,
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey'
    },
    stt_tx: {
        color: 'black',
        fontWeight: 'bold',
        marginEnd: 5
    },
    note_bg: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#edeec6',
        borderRadius: 5,
        padding: 1
    }


})


export default TableScreen  