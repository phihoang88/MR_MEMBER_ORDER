import React from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { images, system } from '../../config'

const BookListItem = (props) => {
    const {
        bookId,
        tableId,
        tableNmVn,
        tableNmEn,
        tableNmJp,
        tableAva,
        bookDate,
        bookTimeFrom,
        bookTimeTo,
        guessNm,
        guessCount,
        guessPhone,
        noteTx,
        isCancel,
        isEnd
    } = props.booklst

    const onPress = props.onPress

    //past: grey || present:normal
    const getBookDateInfo = () => {
        let bookDay = new Date(bookDate + 'T' + bookTimeTo)
        let toDay = new Date(new Date().setHours(new Date().getHours() + 7))
        if (isCancel == '0' && isEnd == '0') {
            if (bookDay < toDay) {
                return {
                    bgColor: 'grey',
                    bgStatusColor: 'rgba(0,0,0,0.3)',
                    sttTitle: 'Expire',
                    sttColor: 'red',
                    onPress: 'no'
                }
            }
            else {
                return {
                    bgColor: 'white',
                    bgStatusColor: 'rgba(0,0,0,0.3)',
                    sttTitle: 'Booking',
                    sttColor: 'blue',
                    onPress: 'yes'
                }
            }
        }
        else {
            if (isCancel == '1') {
                return {
                    bgColor: 'grey',
                    bgStatusColor: 'rgba(0,0,0,0.3)',
                    sttTitle: 'Cancel',
                    sttColor: 'white',
                    onPress: 'no'
                }
            }
            if (isEnd == '1') {
                return {
                    bgColor: 'darkseagreen',
                    bgStatusColor: 'rgba(0,182,30,0.5)',
                    sttTitle: 'Served',
                    sttColor: 'white',
                    onPress: 'no'
                }
            }
        }
    }
    const renderGuesscount = (guessCnt) => {

        let lstUser = []
        for (let i = 1; i <= guessCnt; i++) {
            lstUser.push(
                <Icon style={{
                    marginRight: 5
                }}
                    name='user-alt' size={15} color={'blue'} />
            )
        }
        return lstUser
    }

    return <TouchableOpacity style={{
        width: '100%',
        height: Dimensions.get('window').height / 6,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        flexDirection: 'row',
        backgroundColor: getBookDateInfo().bgColor
    }}
        onPress={getBookDateInfo().onPress == 'yes'? onPress : null}>
        {/* image cover */}
        <View style={{
            height: Dimensions.get('window').height / 6,
            width: Dimensions.get('window').height / 6,
            paddingLeft: 5,
            paddingTop: 5,
            paddingBottom: 7,
            paddingRight: 5,
            flexDirection: 'row'
        }}>
            {/* image item */}
            <View style={{
                height: '100%',
                width: '100%',
                borderWidth: 1,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    position: 'absolute',
                    backgroundColor: getBookDateInfo().bgStatusColor,
                    height: 30,
                    width: 60,
                    borderRadius: 10,
                    zIndex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            color: getBookDateInfo().sttColor
                        }}
                    >{getBookDateInfo().sttTitle}</Text>
                </View>
                <Image source={{
                    uri: images.tableImage,
                }}
                    style={{
                        height: '80%',
                        width: '80%',
                        resizeMode: 'cover',
                    }}
                />
                <Text
                    style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold',
                    }}
                >{tableNmVn || tableNmEn || tableNmJp}</Text>
            </View>
        </View>
        {/* detail */}
        <View style={{
            flex: 1,
            height: '100%',
            width: '100%',
            padding: 5,
        }}>
            <View style={{
                flex: 50,
                flexDirection: 'row'
            }}>
                {/* table name */}
                <View style={{
                    flex: 70,
                }}>
                    <Text>
                        Guess: <Text style={{
                            color: 'black',
                            fontSize: 16
                        }}>{guessNm}</Text>
                    </Text>
                    <Text>
                        Phone: <Text style={{
                            color: 'black',
                            fontSize: 16,
                        }}>{guessPhone}</Text>
                    </Text>
                </View>
                {/* order datetime */}
                <View style={{
                    flex: 30,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{
                        color: 'black'
                    }}>{bookDate}</Text>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 12
                        }}
                    >{bookTimeFrom}~{bookTimeTo}</Text>
                </View>
            </View>
            {/* guess info */}
            <View style={{
                flex: 25,
            }}>
                <Text>
                    Note: <Text style={{
                        color: 'black'
                    }}>{noteTx}</Text>
                </Text>
            </View>
            <View style={{
                flex: 25,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                {renderGuesscount(guessCount)}
            </View>
        </View>
    </TouchableOpacity>
}

export default BookListItem