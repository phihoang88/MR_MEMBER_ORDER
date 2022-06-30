import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    TextInput,
    FlatList,
    StyleSheet,
    Keyboard
} from 'react-native'
import { apis, colors, system, contents } from '../config'
import {
    useFocusEffect
} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { MealItem, MenuItem, TableOrderItem } from '../screens'
import { ModalDialog, Toast } from '../components'
import axios from 'axios'
import { getLoginInfo } from '../lib/pushnotification_helper'

const TableOrderScreen = (props) => {

    //<-----------------------initLoad--------------------------->START
    //set move screen navigate
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //get userId
    const [userId, setUserId] = useState('')

    //get pass params
    const table_id = route.params.table_id
    const table_nm = route.params.table_nm
    const table_stt = route.params.table_stt


    //set empty list order
    const [listOrderTmp, setListOrderTmp] = useState([])
    //set empty list menu
    const [listMenu, setListMenu] = useState([])
    //set init selected menu 
    const [selectedIndexMenu, setSelectedIndexMenu] = useState(0)
    const [selectedMenuId, setSelectedMenuId] = useState('')
    //set init list All Product
    const [listAllProduct, setListAllProduct] = useState([])
    //set init list product by menu id
    const [listProductById, setListProductById] = useState([])
    //set button Create/Order
    const [tableInfoId, setTableInfoId] = useState(route.params.table_info_id)

    //set disable load list order
    const [isFetchingOrderLstTmp, setFetchingOrderLstTmp] = useState(false)

    //set init select item order
    const [selectOrderId, setSelectOrderId] = useState('')
    const [selectedOrderIndex, setSelectedOrderIndex] = useState('')
    // set init note
    const [txtNote, setNote] = useState('')

    //set init progress update table
    const [isDoneUpdateOrder, setDoneUpdateOrder] = useState(false)

    //set show key board
    const [isShowKeyBoard, SetShowKeyBoard] = useState(false)

    //set init show Dialog
    const [isShowCreateTable, setShowCreateTable] = useState(false)
    const [isShowRemoveProduct, setShowRemoveProduct] = useState(false)
    const [isShowOrderConfirm, setShowOrderConfirm] = useState(false)
    const [isShowDoneOrder, setShowDoneOrder] = useState(false)
    const [isNotiNotExistsOrder, setNotiNotExistsOrder] = useState(false)
    const [isNotiGoBack, setNotiGoBack] = useState(false)
    const [isNotiOrder, setNotiOrder] = useState(false)

    //init load
    useEffect(() => {
        getUserId()
        //initload
        if (tableInfoId != null) {
            setNote(route.params.note_tx)
            //load list menu
            callGetListMenu()
            callGetAllMealList()
            if (table_stt == contents.table_serving || table_stt == contents.table_ordering) {
                callGetAllMealOrderList(tableInfoId)
            }
            else {
                setListOrderTmp([])
            }
        }
    }, [navigate])

    //run after create table success
    useEffect(() => {
        if (tableInfoId != null) {
            callGetListMenu()
            callGetAllMealList()
        }
    }, [tableInfoId])

    //run when menu change
    useEffect(() => {
        if (selectedMenuId != '') {
            if (listAllProduct != '') {
                setListProductById(listAllProduct.filter(item => item.menu_id === selectedMenuId))
            }
        }
    }, [selectedMenuId, listAllProduct])

    //run after add product to list
    useEffect(() => {
        setFetchingOrderLstTmp(false)
    }, [isFetchingOrderLstTmp])

    //<-----------------------initLoad--------------------------->END


    //<-----------------------Function---------------------------->
    //when key board show
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            SetShowKeyBoard(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            SetShowKeyBoard(false)
        })
    })

    const getUserId = async () => {
        let data = await getLoginInfo()
        setUserId(data.userId)
    }

    //get List Menu
    const callGetListMenu = async () => {
        try {
            const res = await axios.get(`${apis.MENU_PATH}/getList`)
            if (res.data.status == contents.status_ok) {
                setListMenu(res.data.data)
                setSelectedIndexMenu(0)
                setSelectedMenuId(res.data.data[0].menu_id)
            }
            else {
                setListMenu([])
                setSelectedIndexMenu(-1)
                setSelectedMenuId('')
            }
        } catch (error) {
            console.log(`callGetListMenu ${error.message}`)
        }
    }

    //get All Product List 
    const callGetAllMealList = async () => {
        try {
            const res = await axios.get(`${apis.PRODUCT_PATH}/getList`)
            if (res.data.status == contents.status_ok) {
                setListAllProduct(res.data.data)
            }
            else {
                setListAllProduct([])
            }
        } catch (error) {
            console.log(`callGetAllMealList ${error.message}`)
        }
    }

    //get List Order of Table by table_id, table_status_id, 
    const callGetAllMealOrderList = async (tableInfoId) => {
        try {
            const res = await axios.get(`${apis.TABLE_ORDER_PATH}/getOrderingList/${tableInfoId}`)
            if (res.data.status == contents.status_ok) {
                if (res.data.data != null) {
                    setListOrderTmp(res.data.data)
                    let foundOrderNotDone = res.data.data.some(element => element.product_order_stt_id != "1")
                    if (!foundOrderNotDone) {
                        //Done
                        callPutUpdateTableStatus(3)
                    }
                    else {
                        // Ordering
                        callPutUpdateTableStatus(4)
                    }
                }
                else {
                    setListOrderTmp([])
                }
            }
            else {
                //goBack()
                Toast(contents.msg_info_order_list_empty)
            }
        } catch (error) {
            console.log(`callGetAllMealOrderList ${error.message}`)
        }
    }

    //callPost insert order list to DB
    const callPostInsertOrders = async () => {
        try {
            let orderList = listOrderTmp.filter(item => item.product_order_stt_id == "")
                .map(item => ({
                    "tableInfoId": tableInfoId,
                    "productId": item.product_id,
                    "count": item.product_count,
                    "productOrderSttId": "0",
                    "noteTx": item.note_tx,
                    "orderDt": system.systemDateString(),
                    "orderTm": system.systemTimeString(),
                    "crtDt": system.systemDateTimeString(),
                    "crtUserId": userId,
                    "crtPgmId": system.TABLE_ORDER_SCREEN,
                    "delFg": "0"
                }))
            if (orderList.length == 0) {
                setNotiOrder(true)
            }
            else {
                const res = await axios.post(`${apis.TABLE_ORDER_PATH}/insert`, orderList)
                if (res.data.status == contents.status_ok) {
                    callGetAllMealOrderList(tableInfoId)
                    Toast(contents.msg_success_send_order)
                }
                else {
                    Toast(contents.msg_err_send_order)
                }
            }
        } catch (error) {
            console.log(`callPostInsertOrders ${error.message}`)
        }
    }

    //callPost insert order list to DB
    const callPostInsertTableInfo = async () => {
        try {
            const res = await axios.post(`${apis.TABLE_INFO_PATH}/insert`, {
                "tableId": table_id,
                "tableSttId": "4",//Ordering
                "serveDate": system.systemDateString(),
                "serveTime": system.systemTimeString(),
                "isEnd": "0",
                "noteTx": txtNote,
                "crtDt": system.systemDateTimeString(),
                "crtUserId": userId,
                "crtPgmId": system.TABLE_ORDER_SCREEN,
                "delFg": "0"
            })
            if (res.data.status == contents.status_ok) {
                setTableInfoId(res.data.data.id)
                Toast(contents.msg_success_create_table)
            }
            else {
                Toast(contents.msg_err_create_table)
            }
        } catch (error) {
            console.log(`callPostInsertTableInfo ${error}`)
        }
    }

    //callPut update note
    const callPutUpdateNoteTableInfo = async () => {
        try {
            const res = await axios.put(`${apis.TABLE_INFO_PATH}/updateNote/${tableInfoId}`, { txtNote })
            if (res.data.status == contents.status_ok) {
                Toast(contents.msg_success_update_note)
            }
            else {
                Toast(contents.msg_err_update_note)
            }
        } catch (error) {
            console.log(`callPutUpdateNoteTableInfo ${error}`)
        }
    }

    //callPut update done order to DB
    const callPutUpdateDoneOrder = async () => {
        try {
            const res = await axios.put(`${apis.TABLE_ORDER_PATH}/doneOrder/${selectOrderId}`)
            if (res.data.status == contents.status_ok) {
                callGetAllMealOrderList(tableInfoId)
                Toast(contents.msg_success_done_order)
            }
            else {
                Toast(contents.msg_success_done_order)
            }
        } catch (error) {
            console.log(`callPutUpdateDoneOrder ${error}`)
        }
    }

    //callPut update done order to DB
    const callPutUpdateTableStatus = async (tableSttId) => {
        try {
            const res = await axios.put(`${apis.TABLE_INFO_PATH}/updateStt/${tableInfoId}`, {
                "tableStatusId": tableSttId
            })
        } catch (error) {
            console.log(`callPutUpdateTableStatus ${error}`)
        }
    }

    //set List order temp
    function setOrderTmpByAmount(data) {
        setFetchingOrderLstTmp(true)
        data.product_order_stt_id = ""     //not yet order
        data.product_count = 1
        listOrderTmp.push(data)
        setListOrderTmp(listOrderTmp)
    }

    //set List order temp
    function delOrderTmpByAmount() {
        setFetchingOrderLstTmp(true)
        listOrderTmp.splice(selectedOrderIndex, 1)
        setListOrderTmp(listOrderTmp)
    }

    function updateNote(text, index) {
        listOrderTmp[index].note_tx = text
    }

    //<-----------------------Function---------------------------->

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

    return <View style={styles.container}>
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
                    Table
                </Text>
                <Text style={styles.tabbar_nm}>
                    {table_nm}
                </Text>
            </View>

            {/* order button */}
            <View style={{
                flex: 20,
                margin: 10,
            }}>
                <TouchableOpacity
                    onPress={() => {
                        if (listOrderTmp.length == 0) {
                            setNotiOrder(true)
                        }
                        else {
                            setShowOrderConfirm(true)
                        }
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        backgroundColor: 'orangered',
                        display: tableInfoId ? 'flex' : 'none'
                    }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'yellow'
                    }}
                    >Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setShowCreateTable(true)
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        backgroundColor: 'green',
                        display: tableInfoId ? 'none' : 'flex'
                    }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'yellow'
                    }}
                    >Create</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Order */}
        <View style={{ flex: 93 }} >
            {/* Order info */}
            <View style={{ flex: 50 }}>
                {/* Table */}
                <View style={styles.order_bg}>
                    {/* Header Table */}
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <View style={{ flex: 10 }}>
                            <Text style={styles.header_table_text}>No.</Text>
                        </View>
                        <View style={{ flex: 45 }}>
                            <Text style={styles.header_table_text}>Item</Text>
                        </View>
                        <View style={{ flex: 10 }}>
                            <Text style={styles.header_table_text}>Count</Text>
                        </View>
                        <View style={{ flex: 15 }}>
                            <Text style={styles.header_table_text}>Price</Text>
                        </View>
                        <View style={{ flex: 20 }}>
                            <Text style={styles.header_table_text}>Status</Text>
                        </View>
                    </View>

                    {/* Content Table */}
                    <FlatList
                        data={listOrderTmp}
                        renderItem={({ item, index }) =>
                            <TableOrderItem
                                order={item}
                                key={index}
                                index={index}
                                updateNote={updateNote}
                                onSelected={() => {
                                    // setNote(txtNote + ' ' + item.product_nm_vn + ' :')
                                }}
                                onDelete={() => {
                                    setSelectedOrderIndex(index)
                                    setShowRemoveProduct(true)
                                }}
                                onConfirm={() => {
                                    setSelectOrderId(item.table_order_id)
                                    setShowDoneOrder(true)
                                }}
                            />}
                        //keyExtractor={item => item.table_id}
                        //onRefresh={setOrderTmpByAmount}
                        refreshing={isFetchingOrderLstTmp}
                        progressViewOffset={100}
                    />
                    {/* Dialog confirm create table ok */}
                    <ModalDialog
                        visible={isShowCreateTable}
                        children={{
                            title: contents.title_confirm,
                            message: contents.cont_create_table,
                            type: contents.type_yesno
                        }}
                        onYes={() => {
                            setShowCreateTable(false)
                            callPostInsertTableInfo()
                        }}
                        onNo={() => {
                            setShowCreateTable(false)
                        }}>
                    </ModalDialog>
                    {/* Dialog show remove product ok*/}
                    <ModalDialog
                        visible={isShowRemoveProduct}
                        children={{
                            title: contents.title_confirm,
                            message: contents.msg_ask_del_product,
                            type: contents.type_yesno
                        }}
                        onYes={() => {
                            setShowRemoveProduct(false)
                            delOrderTmpByAmount()
                        }}
                        onNo={() => {
                            setShowRemoveProduct(false)
                        }}>
                    </ModalDialog>
                    {/* Dialog confirm order product ok*/}
                    <ModalDialog
                        visible={isShowOrderConfirm}
                        children={{
                            title: contents.title_confirm,
                            message: contents.msg_ask_confirm_order,
                            type: contents.type_yesno
                        }}
                        onYes={() => {
                            setShowOrderConfirm(false)
                            callPostInsertOrders()
                            //call api order
                        }}
                        onNo={() => {
                            setShowOrderConfirm(false)
                        }}>
                    </ModalDialog>
                    {/* Dialog confirm done order product */}
                    <ModalDialog
                        visible={isShowDoneOrder}
                        children={{
                            title: contents.title_confirm,
                            message: contents.msg_ask_confirm_done,
                            type: contents.type_yesno
                        }}
                        onYes={() => {
                            setShowDoneOrder(false)
                            if (selectOrderId != '') {
                                callPutUpdateDoneOrder()
                            }
                        }}
                        onNo={() => {
                            setShowDoneOrder(false)
                        }}>
                    </ModalDialog>
                    {/* Dialog notice no more order */}
                    <ModalDialog
                        visible={isNotiNotExistsOrder}
                        children={{
                            title: contents.title_notice,
                            message: contents.msg_warn_no_more_order,
                            type: 'yes/no'
                        }}
                        onYes={() => {
                            setNotiNotExistsOrder(false)
                            //call api done order
                        }}
                        onNo={() => {
                            setNotiNotExistsOrder(false)
                        }}>
                    </ModalDialog>
                    {/* Dialog notice go back when ordering */}
                    <ModalDialog
                        visible={isNotiGoBack}
                        children={{
                            title: contents.title_notice,
                            message: contents.msg_warn_goback,
                            type: 'yes/no'
                        }}
                        onYes={() => {
                            setNotiGoBack(false)
                            //call api done order
                        }}
                        onNo={() => {
                            setNotiGoBack(false)
                        }}>
                    </ModalDialog>
                    {/* Dialog notice order click without order */}
                    <ModalDialog
                        visible={isNotiOrder}
                        children={{
                            title: contents.title_notice,
                            message: contents.msg_warn_empty_order,
                            type: contents.type_ok
                        }}
                        onYes={() => {
                            setNotiOrder(false)
                            //call api done order
                        }}>
                    </ModalDialog>
                    {/* Note */}
                    <View style={{
                        height: 60,
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: 15,
                        display: tableInfoId ? 'flex' : 'none'
                    }}>
                        <View style={styles.note_bg}>
                            <TextInput
                                placeholder={contents.cont_plh_note}
                                multiline={true}
                                onChangeText={text => setNote(text)}
                                value={txtNote}
                            >
                            </TextInput>
                        </View>
                        <View style={{
                            flex: 20,
                            marginRight: -15
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    callPutUpdateNoteTableInfo()
                                }}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Icon name='save' size={30} color={'black'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Menu */}
            <View style={{ flex: 50, display: isShowKeyBoard == true ? 'none' : 'flex', }}>
                <View style={{ flex: 15 }}>
                    <FlatList
                        horizontal={true}
                        data={listMenu}
                        renderItem={({ item, index }) =>
                            <MenuItem
                                menu={item}
                                key={item.menu_id}
                                index={index}
                                selected={selectedIndexMenu}
                                onPress={() => {
                                    setSelectedIndexMenu(index)
                                    setSelectedMenuId(item.menu_id)
                                }} />
                        }
                        keyExtractor={item => item.menu_id}
                    />
                </View>

                <View style={{ flex: 85 }}>
                    <View style={{ flex: 100, padding: 10 }}>
                        {/* Header Table */}
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 5,
                            display: listMenu == '' ? 'none' : 'flex'
                        }}>
                            <View style={{ flex: 25 }}>
                                <Text style={styles.header_table_text}>Photo</Text>
                            </View>
                            <View style={{ flex: 50 }}>
                                <Text style={styles.header_table_text}>Item</Text>
                            </View>
                            <View style={{ flex: 20 }}>
                                <Text style={styles.header_table_text}>Price</Text>
                            </View>
                            <View style={{ flex: 15 }}>
                            </View>
                        </View>
                        <View style={{
                            display: listMenu == '' ? 'flex' : 'none',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text>{tableInfoId ? contents.msg_err_menu_not_found :
                                contents.msg_ask_create_table}</Text>
                        </View>

                        {/* Content Table */}
                        <ScrollView style={{ flex: 1 }} >
                            {listProductById.map((item, index) =>
                                <MealItem
                                    product={item}
                                    key={item.product_id}
                                    index={index}
                                    onPress={() => {
                                        setOrderTmpByAmount(item)
                                    }}
                                />
                            )}
                        </ScrollView>
                    </View>
                </View>
            </View>

        </View>
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
    order_bg: {
        flex: 100,
        backgroundColor: 'white',
        padding: 10
    },
    header_table_text: {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold'
    },
    note_bg: {
        flex: 80,
        width: '100%',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start'
    },
})

export default TableOrderScreen