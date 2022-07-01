/**
 * @format
 */
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import navigator from './navigation/navigator'
import * as RootNavigation from './navigation/RootNavigation.js'
import PushNotification from 'react-native-push-notification'

PushNotification.configure({
    onNotification: function (notification) {
        let {
            note_tx,
            table_id,
            table_info_id,
            table_nm_vn,
            table_stt_nm
        } = notification.data
        if (notification.channelId == "order-channel") {
            RootNavigation.navigate('TableOrderScreen', {
                'table_id': table_id,
                'table_info_id': table_info_id,
                'table_nm': table_nm_vn,
                'table_stt': table_stt_nm,
                'note_tx': note_tx
            })
        }
        if (notification.channelId == "checkout-channel") {
            RootNavigation.navigate('ReceiptScreen')
        }
        if (notification.channelId == "call-channel") {
            RootNavigation.navigate('TableScreen')
        }
    },
    requestPermissions: true
})

AppRegistry.registerComponent(appName, () => navigator);
