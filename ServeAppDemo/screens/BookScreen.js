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
    Alert,
} from 'react-native'

import { images, apis, system, colors, contents } from '../config'
import { BookTableItem } from '../screens'
import axios from 'axios'

import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { ModalDialog, Toast } from '../components'
import { getLoginInfo } from '../lib/pushnotification_helper'

const BookScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //get userId
    const [userId, setUserId] = useState('')

    //get pass params
    const [passBookData, setPassBookData] = useState(route.params.book)

    // <-----------------------InitLoad------------------------START>
    //set show key board
    const [isShowKeyBoard, SetShowKeyBoard] = useState(false)
    //set init Table list
    const [listTable, setListTable] = useState([])
    // set init Table ,Guess name,guess phone, guess count, note
    const [txtGuessNm, onChangeGuessNm] = useState('')
    const [txtGuessPhone, onChangeGuessPhone] = useState(null)
    const [txtGuessCount, setGuessCount] = useState(0)
    const [txtNote, setNote] = useState('')

    //set selected table
    const [bookId, setBookId] = useState(null)
    const [tableIdSelected, setTableIdSelected] = useState('')
    const [tableNmSelected, setTableNmSelected] = useState('')
    const [selectedTableIndex, setSelectedTableIndex] = useState(null)

    //set show Date picker
    const [isShowDatePicker, setShowDatePicker] = useState(false)
    const [dateSelect, setDateSelect] = useState(new Date())
    //set show Time picker
    const [isShowTimePickerFrom, setShowTimePickerFrom] = useState(false)
    const [timeSelectFrom, setTimeSelectFrom] = useState(new Date())
    const [isShowTimePickerTo, setShowTimePickerTo] = useState(false)
    const [timeSelectTo, setTimeSelectTo] = useState(new Date())
    //set init validate message
    const [isShowConfirmBook, setShowConfirmBook] = useState(false)

    //set init show confirm cancel 
    const [isShowConfirmCancel, setShowConfirmCancel] = useState(false)

    //initload function
    useEffect(() => {
        getUserId()
        const unsubscribe = navigation.addListener('focus', () => {
            //after goback
            //call Api load Table list
            callGetListTable()
            handleUpdateBookData()
        });
        //initload
        //call Api load Table list
        callGetListTable()
        handleUpdateBookData()
        return unsubscribe;
    }, [navigation])

    const getUserId = async () => {
        let data = await getLoginInfo()
        setUserId(data.userId)
    }
    // <-----------------------InitLoad------------------------END>



    //<-------------------------Function-----------------------START>
    //when key board show
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            SetShowKeyBoard(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            SetShowKeyBoard(false)
        })
    })

    //book table button handle
    const onClickBookTable = () => {

        dateSelect.setHours(
            new Date().getHours() + 7,
            new Date().getMinutes(), 0, 0)

        const toDate = new Date(new Date().setHours(
            new Date().getHours() + 7,
            new Date().getMinutes(), 0, 0))

        if (dateSelect < toDate) {
            return alert('Cannot book past time!')
        }

        if (timeSelectFrom.getHours() > timeSelectTo.getHours()) {
            return alert('Time from must be less than time to!')
        }

        if (timeSelectFrom.getHours() == timeSelectTo.getHours()) {
            if (timeSelectFrom.getMinutes() > timeSelectTo.getMinutes()) {
                return alert('Time from must be less than time to!')
            }
        }

        if (dateSelect + '' == toDate + '') {
            if (new Date().getHours() > timeSelectTo.getHours()) {
                return alert('Time from must be less than time to!')
            }
            if (new Date().getHours() == timeSelectTo.getHours()) {
                if (new Date().getMinutes() > timeSelectTo.getMinutes()) {
                    return alert('Time from must be less than time to!')
                }
            }
        }

        if (tableNmSelected == '') {
            return alert(contents.msg_warn_nonselect_table)
        }
        if (txtGuessNm == '') {
            return alert(contents.msg_warn_empty_guess_nm)
        }
        if (txtGuessPhone == null) {
            return alert(contents.msg_warn_empty_guess_phone)
        }
        if (txtGuessCount == 0) {
            return alert(contents.msg_warn_empty_guess)
        }

        setShowConfirmBook(true)
    }

    const handleUpdateBookData = () => {
        if (passBookData) {
            setBookId(passBookData.bookId)
            setTableIdSelected(passBookData.tableId)
            setTableNmSelected(passBookData.tableNmVn || passBookData.tableNmEn || passBookData.tableNmJp)
            onChangeGuessNm(passBookData.guessNm)
            onChangeGuessPhone(passBookData.guessPhone)
            setGuessCount(passBookData.guessCount)
            setDateSelect(new Date(passBookData.bookDate))
            setTimeSelectFrom(system.getTimeFormatFromString(
                passBookData.bookDate.split("-").join("") + passBookData.bookTimeFrom.replace(":", "")
            )
            )
            setTimeSelectTo(system.getTimeFormatFromString(
                passBookData.bookDate.split("-").join("") + passBookData.bookTimeTo.replace(":", "")
            )
            )
            setNote(passBookData.noteTx)
        }
    }

    //API get list table
    const callGetListTable = async () => {
        try {
            const res = await axios.get(`${apis.TABLE_PATH}/getList`)
            if (res.data.status == 'success') {
                if (res.data.data != null) {
                    setListTable(res.data.data.filter(item => item.delFg != '1'))
                }
                else {
                    setListTable([])
                }
            }
            else {
                setListTable([])
            }
        } catch (error) {
            console.log(`callGetListTable ${error.message}`)
        }
    }

    //callPost insert order list to DB
    const callPostInsertTableBook = async () => {
        try {
            const res = await axios.post(`${apis.TABLE_BOOK_PATH}/insertOrUpdateBook`, {
                "id": bookId,
                "tableId": tableIdSelected,
                "bookDate": system.getDateFormat(dateSelect),
                "bookTimeFrom": system.getTimeFormat(timeSelectFrom),
                "bookTimeTo": system.getTimeFormat(timeSelectTo),
                "guessNm": txtGuessNm,
                "guessCount": txtGuessCount,
                "guessPhone": txtGuessPhone,
                "noteTx": txtNote,
                "isCancel": "0",
                "isEnd": "0",
                "crtDt": system.systemDateTimeString(),
                "crtUserId": userId,
                "crtPgmId": system.BOOK_SCREEN,
                "delFg": "0"
            })
            if (res.data.status == contents.status_ok) {
                // callGetListTable()
                Toast(contents.msg_success_create_table)
                goBack()
            }
            else {
                Toast(res.data.message)
            }
        } catch (error) {
            console.log(`callPostInsertTableBook ${error}`)
        }
    }

    // update table T_Table_info => cancel book
    const callPutCancelBookTable = async () => {
        try {
            const res = await axios.put(`${apis.TABLE_BOOK_PATH}/cancelBook/${bookId}`)
            if (res.data.status == contents.status_ok) {
                Toast("Cancel successfully!")
                goBack()
            }
            else {
                Toast("Cancel unsuccessfully!")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    //<-------------------------Function-------------------------END>

    return <View style={{ flex: 100 }}>
        <ImageBackground style={{ flex: 100 }}
            source={{
                uri: images.backgroundApp
            }}>
            {/* Tabbar */}
            <View style={styles.tabbar}>
                {/* back button */}
                <View style={{ flex: 10 }}>
                    <TouchableOpacity
                        style={styles.back_btn}
                        onPress={() => {
                            goBack()
                        }}>
                        <Icon name="chevron-left" size={18} color={'grey'}></Icon>
                    </TouchableOpacity>
                </View>
                {/* tabbar content */}
                <View style={styles.tabbar_title}>
                    <Text style={styles.label}>
                        Book a table
                    </Text>
                </View>
            </View>

            {/* info */}
            <View style={{
                flex: 50,
                borderWidth: 1,
                borderRadius: 15,
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 5,
                backgroundColor: 'white',
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
            }}>
                <View style={{ flex: 88, flexDirection: 'row' }}>
                    {/* LABEL */}
                    <View style={{ flex: 30 }}>
                        {/* Table NO */}
                        <View style={[{ flex: 12 }, styles.center_start]}>
                            <Text style={styles.label_tx}>Table</Text>
                        </View>
                        {/* Guess name */}
                        <View style={[{ flex: 15 }, styles.center_s_mt5]}>
                            <Text style={styles.label_tx}>Guess name</Text>
                        </View>
                        {/* Guess phone */}
                        <View style={[{ flex: 15 }, styles.center_s_mt5]}>
                            <Text style={styles.label_tx}>Guess phone</Text>
                        </View>
                        {/* Guess count */}
                        <View style={[{ flex: 12 }, styles.center_s_mt5]}>
                            <Text style={styles.label_tx}>Guess count</Text>
                        </View>
                        {/* Date */}
                        <View style={[{ flex: 12 }, styles.center_s_mt5]}>
                            <Text style={styles.label_tx}>Book date</Text>
                        </View>
                        {/* Time */}
                        <View style={[{ flex: 12 }, styles.center_s_mt5]}>
                            <Text style={styles.label_tx}>Book time</Text>
                        </View>
                        {/* Not */}
                        <View style={[{ flex: 25 }, styles.center_s_mt5]}>
                            <Text style={styles.label_tx}>Note</Text>
                        </View>
                    </View>
                    {/* Contents */}
                    <View style={{ flex: 70 }}>
                        {/* Table NO */}
                        <View style={[{ flex: 12.5 }, styles.center_all]}>
                            <Text style={styles.label_content}>{tableNmSelected}</Text>
                        </View>
                        {/* Guess name */}
                        <View style={[{ flex: 15 }, styles.center_mt5]}>
                            <TextInput
                                placeholder='Please type guess name here...'
                                onChangeText={(text) => onChangeGuessNm(text)}
                                value={txtGuessNm}
                                style={styles.input_content}
                                maxLength={30} />
                        </View>
                        {/* Guess phone */}
                        <View style={[{ flex: 15 }, styles.center_mt5]}>
                            <TextInput
                                placeholder='Please type guess phone here...'
                                onChangeText={(text) => onChangeGuessPhone(text)}
                                value={txtGuessPhone}
                                keyboardType='numeric'
                                style={styles.input_content}
                                maxLength={20} />
                        </View>
                        {/* Guess count */}
                        <View style={[{ flex: 12, flexDirection: 'row' }, styles.center_mt5]}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (txtGuessCount > 0) {
                                        setGuessCount(txtGuessCount - 1)
                                    }
                                }}>
                                <Icon name='minus-circle' size={25} color={'grey'} />
                            </TouchableOpacity>
                            <Text style={{
                                height: 35,
                                width: 70,
                                borderWidth: 1,
                                borderRadius: 10,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 18,
                                marginLeft: 10,
                                marginRight: 10
                            }}>{txtGuessCount}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setGuessCount(txtGuessCount + 1)
                                }}
                            >
                                <Icon name='plus-circle' size={25} color={'grey'} />
                            </TouchableOpacity>
                        </View>
                        {/* Date */}
                        <View style={[{ flex: 12, flexDirection: 'row' }, styles.center_mt5]}>
                            <View style={[{
                                flex: 85,
                                borderWidth: 1,
                                borderRadius: 15,
                                height: '100%'
                            }, styles.center_all]}>
                                <Text
                                    style={styles.label_content}
                                >{system.getDateFormat(dateSelect)}</Text>
                            </View>
                            <View style={[{
                                flex: 15,
                                height: '100%',
                            }, styles.center_all]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowDatePicker(true)
                                    }}
                                >
                                    <Icon name='calendar-alt' color={'grey'} size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Time */}
                        <View style={[{ flex: 12, flexDirection: 'row' }, styles.center_mt5]}>
                            <View style={[{
                                flex: 50,
                                height: '100%',
                                flexDirection: 'row'
                            }, styles.center_all]}>
                                <View style={[{
                                    flex: 70,
                                    borderWidth: 1,
                                    borderRadius: 15,
                                }, styles.center_all]}>
                                    <Text
                                        style={styles.label_content}
                                    >{system.getTimeFormat(timeSelectFrom)}</Text>
                                </View>
                                <View style={[{
                                    flex: 30,
                                    height: '100%',
                                }, styles.center_all]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowTimePickerFrom(true)
                                        }}
                                    >
                                        <Icon name='clock' color={'grey'} size={25} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[{
                                flex: 50,
                                height: '100%',
                                flexDirection: 'row'
                            }, styles.center_all]}>
                                <View style={[{
                                    flex: 70,
                                    borderWidth: 1,
                                    borderRadius: 15,
                                }, styles.center_all]}>
                                    <Text
                                        style={styles.label_content}
                                    >{system.getTimeFormat(timeSelectTo)}</Text>
                                </View>
                                <View style={[{
                                    flex: 30,
                                    height: '100%',
                                }, styles.center_all]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowTimePickerTo(true)
                                        }}
                                    >
                                        <Icon name='clock' color={'grey'} size={25} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* Note */}
                        <View style={{
                            flex: 25,
                            borderWidth: 1,
                            borderRadius: 15,
                            height: '100%',
                            marginTop: 5,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <TextInput style={{ fontSize: 12 }}
                                multiline
                                onChangeText={text => setNote(text)}
                                value={txtNote}
                            />
                        </View>

                    </View>
                </View>
                <View style={{ flex: 12, flexDirection: 'row' }}>
                    {/* Book button */}
                    <View style={[{ flex: 50 }, styles.center_mt5]}>
                        <TouchableOpacity
                            onPress={() => {
                                onClickBookTable()
                            }}
                            style={[{
                                flex: 50,
                                backgroundColor: 'green',
                                width: '80%',
                                borderRadius: 20
                            }, styles.center_all]}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>BOOK TABLE</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Book button */}
                    <View style={[{ flex: 50, display: bookId ? 'flex' : 'none' }, styles.center_mt5]}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowConfirmCancel(true)
                            }}
                            style={[{
                                flex: 50,
                                backgroundColor: 'red',
                                width: '80%',
                                borderRadius: 20
                            }, styles.center_all]}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>CANCEL BOOK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* list table */}
            <View style={{
                flex: 40,
                borderWidth: 1,
                borderRadius: 15,
                display: isShowKeyBoard == true ? 'none' : 'flex',
                padding: 5,
                margin: 5,
                backgroundColor: 'white'
            }}>
                <FlatList
                    data={listTable}
                    numColumns={3}
                    renderItem={({ item, index }) =>
                        <BookTableItem
                            table={item}
                            key={index}
                            index={index}
                            selected={tableIdSelected}
                            onPress={() => {
                                setSelectedTableIndex(index)
                                setTableIdSelected(item.id)
                                setTableNmSelected(item.tableNmVn || item.tableNmEn || item.tableNmJp)
                                // setGuessCount(item.guess_count ? parseInt(item.guess_count) : 0)
                                // onChangeGuessNm(item.guessNm)
                                // onChangeGuessPhone(item.guess_phone)
                                // if (item.book_dt != null) {
                                //     setDateSelect(system.getDateFormatFromString(item.book_dt))
                                //     setTimeSelectFrom(system.getTimeFormatFromString(item.book_dt + item.book_tm))
                                //     setTimeSelectTo(system.getTimeFormatFromString(item.book_dt + item.book_tm))
                                // }
                                // else {
                                //     setDateSelect(new Date())
                                //     setTimeSelectFrom(new Date())
                                //     setTimeSelectTo(new Date())
                                // }
                                // setNote(item.note_tx)
                            }}
                            onLongPress={() => {
                                // setShowConfirmCancel(true)
                            }}
                        />}
                //keyExtractor={item => item.table_id}
                //onRefresh={setOrderTmpByAmount}
                // refreshing={isFetchingOrderLstTmp}
                // progressViewOffset={100}
                />
            </View>
        </ImageBackground>
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
        <DatePicker
            modal
            mode='time'
            minuteInterval={15}
            open={isShowTimePickerFrom}
            date={timeSelectFrom}
            onConfirm={(date) => {
                setShowTimePickerFrom(false)
                setTimeSelectFrom(date)
            }}
            onCancel={() => {
                setShowTimePickerFrom(false)
            }}
        />
        <DatePicker
            modal
            mode='time'
            minuteInterval={15}
            open={isShowTimePickerTo}
            date={timeSelectTo}
            onConfirm={(date) => {
                setShowTimePickerTo(false)
                setTimeSelectTo(date)
            }}
            onCancel={() => {
                setShowTimePickerTo(false)
            }}
        />
        <ModalDialog
            visible={isShowConfirmBook}
            children={{
                title: contents.title_confirm,
                message: `${contents.msg_ask_confirm_book} ${tableNmSelected} ?`,
                type: 'yes/no'
            }}
            onYes={() => {
                setShowConfirmBook(false)
                callPostInsertTableBook()
            }}
            onNo={() => {
                setShowConfirmBook(false)
            }}
        />
        <ModalDialog
            visible={isShowConfirmCancel}
            children={{
                title: contents.title_confirm,
                message: `Cancel Table ${tableNmSelected} ?`,
                type: 'yes/no'
            }}
            onYes={() => {
                setShowConfirmCancel(false)
                callPutCancelBookTable()
            }}
            onNo={() => {
                setShowConfirmCancel(false)
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 100
    },
    tabbar: {
        flex: 7,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        backgroundColor: colors.color_app,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    back_btn: {
        height: '100%',
        width: '100%',
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    tabbar_title: {
        flex: 50,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    label: {
        color: 'black',
        fontSize: 18
    },
    tabbar_nm: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    center_start: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    center_all: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    center_s_mt5: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 5,
    },
    center_mt5: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    start_c_mt5: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
    },
    label_tx: {
        color: 'black',
        fontSize: 15
    },
    label_content: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    input_content: {
        flex: 1,
        borderRadius: 15,
        borderWidth: 1,
        width: '100%',
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
    },

})



export default BookScreen

