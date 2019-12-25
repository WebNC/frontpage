export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    REGISTER_TEACHER_REQUEST: 'USERS_REGISTER_TEACHER_REQUEST',
    REGISTER_TEACHER_SUCCESS: 'USERS_REGISTER_TEACHER_SUCCESS',
    REGISTER_TEACHER_FAILURE: 'USERS_REGISTER_TEACHER_FAILURE',

    ACTIVE_EMAIL_REQUEST: 'USERS_ACTIVE_EMAIL_REQUEST',
    ACTIVE_EMAIL_SUCCESS: 'USERS_ACTIVE_EMAIL_SUCCESS',
    ACTIVE_EMAIL_FAILURE: 'USERS_ACTIVE_EMAIL_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    
    LOGOUT: 'USERS_LOGOUT',

    UPDATE_REQUEST: 'USERS_UPDATE_REQUEST',
    UPDATE_SUCCESS: 'USERS_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'USERS_UPDATE_FAILURE',

    CHANGEPASS_REQUEST: 'USERS_CHANGEPASS_REQUEST',
    CHANGEPASS_SUCCESS: 'USERS_CHANGEPASS_SUCCESS',
    CHANGEPASS_FAILURE: 'USERS_CHANGEPASS_FAILURE',

    GETDETAIL_REQUEST:  'USERS_GETDETAIL_REQUEST',
    GETDETAIL_SUCCESS:  'USERS_GETDETAIL_SUCCESS',
    GETDETAIL_FAILURE:  'USERS_GETDETAIL_FAILURE',

    REQUIRE_RESET_PASS_REQUEST:  'USERS_REQUIRE_RESET_PASS_REQUEST',
    REQUIRE_RESET_PASS_SUCCESS:  'USERS_REQUIRE_RESET_PASS_SUCCESS',
    REQUIRE_RESET_PASS_FAILURE:  'USERS_REQUIRE_RESET_PASS_FAILURE',

    VERIFIED_ACCOUNT_FORGET_REQUEST: 'VERIFIED_ACCOUNT_FORGET_REQUEST',
    VERIFIED_ACCOUNT_FORGET_SUCCESS: 'VERIFIED_ACCOUNT_FORGET_SUCCESS',
    VERIFIED_ACCOUNT_FORGET_FAILURE: 'VERIFIED_ACCOUNT_FORGET_FAILURE',

    RESET_PASS_REQUEST:  'USERS_RESET_PASS_REQUEST',
    RESET_PASS_SUCCESS:  'USERS_RESET_PASS_SUCCESS',
    RESET_PASS_FAILURE:  'USERS_RESET_PASS_FAILURE',

    REQUEST_CONTRACT_REQUEST: 'USERS_REQUEST_CONTRACT_REQUEST',
    REQUEST_CONTRACT_SUCCESS: 'USERS_REQUEST_CONTRACT_SUCCESS',
    REQUEST_CONTRACT_FAILURE: 'USERS_REQUEST_CONTRACT_FAILURE',
};

export const skillConstants = {
    GETALL_REQUEST: 'SKILL_GETALL_REQUEST',
    GETALL_SUCCESS: 'SKILL_GETALL_SUCCESS',
    GETALL_FAILURE: 'SKILL_GETALL_FAILURE',
};

export const teacherConstants = {
    FILTER_ADRESS_REQUEST : 'FILTER_ADRESS_REQUEST',
    FILTER_COST_REQUEST : 'FILTER_COST_REQUEST',
    FILTER_SKILL_REQUEST : 'FILTER_SKILL_REQUEST',
    HANDLE_CONTACT:'HANDLE_CONTACT'
}

export const contractConstants = {
    GET_CONTRACT_DETAIL_REQUEST: 'GET_CONTRACT_DETAIL_REQUEST',
    GET_CONTRACT_DETAIL_SUCCESS: 'GET_CONTRACT_DETAIL_SUCCESS',
    GET_CONTRACT_DETAIL_FAILURE: 'GET_CONTRACT_DETAIL_FAILURE',

    EDIT_CONTRACT_REQUEST: 'EDIT_CONTRACT_REQUEST',
    EDIT_CONTRACT_SUCCESS: 'EDIT_CONTRACT_SUCCESS',
    EDIT_CONTRACT_FAILURE: 'EDIT_CONTRACT_FAILURE',

    DELETE_CONTRACT_REQUEST: 'DELETE_CONTRACT_REQUEST',
    DELETE_CONTRACT_SUCCESS: 'DELETE_CONTRACT_SUCCESS',
    DELETE_CONTRACT_FAILURE: 'DELETE_CONTRACT_FAILURE',

    EVALUATE_CONTRACT_REQUEST: 'EVALUATE_CONTRACT_REQUEST',
    EVALUATE_CONTRACT_SUCCESS: 'EVALUATE_CONTRACT_SUCCESS',
    EVALUATE_CONTRACT_FAILURE: 'EVALUATE_CONTRACT_FAILURE',

    REPORT_CONTRACT_REQUEST: 'REPORT_CONTRACT_REQUEST',
    REPORT_CONTRACT_SUCCESS: 'REPORT_CONTRACT_SUCCESS',
    REPORT_CONTRACT_FAILURE: 'REPORT_CONTRACT_FAILURE',

    PAYMENT_CONTRACT_REQUEST: 'PAYMENT_CONTRACT_REQUEST',
    PAYMENT_CONTRACT_SUCCESS: 'PAYMENT_CONTRACT_SUCCESS',
    PAYMENT_CONTRACT_FAILURE: 'PAYMENT_CONTRACT_FAILURE',

    REPLY_CONTRACT_REQUEST: 'REPLY_CONTRACT_REQUEST',
    REPLY_CONTRACT_SUCCESS: 'REPLY_CONTRACT_SUCCESS',
    REPLY_CONTRACT_FAILURE: 'REPLY_CONTRACT_FAILURE',

    COMPLETE_CONTRACT_REQUEST: 'COMPLETE_CONTRACT_REQUEST',
    COMPLETE_CONTRACT_SUCCESS: 'COMPLETE_CONTRACT_SUCCESS',
    COMPLETE_CONTRACT_FAILURE: 'COMPLETE_CONTRACT_FAILURE',
};

export const chatConstants = {
    GET_PARTNER_CHAT_REQUEST: 'GET_PARTNER_CHAT_REQUEST',
    GET_PARTNER_CHAT_SUCCESS: 'GET_PARTNER_CHAT_SUCCESS',
    GET_PARTNER_CHAT_FAILURE: 'GET_PARTNER_CHAT_FAILURE',

    SEND_MESSAGE_REQUEST: 'SEND_MESSAGE_REQUEST',
    SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_FAILURE: 'SEND_MESSAGE_FAILURE',

    GET_MESSAGE_REQUEST: 'GET_MESSAGE_REQUEST',
    GET_MESSAGE_SUCCESS: 'GET_MESSAGE_SUCCESS',
    GET_MESSAGE_FAILURE: 'GET_MESSAGE_FAILURE',

    CREATE_ROOM_REQUEST: 'CREATE_ROOM_REQUEST',
    CREATE_ROOM_SUCCESS: 'CREATE_ROOM_SUCCESS',
    CREATE_ROOM_FAILURE: 'CREATE_ROOM_FAILURE',
}

export const API_URL = 'https://frontpage-api-1612384.herokuapp.com/'