import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { images, apis, contents } from '../config/index'
import { Toast } from '../components'
import {
    getLoginInfo,
    setLoginInfo,
    clearLoginInfo,

    getNewFCMToken,
    getCurrentFCMToken,
    setFCMToken,
    subForDeviceToTopic,
    unsubForDeviceToTopic,
    clearFCMToken



} from '../lib/pushnotification_helper'

import axios from 'axios'

import DeviceInfo from 'react-native-device-info'

const LoginScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    const [userId, onChangeId] = useState('')
    const [password, onChangePass] = useState('')

    useEffect(() => {
        autoLogin()
    }, [])

    const autoLogin = async () => {
        try {
            let loginInfo = await getLoginInfo()
            if (loginInfo.loginTm) {
                let nowHour = new Date().getHours()
                if (nowHour < 24 && nowHour >= 6) {
                    await setupFCMTokenforNotification()
                    navigate('Tabbar')
                }
                else {
                    await clearLoginInfo()
                }
            }
        }
        catch (error) {
            console.log(`autoLogin ${error}`)
        }
    }

    const setupFCMTokenforNotification = async () => {
        //check change token device
        let newToken = await getNewFCMToken()
        let currToken = await getCurrentFCMToken()
        // first login
        if (!currToken) {
            //check exists DB => unsub newest token
            const res = await axios.get(`${apis.DEVICE_TOKEN}/getByDeviceId/${DeviceInfo.getUniqueId()}`)
            if (res.data.status == 'success' && res.data.data) {
                //call api unsubscribe for device token 
                await unsubForDeviceToTopic(apis.TOPIC_MEMBER, res.data.data.deviceTokenNew)
            }
            //call api insert save token for device
            await callPostInsertDeviceToken(currToken, newToken)
            //call api subscribe for device token 
            await subForDeviceToTopic(apis.TOPIC_MEMBER, newToken)
            //set token to local store
            await setFCMToken(newToken)
        }
        else {
            //token has changed
            if (newToken != currToken) {
                //call api insert save token for device
                await callPostInsertDeviceToken(currToken, newToken)
                //call api unsubscribe for device token 
                await unsubForDeviceToTopic(apis.TOPIC_MEMBER, currToken)
                //call api subscribe for device token 
                await subForDeviceToTopic(apis.TOPIC_MEMBER, newToken)
                //set token to local store
                await setFCMToken(newToken)
            }
        }
    }

    const callPost = async () => {
        try {
            const res = await axios.post(`${apis.USER_PATH}/login`, {
                usernameOrEmail: userId,
                password: password
            })
            if (res.data.status == 'success') {
                Toast(contents.msg_login_ok)
                await setLoginInfo(userId)
                await setupFCMTokenforNotification()
                navigate('Tabbar')
            }
            else {
                Toast(contents.msg_login_failed)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callPostInsertDeviceToken = async (tkOld, tkNew) => {
        try {
            const res = await axios.post(`${apis.DEVICE_TOKEN}/insert`, {
                "deviceId": DeviceInfo.getUniqueId(),
                "deviceTokenOld": tkOld,
                "deviceTokenNew": tkNew
            })
            return res.data.status
        }
        catch (error) {
            console.log(`callPostInsertDeviceToken ${error}`)
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                    uri: images.backgroundApp,
                }}
                resizeMode='cover'
                style={styles.container}>

                <View style={styles.brandname_pos}>
                    <Text style={styles.brandname_txt}>BASTA</Text>
                </View>

                <View style={{ flex: 60 }}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.text_input}
                            onChangeText={onChangeId}
                            value={userId}
                            placeholder="ID"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.text_input}
                            onChangeText={onChangePass}
                            value={password}
                            placeholder="Password"
                        />
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            userId == '' || password == '' ? Toast(contents.msg_err_input_empty) : callPost()
                        }}>
                        <Text style={styles.button_txt}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    brandname_pos: {
        flex: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    brandname_txt: {
        fontWeight: 'bold',
        fontSize: 60,
        fontFamily: 'OleoScript-Bold',
        color: 'white'
    },
    inputView: {
        backgroundColor: "white",
        borderRadius: 30,
        width: "80%",
        height: 40,
        marginBottom: 20,
        alignItems: "center",
        alignSelf: 'center'
    },
    text_input: {
        height: 40,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    button: {
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 30,
        height: 40,
        width: '40%',
        marginHorizontal: 15,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    button_txt: {
        color: 'white',
    }
})