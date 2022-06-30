// return yyyyMMddHHmm
const systemDateTimeString = () => {
    let date = new Date()
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getFullYear()}${month}${day}${hours}${minutes}`
}

// return yyyyMMdd
const systemDateString = (dateSelect) => {
    let date = dateSelect ? dateSelect : new Date() 
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${date.getFullYear()}${month}${day}`
}
// return HHmmss
const systemTimeString = (dateSelect) => {
    let date = dateSelect ? dateSelect : new Date() 
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    return `${hours}${minutes}${second}`
}
// return yyyy/MM/dd
const getDateFormat = (dateSelect) => {
    let month = dateSelect.getMonth() + 1 < 10 ? `0${dateSelect.getMonth() + 1}` : dateSelect.getMonth() + 1
    let day = dateSelect.getDate() < 10 ? `0${dateSelect.getDate()}` : dateSelect.getDate()
    return `${dateSelect.getFullYear()}-${month}-${day}`
}
// return HH:mm
const getTimeFormat = (dateSelect) => {

    let hours = dateSelect.getHours() < 10 ? `0${dateSelect.getHours()}` : dateSelect.getHours()
    let minutes = dateSelect.getMinutes() < 10 ? `0${dateSelect.getMinutes()}` : dateSelect.getMinutes()
    return `${hours}:${minutes}`
}

// return yyyyMMdd -> date
const getDateFormatFromString = (dateString) => {
    let dateFormat = dateString.substring(0,4) + "-" + dateString.substring(4,6) + "-" + dateString.substring(6,8)
    let dateSelect = new Date(dateFormat)
    return dateSelect
}

// return yyyyMMddHHmmss -> date
const getTimeFormatFromString = (datetimeString) => {
    let strYear = datetimeString.substring(0,4)
    let strMonth = datetimeString.substring(4,6)
    let strDay = datetimeString.substring(6,8)
    let strHours = datetimeString.substring(8,10)
    let strMin = datetimeString.substring(10,12)
    let dateSelect = new Date(strYear,strMonth,strDay,strHours,strMin)
    return dateSelect
}

//return HHmm => HH:mm:ss
const getTimeFormatByString = (timeString) => {
    let hours = timeString.substring(0,2) + ":" + timeString.substring(2,4) + ":" + timeString.substring(4,6)
    return hours
}

const getDateTimeFormat = (date,time) => {
    
    return
}

const LOGIN_SCREEN = "MRE-FE-0011"
const TABLE_SCREEN = "MRE-FE-0021"
const TABLE_ORDER_SCREEN = "MRE-FE-0022"
const RECEIPT_SCREEN = "MRE-FE-0023"
const RECEIPT_DETAIL_SCREEN = "MRE-FE-0024"
const BOOK_LIST_SCREEN = "MRE-FE-0030"
const BOOK_SCREEN = "MRE-FE-0031"
const PERSONAL_SCREEN = "MRE-FE-0040"


export default{
    systemDateTimeString,
    systemDateString,
    systemTimeString,
    getDateFormat,
    getTimeFormat,
    getTimeFormatByString,
    getDateFormatFromString,
    getTimeFormatFromString,
    LOGIN_SCREEN,
    TABLE_SCREEN,
    TABLE_ORDER_SCREEN,
    RECEIPT_SCREEN,
    RECEIPT_DETAIL_SCREEN,
    BOOK_SCREEN,
    BOOK_LIST_SCREEN,
    PERSONAL_SCREEN
}