import React, { useState } from 'react'
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native'

const ModalDialog = ({ visible, children, onYes, onNo }) => {

    const { title, message, type } = children

    return <Modal transparent visible={visible}>
        <View style={styles.modalBackGround}>
            <View style={styles.modalContainer}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{
                        flex: 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.title}>{title}</Text>
                    </View>


                    <View style={{
                        flex: 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.text}>{message}</Text>
                    </View>

                    {/* {type} */}
                    <View style={{
                        flex: 30,
                        justifyContent: 'space-evenly',
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                    }}>
                        <View style={{ flex: 50, borderTopWidth: 1, marginRight: 2 }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    onYes()
                                }}>
                                <Text style={styles.text}>OK</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 50, borderTopWidth: 1 }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    onNo()
                                }}>
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '60%',
        height: 120,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 20
    },
    title: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    text: {
        color: 'black'
    }
})

export default ModalDialog

