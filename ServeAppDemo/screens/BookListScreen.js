import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Dimensions,
    Image
} from 'react-native'

import { images, apis, system, colors, contents } from '../config'
import { BookListItem } from '../screens'
import axios from 'axios'

import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ModalDialog, Toast } from '../components'
import { getLoginInfo } from '../lib/pushnotification_helper'

const BookListScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    const [isShowDatePicker, setShowDatePicker] = useState(false)
    const [dateSelect, setDateSelect] = useState(new Date())

    const [listTableBook, setListTableBook] = useState([])

    const [isRefreshing, setRefreshing] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //after goback
            setRefreshing(false)
            callGetListTableBook()
            setDateSelect(dateSelect)
        });
        //initload
        setDateSelect(dateSelect)
        callGetListTableBook()
        return unsubscribe;
    }, [navigation])


    useEffect(() => {
        setRefreshing(false)
    }, [isRefreshing])

    useEffect(() => {
        setRefreshing(false)
        callGetListTableBook()
    }, [dateSelect])

    const callGetListTableBook = async () => {
        try {
            setRefreshing(true)
            const res = await axios.get(`${apis.TABLE_BOOK_PATH}/getList`)
            if (res.data.status == "success") {
                if (res.data.data) {
                    setListTableBook(res.data.data.filter(item => item.bookDate == system.getDateFormat(dateSelect)))
                }
                else {
                    setListTableBook([])
                }
            }
            else {
                setListTableBook([])
            }
        }
        catch (error) {
            console.log(`callGetListTableBook ${error}`)
        }
    }


    return <View style={{ flex: 1 }}>
        {/* function */}
        <View style={{ flex: 10, borderBottomWidth: 1, paddingBottom: 5 }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginBottom: 5,
                marginLeft: 10
            }}>
                <Text style={{
                    fontSize: 18,
                    color: 'black'
                }}
                >BOOK DATE</Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 10,
                marginRight: 10,
            }}>
                <View style={{
                    flex: 60, flexDirection: 'row', borderWidth: 1,
                    borderRadius: 15,
                }}>
                    <View style={{
                        flex: 50,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: 'black',
                            }}
                        >{system.getDateFormat(dateSelect)}</Text>
                    </View>
                    <View style={{
                        flex: 10,
                        height: '100%',
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowDatePicker(true)
                            }}
                        >
                            <Icon name='calendar-alt' color={'grey'} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flex: 40,
                    paddingLeft: 20
                }}>
                    <TouchableOpacity style={{
                        flex: 1,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'lightseagreen'
                    }}

                        onPress={() => {
                            navigate('BookScreen',{
                                'book':null
                            })
                        }}>
                        <Text style={{
                            fontSize: 14,
                            color: 'white'
                        }}
                        >Book a table</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
        {/* List */}
        <View style={{ flex: 90, padding: 5 }}>
            <FlatList
                data={listTableBook}
                renderItem={({ item, index }) =>
                    <BookListItem
                        booklst={item}
                        key={item.book_id}
                        index={index}
                        onPress={() => {
                            navigate('BookScreen', {
                                'book': item
                            })
                        }}
                    />
                }
                keyExtractor={item => item.book_id}
                onRefresh={callGetListTableBook}
                refreshing={isRefreshing}
                progressViewOffset={100}
            />
        </View>

        <DatePicker
            modal
            mode='date'
            open={isShowDatePicker}
            date={dateSelect}
            onConfirm={(date) => {
                setShowDatePicker(false)
                setDateSelect(date)
            }}
            onCancel={() => {
                setShowDatePicker(false)
            }}
        />
    </View>
}

export default BookListScreen