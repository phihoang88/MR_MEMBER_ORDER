import React from 'react'
import {ToastAndroid} from 'react-native'

const Toast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
}

export default Toast

