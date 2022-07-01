/*
yarn add react-navigation
yarn add @react-navigation/native
yarn add @react-navigation/native-stack
yarn add react-native-screens

yarn add react-native-safe-area-context
yarn add @react-navigation/bottom-tabs
*/

import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackRouter } from 'react-navigation'
import {
    LoginScreen,
    TableOrderScreen,
    ReceiptDetailScreen,
    BookScreen
} from '../screens'
import Tabbar from './Tabbar';
import {navigationRef} from './RootNavigation'
import { requestUserPermission, NotificationListener } from '../lib/pushnotification_helper'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'

const Stack = createNativeStackNavigator();

const navigator = (props) => {

    //set up notication
    useEffect(() => {
        requestUserPermission()
        NotificationListener()
        createChannels()
    }, [])

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            
            if(remoteMessage.notification.title.includes("Order")){
                PushNotification.localNotification({
                    channelId: 'order-channel',
                    channelName: 'Order Channel',
                    title: remoteMessage.notification.title,
                    message: remoteMessage.notification.body,
                    data: remoteMessage.data.data ? JSON.parse(remoteMessage.data.data) : null
                })
            }
            if(remoteMessage.notification.title.includes("Checkout")){
                PushNotification.localNotification({
                    channelId: 'checkout-channel',
                    channelName: 'Checkout Channel',
                    title: remoteMessage.notification.title,
                    message: remoteMessage.notification.body,
                    data: remoteMessage.data.data ? JSON.parse(remoteMessage.data.data) : null
                })
            }
            if(remoteMessage.notification.title.includes("Call")){
                PushNotification.localNotification({
                    channelId: 'call-channel',
                    channelName: 'Call Channel',
                    title: remoteMessage.notification.title,
                    message: remoteMessage.notification.body,
                    data: remoteMessage.data.data ? JSON.parse(remoteMessage.data.data) : null
                })
            }
        });
        return unsubscribe;
    }, []);


    const createChannels = () => {
        PushNotification.createChannel({
            channelId: 'order-channel',
            channelName: 'Order Channel'
        })
        PushNotification.createChannel({
            channelId: 'checkout-channel',
            channelName: 'Checkout Channel'
        })
        PushNotification.createChannel({
            channelId: 'call-channel',
            channelName: 'Call Channel'
        })
    }


    return <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
            <Stack.Screen name={"Tabbar"} component={Tabbar} />
            <Stack.Screen name={"TableOrderScreen"} component={TableOrderScreen} />
            <Stack.Screen name={"BookScreen"} component={BookScreen} />
            <Stack.Screen name={"ReceiptDetailScreen"} component={ReceiptDetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default navigator