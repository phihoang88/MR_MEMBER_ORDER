import messaging from '@react-native-firebase/messaging';
import AsynStorage from '@react-native-async-storage/async-storage'
import * as RootNavigation from '../navigation/RootNavigation.js'
import axios from 'axios';
import apis from '../config/apis.js';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        //console.log('Authorization status:', authStatus);
    }
}

export async function getNewFCMToken() {
    try {
        return await messaging().getToken()
    }
    catch (error) {
        console.log(`getNewFCMToken ${error}`)
    }
}

export async function getCurrentFCMToken(token) {
    try {
        return await AsynStorage.getItem("fcmToken")
    }
    catch (error) {
        console.log(`getCurrentFCMToken ${error}`)
    }
}

export async function setFCMToken(token) {
    try {
        await AsynStorage.setItem("fcmToken", token)
    }
    catch (error) {
        console.log(`setFCMToken ${error}`)
    }
}

export async function clearFCMToken() {
    try {
        await AsynStorage.removeItem("fcmToken")
    }
    catch (error) {
        console.log(`clearFCMToken ${error}`)
    }
}

export async function setLoginInfo(userId) {
    try {
        let loginTm = new Date().getHours().toString()
        await AsynStorage.setItem("loginTime", loginTm)
        await AsynStorage.setItem("userId", userId)
    }
    catch (error) {
        console.log(`setLoginInfo ${error}`)
    }
}

export async function getLoginInfo() {
    try {
        let loginTm = await AsynStorage.getItem("loginTime")
        let userId = await AsynStorage.getItem("userId")
        return {
            loginTm: loginTm,
            userId: userId
        }
    }
    catch (error) {
        console.log(`getLoginInfo ${error}`)
    }
}

export async function clearLoginInfo() {
    try {
        await AsynStorage.removeItem("loginTime")
        await AsynStorage.removeItem("userId")
    }
    catch (error) {
        console.log(`clearLoginInfo ${error}`)
    }
}

export async function subForDeviceToTopic(topicNm, device) {
    try {
        const res = await axios.post(apis.NOTIFICATION_SUB, {
            "topicName": topicNm,
            "tokens": [device]
        })
    }
    catch (error) {
        console.log(`subForDeviceToTopic ${error}`)
    }
}

export async function unsubForDeviceToTopic(topicNm, device) {
    try {
        const res = await axios.post(apis.NOTIFICATION_UNSUB, {
            "topicName": topicNm,
            "tokens": [device]
        })
    }
    catch (error) {
        console.log(`unsubForDeviceToTopic ${error}`)
    }
}

export const NotificationListener = (props) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        //open app when minimize
    })

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            //open app when quit
            if (remoteMessage) {
            }
            else {
            }
        })

    messaging().onMessage(async remoteMessage => {
        //when message come...
    })
}