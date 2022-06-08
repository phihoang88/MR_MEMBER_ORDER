import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet
} from 'react-native'
import { images, apis, colors, contents } from '../config'
import { ModalDialog,Toast } from '../components'
import TableItem from './subScreens/TableItem'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'

const TableScreen = (props) => {

    //<------------------------initload-----------------------------START>
    //set navigation screens
    const { navigation, route } = props
    const { navigate, goBack } = navigation

    //set refresh status
    const [isRefreshing, setRefreshing] = useState(false)

    //set init load list data 
    const [tables, setTables] = useState([])

    //set  init selected table 
    const [selectedTableInfoId, setSelectedTableInfoId] = useState(null)
    const [selectedTableNm, setSelectedTableNm] = useState('')

    //set init dialog receive call
    const [isShowReceive, setShowReceive] = useState(false)

    //init load function
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //after goback
            setRefreshing(false)

            callGet()
        });
        //initload
        callGet()
        return unsubscribe;
    }, [navigation])

    //when refresh list 
    useEffect(() => {
        setRefreshing(false)
    }, [isRefreshing])

    //call api get list table
    const callGet = async () => {
        try {
            setRefreshing(true)
            const res = await axios.get(`${apis.TABLE_INFO_PATH}/getList`)
            if (res.data.status == contents.status_ok) {
                setTables(res.data.data)
            }
            else {
                setTables([])
            }
        } catch (error) {
            console.log(`${error.message}`)
        }
    }

    //call Put update calling status
    const callPutReceiveCalling = async () => {
        try {
            const res = await axios.put(`${apis.TABLE_INFO_PATH}/receiveCalling/${selectedTableInfoId}`)
            if (res.data.status == contents.status_ok) {
                Toast(contents.msg_success_receive)
                callGet()
            }
            else {
                Toast(contents.msg_err_receive)
            }
        } catch (error) {
            console.log(`callPutReceiveCalling ${error}`)
        }
    }
    //<------------------------initload-----------------------------END>

    return <View style={styles.container}>
        <ImageBackground
            source={{
                uri:images.backgroundApp
            }}
            style={styles.container}>
            <View style={styles.note_bg}>
                <View>
                    <Icon name='phone-alt' size={16} color={'red'} />
                </View>
                <Text style={styles.stt_tx}>Calling</Text>

                <View style={[styles.stt_bg, { backgroundColor: 'red' }]}></View>
                <Text style={styles.stt_tx}>Ordering</Text>

                <View style={[styles.stt_bg, { backgroundColor: 'green' }]}></View>
                <Text style={styles.stt_tx}>Serving</Text>

                <View style={[styles.stt_bg, { backgroundColor: 'blue' }]}></View>
                <Text style={styles.stt_tx}>Booking</Text>

                <View style={[styles.stt_bg, { backgroundColor: colors.color_app }]}></View>
                <Text style={styles.stt_tx}>Emptying</Text>
            </View>
            <FlatList
                data={tables}
                numColumns={3}
                renderItem={({ item }) =>
                    <TableItem table={item}
                        key={item.table_info_id}
                        onPress={() => {
                            setSelectedTableInfoId(item.table_info_id)
                            setSelectedTableNm(item.table_nm_vn)
                            if (item.is_calling == 1) {
                                //calling
                                setShowReceive(true)
                            }
                            else {
                                navigate('TableOrderScreen', {
                                    'table_id': item.table_id,
                                    'table_info_id': item.table_info_id,
                                    'table_nm': item.table_nm_vn,
                                    'table_stt': item.table_stt_nm,
                                    'note_tx' : item.note_tx
                                })
                            }
                        }}
                    />}
                keyExtractor={item => item.table_id}
                onRefresh={callGet}
                refreshing={isRefreshing}
                progressViewOffset={100}
            />
        </ImageBackground>
        <ModalDialog 
            visible={isShowReceive}
            children={{
                title : 'Receive this call?',
                message : `Table ${selectedTableNm} is calling...`,
                type : 'yes/no'
            }}
            onYes={() => {
                setShowReceive(false)
                callPutReceiveCalling()
            }}
            onNo={() => {
                setShowReceive(false)
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    stt_bg: {
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
        backgroundColor: colors.color_app,
        borderRadius: 5,
        padding: 1
    }
})

export default TableScreen  