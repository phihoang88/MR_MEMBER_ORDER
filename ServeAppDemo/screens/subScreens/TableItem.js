import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'


const TableItem = (props) => {
    let {
        table_info_id,
        table_id,
        table_nm_vn,
        table_stt_nm,
        table_ava,
        note_tx,
        //table_calling
    } = props.table

    const { onPress } = props

    function _getStatus(stt) {
        switch (stt) {
            case 'Emptying':
                return '#edeec6'
            case 'Ordering':
                return 'red'
            case 'Booking':
                return 'blue'
            case 'Serving':
                return 'green'
        }
    }
    return <TouchableOpacity
        style={{
            backgroundColor: _getStatus(table_stt_nm),
            height: Dimensions.get('window').height / 3 - 35,
            width: Dimensions.get('window').width / 3 - 7,
            marginLeft: 5,
            marginTop: 5,
            marginRight: 0,
            marginBottom: 0,
            padding: 7,
            borderRadius: 20,
            borderColor: 'grey',
            borderWidth: 1
        }}
        onPress={onPress}>
        {/* Image table */}
        <View style={{
            flex: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#edeec6',
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 20,
        }}>
            <View style={{
                flex: 50,
                height: '100%',
                width: '100%',
            }}>
                <Image
                    source={require('../../assets/images/table1.png')}
                    style={{
                        flex: 1,
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                    }} />
                {/* <Icon name='phone-alt'
                    size={25}
                    color={'red'}
                    style={{
                        display: table_calling == true ? 'flex' : 'none',
                        position: 'absolute',
                        alignSelf: 'flex-start',
                        marginTop: 5,
                        marginLeft: 5
                    }} /> */}
            </View>

            <View style={{
                flex: 50,
                height: '100%',
                width: '100%',
            }}>
                {/* table name */}
                <View style={styles.bgTable}>
                    <Text style={styles.table_nm}>
                        {table_nm_vn}
                    </Text>
                </View>
                {/* note table */}
                <View style={styles.bgNote}>
                    <Text style={styles.noteTx}>
                        {note_tx}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    bgTable: {
        justifyContent: 'center',
        flex: 10,
        borderTopWidth:1,
        borderBottomWidth:1,
    },
    table_nm: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    },
    bgNote: {
        flex: 40,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginRight: 1
    },
    noteTx: {
        fontSize: 12,
        color: 'black'
    }
})
export default TableItem

