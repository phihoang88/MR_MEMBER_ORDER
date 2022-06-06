import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity,
    FlatList
} from 'react-native'

import { images, apis, system, colors, contents } from '../config'
import { BookTableItem } from '../screens'
import axios from 'axios'

import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { ModalDialog, Toast } from '../components'

const BookScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

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
    const [tableNmSelected, setTableNmSelected] = useState('')

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

    //initload function
    useEffect(() => {
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
            const res = await axios.get(`${apis.TABLE_PATH}/getList`)
            let objDt = res.data.data.filter(item => item.table_stt_nm == 'Emptying' || item.table_stt_nm == 'Booking')
            setListTable(objDt)
        } catch (error) {
            console.log(`huy ${error.message}`)
        }
    }

    //callPost insert order list to DB
    const callPostInsertTableInfo = async () => {
        try {
            const res = await axios.post(`${apis.TABLE_PATH}/insertInfos`, {
                "tableId": tableIdSelected,
                "tableSttId": 2, //Booking
                "bookDt": system.systemDateString(),
                "bookTm": system.systemTimeString(),
                "guessNm": txtGuessNm,
                "guessCount": txtGuessCount,
                "guessPhone": txtGuessPhone,
                "isEnd": "0",
                "noteTx": txtNote,
                "crtDt": system.systemDateTimeString(),
                "crtUserId": "huy",
                "crtPgmId": "book screen",
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
    //<-------------------------Function-------------------------END>

    return <View style={{ flex: 100, padding: 5 }}>
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
                            flex: 1,
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
            padding: 5
        }}>
            <FlatList
                data={listTable}
                numColumns={3}
                renderItem={({ item, index }) =>
                    <BookTableItem
                        table={item}
                        key={index}
                        index={index}
                        onPress={() => {
                            setTableIdSelected(item.table_id)
                            setTableNmSelected(item.table_nm_vn || item.table_nm_en || item.table_nm_jp)
                        }}
                    />}
            //keyExtractor={item => item.table_id}
            //onRefresh={setOrderTmpByAmount}
            // refreshing={isFetchingOrderLstTmp}
            // progressViewOffset={100}
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

