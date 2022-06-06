
const systemDateTimeString = () => {
    let date = new Date()
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getFullYear()}${month}${day}${hours}${minutes}`
}


const systemDateString = () => {
    let date = new Date()
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${date.getFullYear()}${month}${day}`
}

const systemTimeString = () => {
    let date = new Date()
    let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${hours}${minutes}`
}

const getDateFormat = (dateSelect) => {
    let month = dateSelect.getMonth() + 1 < 10 ? `0${dateSelect.getMonth() + 1}` : dateSelect.getMonth() + 1
    let day = dateSelect.getDate() < 10 ? `0${dateSelect.getDate()}` : dateSelect.getDate()
    return `${dateSelect.getFullYear()}/${month}/${day}`
}

const getTimeFormat = (dateSelect) => {
    let hours = dateSelect.getHours() < 10 ? `0${dateSelect.getHours()}` : dateSelect.getHours()
    let minutes = dateSelect.getMinutes() < 10 ? `0${dateSelect.getMinutes()}` : dateSelect.getMinutes()
    return `${hours}:${minutes}`
}
const getTimeFormatByString = (timeString) => {
    let hours = timeString.substring(0,2) + ":" + timeString.substring(2,timeString.length)
    return hours
}

const getDateTimeFormat = (date,time) => {
    
    return
}

export default{
    systemDateTimeString,
    systemDateString,
    systemTimeString,
    getDateFormat,
    getTimeFormat,
    getTimeFormatByString
}