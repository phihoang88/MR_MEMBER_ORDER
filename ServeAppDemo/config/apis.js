
const REAL_URL = 'https://mresapi.herokuapp.com/api'
const BASE_URL = 'http://192.168.1.4:5000/api'
const TOPIC_MEMBER = 'member'

// const USER_PATH = `${BASE_URL}/User`
// const MENU_PATH = `${BASE_URL}/Menu`
// const PRODUCT_PATH = `${BASE_URL}/Product`
// const TABLE_PATH = `${BASE_URL}/Table`
// const RECEIPT_PATH = `${BASE_URL}/Receipt`
// const TABLE_INFO_PATH = `${BASE_URL}/TableInfo`
// const TABLE_ORDER_PATH = `${BASE_URL}/TableOrder`

// const NOTIFICATION_SUB = `${BASE_URL}/notification/subscribe`
// const NOTIFICATION_UNSUB = `${BASE_URL}/notification/unsubscribe`
// const NOTIFICATION_SEND_TO_TOPIC = `${BASE_URL}/notification/sendtotopic`
// const NOTIFICATION_SEND_TO_DEVICE = `${BASE_URL}/notificationguess/sendtodevice`  

// const DEVICE_TOKEN = `${BASE_URL}/DeviceToken`


const USER_PATH = `${REAL_URL}/User`
const MENU_PATH = `${REAL_URL}/Menu`
const PRODUCT_PATH = `${REAL_URL}/Product`
const TABLE_PATH = `${REAL_URL}/Table`
const RECEIPT_PATH = `${REAL_URL}/Receipt`
const TABLE_INFO_PATH = `${REAL_URL}/TableInfo`
const TABLE_ORDER_PATH = `${REAL_URL}/TableOrder`

const NOTIFICATION_SUB = `${REAL_URL}/notification/subscribe`
const NOTIFICATION_UNSUB = `${REAL_URL}/notification/unsubscribe`
const NOTIFICATION_SEND_TO_TOPIC = `${REAL_URL}/notification/sendtotopic`
const NOTIFICATION_SEND_TO_DEVICE = `${REAL_URL}/notificationguess/sendtodevice`  

const DEVICE_TOKEN = `${REAL_URL}/DeviceToken`

export default{
     BASE_URL,
     USER_PATH,
     MENU_PATH,
     PRODUCT_PATH,
     TABLE_PATH,
     RECEIPT_PATH,
     TABLE_INFO_PATH,
     TABLE_ORDER_PATH,
     NOTIFICATION_SUB,
     NOTIFICATION_UNSUB,
     NOTIFICATION_SEND_TO_TOPIC,
     NOTIFICATION_SEND_TO_DEVICE,
     DEVICE_TOKEN,
     TOPIC_MEMBER
}