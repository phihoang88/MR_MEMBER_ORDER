//system api
const status_ok = 'success'
const status_ng = 'failed'

//table status
const table_serving = 'Serving'
const table_ordering = 'Ordering'
const table_emptying = 'Emptying'
const table_booking = 'Booking'

//dialog
const title_confirm = 'Confirm'
const title_notice = 'Notice'
const title_warning = 'Warning'
const title_error = 'Error'

// LOGIN SCREEN
const msg_err_input_empty = 'Vui lòng nhập username, password!'
const msg_login_ok = 'Login success!'
const msg_login_failed = 'Username,password not exists!'

// TABLE SCREEN
const msg_success_receive = 'Receive successfully!'
const msg_err_receive = 'Receive error!'


// TABLE ORDER SCREEN
const msg_info_order_list_empty = 'Order list is emptying.'

const cont_create_table = 'Create new table?'
const cont_plh_note = 'Please type note here...'

const msg_ask_create_table = 'Please click [Create] button to start order.'
const msg_ask_del_product = 'Delete selected order?'
const msg_ask_confirm_order = 'Send order request?'
const msg_ask_confirm_done = 'Finish?'
const msg_ask_confirm_book = 'Book Table '

const msg_success_create_table = 'Create Successfully!'
const msg_success_send_order = 'Order Successfully!'
const msg_success_done_order = 'Update Successfully!'

const msg_warn_no_more_order = 'No more order in list!'
const msg_warn_goback = 'Exists non-order product! Still go back.'
const msg_warn_empty_order = 'Nothing to order!'

const msg_warn_nonselect_table = 'No table selected!'
const msg_warn_empty_guess_nm = 'Guess name can not be empty!'
const msg_warn_empty_guess_phone = 'Guess phone can not be empty!'
const msg_warn_empty_guess = 'Guess count can not be 0!'
const msg_warn_error_date = 'Booking date is over!'
const msg_warn_error_time = 'Booking time is over!'

const msg_err_create_table = 'Create Unsuccessfully! Please try to create again.'

const msg_err_menu_not_found = 'Menu Not Found!'
const msg_err_send_order = 'Can not send order!'
const msg_err_done_order = 'Can not update order!'

const type_yesno = 'yes/no'
const type_ok = 'ok'


export default {
    type_yesno,
    type_ok,
    status_ok,
    status_ng,
    title_confirm,
    title_notice,
    title_warning,
    title_error,

    //table status
    table_serving,
    table_ordering, 
    table_emptying, 
    table_booking, 

    //login
    msg_login_ok,
    msg_login_failed,
    msg_err_input_empty,

    // login screen
    msg_success_receive,
    msg_err_receive,

    //Table order screen
    msg_info_order_list_empty,


    cont_create_table,
    cont_plh_note,

    msg_ask_confirm_order,
    msg_ask_create_table,
    msg_ask_del_product,
    msg_ask_confirm_done,
    msg_ask_confirm_book,

    msg_success_create_table,
    msg_success_send_order,
    msg_success_done_order,


    msg_warn_no_more_order,
    msg_warn_goback,
    msg_warn_empty_order,
    msg_warn_empty_guess,
    msg_warn_nonselect_table,
    msg_warn_empty_guess_nm,
    msg_warn_empty_guess_phone,
    msg_warn_error_date,
    msg_warn_error_time,
    msg_err_create_table,
    msg_err_menu_not_found,
    msg_err_send_order,
    msg_err_done_order,
}