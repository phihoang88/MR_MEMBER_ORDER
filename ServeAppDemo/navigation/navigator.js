/*
yarn add react-navigation
yarn add @react-navigation/native
yarn add @react-navigation/native-stack
yarn add react-native-screens

yarn add react-native-safe-area-context
yarn add @react-navigation/bottom-tabs
*/

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackRouter } from 'react-navigation'
import {
    LoginScreen,
    HomeScreen,
    TableOrderScreen,
} from '../screens'
import Tabbar from './Tabbar';

const Stack = createNativeStackNavigator();

const navigator = (props) => {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown:false}}>
            <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
            <Stack.Screen name={"Tabbar"} component={Tabbar}/>
            <Stack.Screen name={"TableOrderScreen"} component={TableOrderScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
}

export default navigator