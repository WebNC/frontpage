import { userConstants } from '../constants';

const initialState = {
  pending: false,
  loggedIn: false,
  username: null,
  message: undefined,
  errMessage: undefined,
  successMessage: undefined,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { 
        pending: true 
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        loggedIn: true,
        pending: false,
      };
    case userConstants.REGISTER_FAILURE:
      return {
        message: action.error,
        pending: false,
      };
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        message: undefined,
        pending: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        message:undefined,
        pending: false,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        message: action.error,
        pending: false,
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        username: null,
        message: undefined,
        errMessage: undefined,
        successMessage: undefined,
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        successMessage: action.message,
        user: action.user,
        errMessage: undefined,
        pending: false,
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
    default:
      return state
  }
}
export default user;