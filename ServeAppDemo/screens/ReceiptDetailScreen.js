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
import { colors } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ReceiptDetailItem } from '../screens'
import { useFocusEffect } from '@react-navigation/native'
const ReceiptDetailScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    //<-------------------------------initload-----------------------------START>
    //get pass value
    let {
        table_info_id,
        listProducts,
        product_order_stt_id,
        table_nm_vn,
        table_nm_en,
        table_nm_jp,
    } = route.params.receiptDetail

    //set init sum Count
    const [sumCount, setSumCount] = useState(0)
    //set init sum price
    const [sumPrice, setSumPrice] = useState(0)

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            //goback
            calculateTotal()
        })
        //init
        calculateTotal()
        return unsub
    }, [navigation])


    //<-------------------------------initload-----------------------------END>




    console.log(route.params)



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
    }


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
                        flex: 75, borderBottomWidth: 1, flexDirection: 'row',
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
                            <Text style={{
                                color: 'black'
                            }}>VAT</Text>
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
                            }}>x</Text>
                            <Text style={{
                                color: 'black'
                            }}>x</Text>
                            <Text style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>{sumPrice}</Text>
                        </View>
                    </View>
                    {/* Button */}
                    <View style={{
                        flex: 25,
                        flexDirection: 'row',
                        paddingTop: 2,
                        paddingBottom: 2,
                        borderBottomWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            borderRadius: 10,
                            backgroundColor: 'green',
                            width: '50%'
                        }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'white'
                                }}>EXPORT RECEIPT</Text>
                            </TouchableOpacity>
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
                                        width: '100%'
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
                                }}>120</Text>
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
                                }}>5458</Text>
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
                    }}>
                        <View style={{
                            borderRadius: 10,
                            backgroundColor: 'orangered',
                            width: '50%'
                        }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'white'
                                }}>CHECK OUT</Text>
                            </TouchableOpacity>
                        </View>
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
})


export default ReceiptDetailScreen