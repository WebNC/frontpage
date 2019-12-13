export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    REGISTER_TEACHER_REQUEST: 'USERS_REGISTER_TEACHER_REQUEST',
    REGISTER_TEACHER_SUCCESS: 'USERS_REGISTER_TEACHER_SUCCESS',
    REGISTER_TEACHER_FAILURE: 'USERS_REGISTER_TEACHER_FAILURE',

    CONFIRM_EMAIL_REQUEST: 'USERS_CONFIRM_EMAIL_REQUEST',
    CONFIRM_EMAIL_SUCCESS: 'USERS_CONFIRM_EMAIL_SUCCESS',
    CONFIRM_EMAIL_FAILURE: 'USERS_CONFIRM_EMAIL_FAILURE',

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

    GETDETAIL_REQUEST:  ' GETDETAIL_REQUEST',
    GETDETAIL_SUCCESS:  ' GETDETAIL_SUCCESS',
    GETDETAIL_FAILURE:  ' GETDETAIL_FAILURE',
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

export const API_URL = 'https://frontpage-api-1612384.herokuapp.com/'
