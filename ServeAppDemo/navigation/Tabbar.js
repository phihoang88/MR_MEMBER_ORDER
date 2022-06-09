import * as React from 'react'
import { View, Text } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    TableScreen,
    OrderScreen,
    ReceiptScreen,
    PersonalScreen,
    BookScreen
} from '../screens'
const Tab = createBottomTabNavigator()
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: 'red',
    tabBarInactiveTintColor: 'black',
})



const Tabbar = (props) => {
    return <Tab.Navigator initialRouteName='TableScreen' screenOptions={screenOptions}>
        <Tab.Screen
            name={"TableScreen"}
            component={TableScreen}
            options={{
                tabBarLabel: 'Table',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="table" color={color} size={20} />
                ),
                //tabBarBadge: 3,
            }}
        />
        <Tab.Screen 
        name={"OrderScreen"} 
        component={OrderScreen} 
        options={{
            tabBarLabel: 'Order',
            tabBarIcon: ({ color, size }) => (
                <Icon name="list" color={color} size={20} />
            ),
            //tabBarBadge: 3,
        }}/>
        <Tab.Screen 
        name={"BookScreen"} 
        component={BookScreen} 
        options={{
            tabBarLabel: 'Book',
            tabBarIcon: ({ color, size }) => (
                <Icon name="file-signature" color={color} size={20} />
            ),
        }}/>
        <Tab.Screen 
        name={"ReceiptScreen"} 
        component={ReceiptScreen}
        options={{
            tabBarLabel: 'Receipt',
            tabBarIcon: ({ color, size }) => (
                <Icon name="file-alt" color={color} size={20} />
            ),
        }} />
        <Tab.Screen 
        name={"PersonalScreen"} 
        component={PersonalScreen} 
        options={{
            tabBarLabel: 'Personal',
            tabBarIcon: ({ color, size }) => (
                <Icon name="user-circle" color={color} size={20} />
            ),
        }}/>
    </Tab.Navigator>
}


export default Tabbar  