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
} from 'react-native'
import { apis, colors } from '../config'
import {
    useFocusEffect
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import TableOrderItem from './subScreens/TableOrderItem'
import MenuItem from './subScreens/MenuItem'
import MealItem from './subScreens/MealItem'
import { ModalDialog } from '../components'
import axios from 'axios';


const TableOrderScreen = (props) => {



    //<-----------------------initLoad--------------------------->START
    //set move screen navigate
    const { navigation, route } = props
    const { navigate, goBack } = navigation

    //get pass params
    const table_info_id = route.params.table_info_id
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




    //set disable load list order
    const [isFetchingOrderLstTmp, setFetchingOrderLstTmp] = useState(false)



    //init load
    useEffect(() => {
        //initload
        //load list menu
        callGetListMenu()
        callGetAllMealList()
        if (table_stt == 'Serving' || table_stt == 'Ordering') {
            callGetAllMealOrderList()
        }
        else {
            setListOrderTmp([])
        }
    }, [navigate])

    //run when menu change
    useEffect(() => {
        if (selectedMenuId != '') {
            if (listAllProduct != '') {
                setListProductById(listAllProduct.filter(item => item.menu_id === selectedMenuId))
            }
        }
    }, [selectedMenuId, listAllProduct])







    useEffect(() => {
        setFetchingOrderLstTmp(false)
    }, [isFetchingOrderLstTmp])

    //<-----------------------initLoad--------------------------->END







    //<-----------------------Function---------------------------->
    //get List Menu
    const callGetListMenu = async () => {
        try {
            const res = await axios.get(`${apis.MENU_PATH}/getList`)
            if (res.data.status == 'success') {
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

    //get List Meal by Menu Id
    const callGetAllMealList = async () => {
        try {
            const res = await axios.get(`${apis.PRODUCT_PATH}/getList`)
            if (res.data.status == 'success') {
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
    const callGetAllMealOrderList = async () => {
        try {
            // const res = await axios.get(`${apis.PRODUCT_PATH}/getList`)
            // if (res.data.status == 'success') {
            //     setListAllProduct(res.data.data)
            // }
            // else {
            //     setListAllProduct([])
            // }
        } catch (error) {
            console.log(`callGetAllMealOrderList ${error.message}`)
        }
    }

    //callPost insert order list to DB
    const callPostInsertOrders = async () => {
        try {
            let orderList = listOrderTmp.filter(item => item.product_order_stt_id == 0)
                                        .map(item => ({
                                            "tableInfoId" : table_info_id,
                                            "productId" : item.product_id,
                                            "count" : item.product_count,
                                            "productOrderSttId" : item.product_order_stt_id,
                                            "orderDt" : getSystemDatetime(),
                                            "doneDt" : "",
                                            "crtDt" : getSystemDatetime(),
                                            "crtUserId" : "huy",
                                            "crtPgmId" : "table order",
                                            "updDt" : "",
                                            "updUserId" : "",
                                            "updPgmId" : "",
                                            "delFg" : "0"
                                        })) 
            const res = await axios.post(`${apis.TABLE_PATH}/insertOrders`,orderList)
            res.data.status == 'success' ? alert('success') : alert('failed')
        } catch (error) {
            console.log(error)
        }
    }

    //<-----------------------Function---------------------------->











    //const order_list = listOrder.length == 0 ? [] : listOrder.order_list
    //const [lstOrders, setOrders] = useState(order_list)
    const [isVisibleDialogConfirm, setVisibleDialogConfirm] = useState(false)
    const [isVisibleDialogDelete, setVisibleDialogDelete] = useState(false)







    function setOrderTmpByAmount(data) {

        setFetchingOrderLstTmp(true)

        data.index = listOrderTmp.length + 1 //key row
        data.product_order_stt_id = 0        //not yet order
        data.product_count = 1
        listOrderTmp.push(data)
        setListOrderTmp(listOrderTmp)

        // const found = listOrderTmp.some(element => element.product_id == data.product_id)
        // if (!found) {
        //     listOrderTmp.push(data.data)
        // }
        // else {
        //     //Find index of specific object using findIndex method.    
        //     let objIndex = listOrderTmp.findIndex(obj => obj.product_id == data.product_id)

        //     //Update object's name property.
        //     listOrderTmp[objIndex].meal_count = data.meal_count
        // }
    }







    function getSystemDatetime(){
        let date = new Date()
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        return `${date.getFullYear()}${month}${day}${hours}${minutes}}`
    }





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
                    
                }}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    flexDirection:'row'
                }}>
                    <Icon name="vote-yea" size={20} color={'green'}>

                    </Icon>
                    <Text>
                        create table
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 20,
                margin: 10,
            }}>
                <TouchableOpacity 
                onPress={() => {
                    callPostInsertOrders()
                }}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    backgroundColor: 'orangered',
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'yellow'
                    }}
                    >ORDER</Text>
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
                                onDelete={() => {
                                    //setVisibleDialogDelete(true)
                                }}
                                onConfirm={() => {
                                    //setVisibleDialogConfirm(true)
                                }}
                            />}
                        //keyExtractor={item => item.table_id}
                        //onRefresh={setOrderTmpByAmount}
                        refreshing={isFetchingOrderLstTmp}
                        progressViewOffset={100}
                    />
                    {/* Dialog confirm */}
                    <ModalDialog
                        visible={isVisibleDialogConfirm}
                        children={{
                            title: 'Xác nhận!',
                            message: 'Đã chuẩn bị món xong?',
                            type: 'yes/no'
                        }}
                        onYes={() => {
                            setVisibleDialogConfirm(false)
                        }}
                        onNo={() => {
                            setVisibleDialogConfirm(false)
                        }}>
                    </ModalDialog>

                    <ModalDialog
                        visible={isVisibleDialogDelete}
                        children={{
                            title: 'Xóa bỏ!',
                            message: 'Xóa chọn món?',
                            type: 'yes/no'
                        }}
                        onYes={() => {
                            setVisibleDialogDelete(false)
                        }}
                        onNo={() => {
                            setVisibleDialogDelete(false)
                        }}>
                    </ModalDialog>

                    {/* Note */}
                    <View style={{ height: 80 }}>
                        <View style={styles.note_bg}>
                            <TextInput
                                placeholder='Please type notes here...'
                                multiline={true}
                            >
                            </TextInput>
                        </View>
                    </View>
                </View>
            </View>

            {/* Menu */}
            <View style={{ flex: 50 }}>
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
                            display: listMenu == '' ? 'flex' : 'none'
                        }}>
                            <Text>Menu Not Found!</Text>
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
        flex: 1,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start'
    },


})



export default TableOrderScreen