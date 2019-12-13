import { userConstants } from '../constants';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

const initialState = {
  loggedIn: false,
  errMessage: undefined,
  successMessage: undefined,
  isTeacher: false,
  pending: false,
  user: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { 
        ...state,
        pending: true,
        errMessage: undefined,
        successMessage: undefined, 
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        pending: false,
        successMessage: undefined,
        errMessage: undefined,
        user: action.newUser,
        isTeacher: action.isTeacher,
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pending: false,
      };
    case userConstants.REGISTER_TEACHER_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: undefined,
        successMessage: undefined,
      };
    case userConstants.REGISTER_TEACHER_SUCCESS:
      return {
        ...state,
        pending: false,
        isTeacher: action.isTeacher,
        successMessage: undefined,
        errMessage: undefined,
      };
    case userConstants.REGISTER_TEACHER_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
      }
    case userConstants.ACTIVE_EMAIL_REQUEST:
      return {
        ...state,
        loggedIn: true,
        successMessage: undefined,
        errMessage: undefined,
      };
    case userConstants.ACTIVE_EMAIL_SUCCESS:
      return {
        ...state,
        successMessage: action.message,
        errMessage: undefined,
      };
    case userConstants.ACTIVE_EMAIL_FAILURE:
      return {
        ...state,
        successMessage: undefined,
        errMessage: action.err,
      }
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: undefined,
        successMessage: undefined,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        successMessage: undefined,
        errMessage: undefined,
        pending: false,
        user: action.user,
        isTeacher: action.isTeacher,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pending: false,
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        errMessage: undefined,
        successMessage: undefined,
        isTeacher: false,
        pending: false,
        user: null,
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: undefined,
        successMessage: undefined,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        successMessage: action.message,
        errMessage: undefined,
        pending: false,
        user: action.user
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        successMessage: undefined,
        pending: false,
      };
    case userConstants.CHANGEPASS_REQUEST:
        return {
          ...state,
          pending: true,
        };
    case userConstants.CHANGEPASS_SUCCESS:
      return {
        ...state,
        successMessage: action.message,
        errMessage: undefined,
        pending: false,
      };
    case userConstants.CHANGEPASS_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        successMessage: undefined,
        pending: false,
      };
    case userConstants.GETDETAIL_REQUEST: 
      return {
        ...state
      };
    case userConstants.GETDETAIL_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case userConstants.GETDETAIL_FAILURE:
      return {
        ...state,
        errMessage: action.error,
      };
    default:
      return state
  }
}
export default user;