import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import { images, apis } from '../config/index'

import axios from 'axios'

const LoginScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    const [userId, onChangeId] = useState('')
    const [password, onChangePass] = useState('')

    const GET_URL = apis.BASE_URL + '/listUser'
    const POST_URL = apis.BASE_URL + '/login'

    const callPost = async () => {
        try {
            const res = await axios.post(`${apis.USER_PATH}/login`, {
                usernameOrEmail: userId,
                password: password
            })
            res.data.status == 'success' ? navigate('Tabbar') : showToast('Username,password not exists!')
        } catch (error) {
            console.log(error)
        }
    }

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={images.backgroundApp}
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
                            userId == '' || password == '' ? 
                            showToast("Vui lòng nhập username, password!") :
                            callPost() 
                            //navigate('Tabbar')
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