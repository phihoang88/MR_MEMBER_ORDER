import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TextInput,
    Keyboard,
    BackHandler,
} from 'react-native'
import { RadioButton } from 'react-native-paper'
import { apis, colors, system, contents } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ReceiptDetailItem } from '../screens'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { Toast, ModalDialog, Notification } from '../components'
import { getLoginInfo } from '../lib/pushnotification_helper'

const ReceiptDetailScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //get userId
    const [userId, setUserId] = useState('')

    //<-------------------------------initload-----------------------------START>
    //get pass value
    let {
        table_info_id,
        listProducts,
        product_order_stt_id,
        table_nm_vn,
        table_nm_en,
        table_nm_jp,
        is_end
    } = route.params.receiptDetail

    //set init sum Count
    const [sumCount, setSumCount] = useState(0)
    //set init sum price
    const [sumPrice, setSumPrice] = useState(0)
    //set radio vat
    const [checked, setChecked] = useState('10')
    //set vat value
    const [vatValue, setVatValue] = useState(null)
    //set init input cash
    const [cash, setCash] = useState(null)
    //set init excess cash
    const [excessCash, setExcessCash] = useState(0)
    //set init final income
    const [finalIncome, setFinalIncome] = useState(0)
    //set init dialog confirm checkout
    const [isShowConfirm, setShowConfirm] = useState(false)

    useEffect(() => {
        getUserId()
        const unsub = navigation.addListener('focus', () => {
            //goback
            calculateTotal()
        })
        //init
        calculateTotal()
        return unsub
    }, [navigation])

    const getUserId = async () => {
        let data = await getLoginInfo()
        setUserId(data.userId)
    }
    //<-------------------------------initload-----------------------------END>

    // insert table T_Table_receipt
    const callPostReceipt = async () => {
        try {
            const res = await axios.post(`${apis.RECEIPT_PATH}/insert`, {
                "tableInfoId": table_info_id,
                "vat": checked,
                "total": sumPrice,
                "cash": cash,
                "crtDt": system.systemDateTimeString(),
                "crtUserId": userId,
                "crtPgmId": system.RECEIPT_DETAIL_SCREEN,
                "delFg": "0"
            })
            if (res.data.status == contents.status_ok) {
                Toast(contents.msg_success_checkout)
                callPutUpdateTableInfo()
            }
            else {
                Toast(contents.msg_err_checkout)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // update table T_Table_info
    const callPutUpdateTableInfo = async () => {
        try {
            const res = await axios.put(`${apis.TABLE_INFO_PATH}/updateAfterCheckout/${table_info_id}`)
            if (res.data.status == contents.status_ok) {
                await callNotification()
                goBack()
            }
            else {
                Toast(contents.msg_err_checkout)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    //callPost insert order list to DB
    const callNotification = async () => {
        try {
            console.log(table_info_id)
            const res = await axios.get(`${apis.TABLE_INFO_PATH}/getDeviceToken/${table_info_id}`)
            if (res.data.status == 'success' && res.data.data) {
                await Notification.callSendNotificationToDevice(res.data.data)
            }
            else {
                Toast("Error")
            }

        } catch (error) {
            console.log(`callNotification ${error}`)
        }
    }

    //set show key board
    const [isShowKeyBoard, SetShowKeyBoard] = useState(false)
    //when key board show
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            SetShowKeyBoard(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            SetShowKeyBoard(false)
        })
    })

    // useFocusEffect get called each time when screen comes in focus
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                goBack()
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                return true;
            };
            // Add Event Listener for hardwareBackPress
            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );
            return () => {
                // Once the Screen gets blur Remove Event Listener
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress
                );
            };
        }, []),
    );


    function calculateTotal() {

        let sumAmount = listProducts.reduce(function (prev, current) {
            return prev + + current.count
        }, 0);
        setSumCount(sumAmount)

        let sumPrice = listProducts.reduce(function (prev, current) {
            return prev + + current.count * current.price
        }, 0);
        setSumPrice(sumPrice)
        setVatValue(Math.round(sumPrice * parseInt(checked) / 100))
    }

    useEffect(() => {
        setVatValue(Math.round(sumPrice * parseInt(checked) / 100))
    }, [checked])


    return <View style={{ flex: 1 }}>
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
                    Table
                </Text>
                <Text style={styles.tabbar_nm}>
                    {table_nm_vn || table_nm_en || table_nm_jp}
                </Text>
            </View>
        </View>
        {/* Detail */}
        <View style={{
            flex: 93,
            padding: 5
        }}>
            <View style={{
                flex: 1,
                borderWidth: 1,
                borderRadius: 10
            }}>
                {/* Order List */}
                <View style={{
                    flex: 50,
                    display: isShowKeyBoard == true ? 'none' : 'flex',
                }}>
                    {/* Header */}
                    <View style={{ flex: 10, flexDirection: 'row' }}>
                        {/* Item */}
                        <View style={{
                            flex: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>No.</Text>
                        </View>
                        {/* Item */}
                        <View style={{
                            flex: 55,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Product</Text>
                        </View>
                        {/* Count */}
                        <View style={{
                            flex: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Count</Text>
                        </View>
                        {/* Price */}
                        <View style={{
                            flex: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Price</Text>
                        </View>

                    </View>
                    {/* Data */}
                    <View style={{ flex: 90, padding: 5 }}>
                        <FlatList
                            data={listProducts}
                            renderItem={({ item, index }) =>
                                <ReceiptDetailItem
                                    detail={item}
                                    key={item.product_id}
                                    index={index}
                                />
                            }
                            keyExtractor={item => item.product_id}
                        />
                    </View>
                </View>

                {/* Calculate */}
                <View style={{
                    flex: 25,
                    borderTopWidth: 1,
                }}>
                    <View style={{
                        flex: 1, borderBottomWidth: 1, flexDirection: 'row',
                    }}>
                        {/* No */}
                        <View style={{
                            flex: 10,
                        }}>
                        </View>
                        {/* Label */}
                        <View style={{
                            flex: 55,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: 'black'
                            }}>Sum</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>VAT(8%)</Text>
                                <RadioButton
                                    value="8"
                                    status={checked == '8' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('8')}
                                />
                                <Text style={{
                                    color: 'black'
                                }}>VAT(10%)</Text>
                                <RadioButton
                                    value="10"
                                    status={checked == '10' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('10')}
                                />
                            </View>
                            <Text style={{
                                color: 'black'
                            }}>Discount</Text>
                            <Text style={{
                                color: 'black'
                            }}>Others</Text>
                            <Text style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Total</Text>
                        </View>

                        {/* Count */}
                        <View style={{
                            flex: 15,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            borderLeftWidth: 1,
                        }}>
                            <Text style={{
                                color: 'black'
                            }}>{sumCount}</Text>
                            <Text style={{
                                color: 'black'
                            }}>{checked}%</Text>
                            <Text style={{
                                color: 'black'
                            }}>x</Text>
                            <Text style={{
                                color: 'black'
                            }}>x</Text>
                            <Text style={{
                                color: 'black'
                            }}></Text>
                        </View>
                        {/* Price */}
                        <View style={{
                            flex: 20,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            borderLeftWidth: 1,
                        }}>
                            <Text style={{
                                color: 'black'
                            }}>{sumPrice}</Text>
                            <Text style={{
                                color: 'black'
                            }}>{vatValue}</Text>
                            <Text style={{
                                color: 'black'
                            }}>x</Text>
                            <Text style={{
                                color: 'black'
                            }}>x</Text>
                            <Text style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>{sumPrice + vatValue}</Text>
                        </View>
                    </View>
                </View>


                {/* Check out */}
                <View style={{
                    flex: 25,
                }}>
                    {/* Detail */}
                    <View style={{
                        flex: 75,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 10,
                        }}></View>
                        <View style={{
                            flex: 55,
                        }}>
                            <View style={{
                                flex: 40,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>Cash</Text>
                            </View>
                            <View style={{
                                flex: 30,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>Excess cash</Text>
                            </View>
                            <View style={{
                                flex: 30,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: 16
                                }}>Final income</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 35,
                            borderLeftWidth: 1
                        }}>
                            <View style={{
                                flex: 40,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5
                            }}>
                                <TextInput
                                    style={{
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        fontSize: 14,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    keyboardType='numeric'
                                    value={cash}
                                    onChangeText={(cash) => {
                                        setCash(cash)
                                        if (parseInt(cash) > sumPrice + vatValue) {
                                            setExcessCash(parseInt(cash) - (sumPrice + vatValue))
                                            setFinalIncome(parseInt(cash) - (parseInt(cash) - (sumPrice + vatValue)))
                                        }
                                        else {
                                            setExcessCash(0)
                                            setFinalIncome(0)
                                        }
                                    }}
                                />
                            </View>
                            <View style={{
                                flex: 30,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'black'
                                }}>{excessCash}</Text>
                            </View>
                            <View style={{
                                flex: 30,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: 16
                                }}>{finalIncome}</Text>
                            </View>
                        </View>
                    </View>
                    {/* button */}
                    <View style={{
                        flex: 25,
                        flexDirection: 'row',
                        paddingTop: 2,
                        paddingBottom: 2,
                        borderTopWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: is_end == 0 ? 'flex' : 'none'
                    }}>
                        <TouchableOpacity style={{
                            flex: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            backgroundColor: 'green',
                            marginLeft: 20,
                            marginRight: 20,
                            borderRadius: 15
                        }}>
                            <Text style={{
                                color: 'white'
                            }}>EXPORT RECEIPT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                const found = listProducts.some(item => item.product_order_stt_id == 0)
                                if (found) {
                                    Toast('Table is serving...Try it later!')
                                }
                                if (cash == null || finalIncome == 0 || excessCash == 0) {
                                    Toast('Please input cash!')
                                }
                                else {
                                    setShowConfirm(true)
                                }
                            }}
                            style={{
                                flex: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                backgroundColor: 'orangered',
                                marginLeft: 20,
                                marginRight: 20,
                                borderRadius: 15
                            }}>
                            <Text style={{
                                color: 'white'
                            }}>CHECK OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <ModalDialog
            visible={isShowConfirm}
            children={{
                title: contents.title_notice,
                message: `Check out Table ${table_nm_vn}?`,
                type: 'yes/no'
            }}
            onYes={() => {
                setShowConfirm(false)
                callPostReceipt()
            }}
            onNo={() => {
                setShowConfirm(false)
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabbar_title: {
        flex: 50,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        marginLeft: 10,
        flexDirection: 'row',
    },
    label: {
        color: 'black',
        textAlign: 'left',
        marginRight: 10
    },
    tabbar_nm: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left'
    },
})


export default ReceiptDetailScreen