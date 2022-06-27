import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity,
    FlatList,
    ImageBackground
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
    const [tableIdSelected, setTableIdSelected] = useState('')
    const [tableInfoId, setTableInfoId] = useState(null)
    const [tableNmSelected, setTableNmSelected] = useState('')
    const [selectedTableIndex, setSelectedTableIndex] = useState(null)

    //set show Date picker
    const [isShowDatePicker, setShowDatePicker] = useState(false)
    const [dateSelect, setDateSelect] = useState(new Date())
    //set show Time picker
    const [isShowTimePicker, setShowTimePicker] = useState(false)
    const [timeSelect, setTimeSelect] = useState(new Date())
    //set init validate message
    const [msgError, setMsgError] = useState('')
    const [isShowValidMsg, setShowValidMsg] = useState(false)
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
        });
        //initload
        //call Api load Table list
        callGetListTable()
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

    //API get list table
    const callGetListTable = async () => {
        try {
            const res = await axios.get(`${apis.TABLE_INFO_PATH}/getList`)
            let objDt = res.data.data.filter(item => item.table_stt_nm == 'Emptying' || item.table_stt_nm == 'Booking')
            setListTable(objDt)
        } catch (error) {
            console.log(`${error.message}`)
        }
    }

    //callPost insert order list to DB
    const callPostInsertTableInfo = async () => {
        try {
            const res = await axios.post(`${apis.TABLE_INFO_PATH}/insertOrUpdateBook`, {
                "id": tableInfoId,
                "tableId": tableIdSelected,
                "tableSttId": 2, //Booking
                "bookDt": system.systemDateString(dateSelect),
                "bookTm": system.systemTimeString(timeSelect),
                "guessNm": txtGuessNm,
                "guessCount": txtGuessCount,
                "guessPhone": txtGuessPhone,
                "isEnd": "0",
                "noteTx": txtNote,
                "crtDt": system.systemDateTimeString(),
                "crtUserId": userId,
                "crtPgmId": system.BOOK_SCREEN,
                "delFg": "0"
            })
            if (res.data.status == contents.status_ok) {
                //setTableInfoId(res.data.data.id)
                callGetListTable()
                Toast(contents.msg_success_create_table)
            }
            else {
                Toast(contents.msg_err_create_table)
            }
        } catch (error) {
            console.log(`callPostInsertTableInfo ${error}`)
        }
    }

    // update table T_Table_info => cancel book
    const callPutCancelBookTable = async () => {
        try {
            if (tableInfoId == null) {
                Toast("Please choose any booked table!")
            }
            else {
                const res = await axios.put(`${apis.TABLE_INFO_PATH}/updateAfterCheckout/${tableInfoId}`)
                if (res.data.status == contents.status_ok) {
                    callGetListTable()
                    Toast("Cancel successfully!")
                }
                else {
                    Toast("Cancel unsuccessfully!")
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    //<-------------------------Function-------------------------END>

    return <View style={{ flex: 100 }}>
        <ImageBackground style={{ flex: 100, padding: 5 }}
            source={{
                uri: images.backgroundApp
            }}>
            {/* info */}
            <View style={{
                flex: 60,
                borderWidth: 1,
                marginBottom: 5,
                borderRadius: 15,
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 5,
                backgroundColor: 'white'
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
                                onChangeText={onChangeGuessNm}
                                value={txtGuessNm}
                                style={styles.input_content}
                                maxLength={30} />
                        </View>
                        {/* Guess phone */}
                        <View style={[{ flex: 15 }, styles.center_mt5]}>
                            <TextInput
                                placeholder='Please type guess phone here...'
                                onChangeText={onChangeGuessPhone}
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
                                <Icon name='plus-circle' size={25} color={'green'} />
                            </TouchableOpacity>
                        </View>
                        {/* Date */}
                        <View style={[{ flex: 12, flexDirection: 'row' }, styles.center_mt5]}>
                            <View style={[{
                                flex: 70,
                                borderWidth: 1,
                                borderRadius: 15,
                                height: '100%'
                            }, styles.center_all]}>
                                <Text
                                    style={styles.label_content}
                                >{system.getDateFormat(dateSelect)}</Text>
                            </View>
                            <View style={[{
                                flex: 30,
                                height: '100%',
                            }, styles.center_all]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowDatePicker(true)
                                    }}
                                >
                                    <Icon name='calendar-alt' color={'green'} size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Time */}
                        <View style={[{ flex: 12, flexDirection: 'row' }, styles.center_mt5]}>
                            <View style={[{
                                flex: 70,
                                borderWidth: 1,
                                borderRadius: 15,
                                height: '100%'
                            }, styles.center_all]}>
                                <Text
                                    style={styles.label_content}
                                >{system.getTimeFormat(timeSelect)}</Text>
                            </View>
                            <View style={[{
                                flex: 30,
                                height: '100%',
                            }, styles.center_all]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowTimePicker(true)
                                    }}
                                >
                                    <Icon name='calendar-alt' color={'green'} size={25} />
                                </TouchableOpacity>
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
                <View style={{ flex: 12 }}>
                    {/* Book button */}
                    <View style={[{ flex: 15 }, styles.center_mt5]}>
                        <TouchableOpacity
                            onPress={() => {
                                let msgErr = ''
                                if (tableNmSelected == '') {
                                    msgErr = msgErr + `${contents.msg_warn_nonselect_table}\n`
                                }
                                if (txtGuessNm == '') {
                                    msgErr = msgErr + `${contents.msg_warn_empty_guess_nm}\n`
                                }
                                if (txtGuessPhone == null) {
                                    msgErr = msgErr + `${contents.msg_warn_empty_guess_phone}\n`
                                }
                                if (txtGuessCount == 0) {
                                    msgErr = msgErr + `${contents.msg_warn_empty_guess}\n`
                                }
                                if (msgErr != '') {
                                    setMsgError(msgErr)
                                    setShowValidMsg(true)
                                }
                                else {
                                    setShowConfirmBook(true)
                                }
                            }}
                            style={[{
                                flex: 50,
                                backgroundColor: 'green',
                                width: '60%',
                                borderRadius: 20
                            }, styles.center_all]}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>BOOK TABLE</Text>
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
                            selected={selectedTableIndex}
                            onPress={() => {
                                setSelectedTableIndex(index)
                                setTableIdSelected(item.table_id)
                                setTableInfoId(item.table_info_id)
                                setTableNmSelected(item.table_nm_vn || item.table_nm_en || item.table_nm_jp)
                                setGuessCount(item.guess_count ? parseInt(item.guess_count) : 0)
                                onChangeGuessNm(item.guess_nm)
                                onChangeGuessPhone(item.guess_phone)
                                if (item.book_dt != null) {
                                    setDateSelect(system.getDateFormatFromString(item.book_dt))
                                    setTimeSelect(system.getTimeFormatFromString(item.book_dt + item.book_tm))
                                }
                                else {
                                    setDateSelect(new Date())
                                    setTimeSelect(new Date())
                                }
                                setNote(item.note_tx)
                            }}
                            onLongPress={() => {
                                setShowConfirmCancel(true)
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
            open={isShowTimePicker}
            date={timeSelect}
            onConfirm={(date) => {
                setShowTimePicker(false)
                setTimeSelect(date)
            }}
            onCancel={() => {
                setShowTimePicker(false)
            }}
        />
        <ModalDialog
            visible={isShowValidMsg}
            children={{
                title: contents.title_warning,
                message: msgError,
                type: 'ok'
            }}
            onYes={() => {
                setShowValidMsg(false)
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
                callPostInsertTableInfo()
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

