import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,

} from 'react-native'
import { images,apis } from '../config'
import {
    clearFCMToken,
    clearLoginInfo,
    getCurrentFCMToken,
    unsubForDeviceToTopic,
} from '../lib/pushnotification_helper'


const PersonalScreen = (props) => {

    const { navigation, route } = props
    const { navigate, goBack } = navigation

    const unsubDeviceToTopic = async () => {
        try {
            let currToken = await getCurrentFCMToken()
            //call api unsubscribe for device token 
            await unsubForDeviceToTopic(apis.TOPIC_MEMBER, currToken)

            await clearFCMToken()
        }
        catch (error) {
            console.log(error)
        }
    }

    return <View style={{ flex: 1 }}>
        <ImageBackground
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            source={{
                uri: images.backgroundApp
            }}
        >
            <View style={{
                flex: 92
            }}>
            </View>
            <TouchableOpacity
                onPress={async () => {
                    await clearLoginInfo()
                    unsubDeviceToTopic()
                    navigate('LoginScreen')
                }}
                style={{
                    flex: 8,
                    width: '90%',
                    backgroundColor: 'orangered',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    margin: 10
                }}>
                <Text style={{
                    fontSize: 25,
                    color: 'white',
                }}>LOGOUT</Text>
            </TouchableOpacity>
        </ImageBackground>
    </View>
}


export default PersonalScreen  