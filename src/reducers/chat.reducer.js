import {chatConstants} from '../constants'

const initialState = {
  errMessage: undefined,
  partner: undefined,
  listPartner: undefined,
  messages: undefined,
  pendingSend: false,
  pendingGet: false
}

const chat = (state = initialState, action) => {
  switch (action.type) {
    case chatConstants.GET_PARTNER_CHAT_REQUEST:
      return {
        ...state,
        errMessage: undefined,
      }
    case chatConstants.GET_PARTNER_CHAT_SUCCESS: 
      return {
        ...state,
        listPartner: action.data,
      }
    case chatConstants.GET_MESSAGE_REQUEST: 
      return {
        ...state,
        errMessage: undefined,
        pendingGet: true
      }
    case chatConstants.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        partner: action.partner,
        messages: action.data,
        pendingGet: false
      }
    case chatConstants.GET_MESSAGE_FAILURE: 
      return {
        ...state,
        errMessage: action.error,
        pendingGet: false
      }
    case chatConstants.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        errMessage: undefined,
        pendingSend: true
      }
    case chatConstants.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        pendingSend: false,
        messages: action.data,
      }
    case chatConstants.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pendingSend: false
      }
    default:
      return {
        ...state
      }
    }
}

export default chat