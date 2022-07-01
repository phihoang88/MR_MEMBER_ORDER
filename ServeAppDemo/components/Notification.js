import React from "react"
import axios from "axios"
import { apis } from "../config"

const callSendNotificationToDevice = async (token) => {
    try {
        const res = await axios.post(apis.NOTIFICATION_SEND_TO_DEVICE, {
            "target": token,
            "title": "Notification",
            "body": "Thank you for your order."
        })
    } catch (error) {
        console.log(`callSendNotificationToDevice ${error}`)
    }
}


export default{
    callSendNotificationToDevice
}