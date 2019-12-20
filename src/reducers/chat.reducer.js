import {chatConstants} from '../constants'

const initialState = {
  errMessage: undefined,
  partner: undefined,
  listPartner: undefined,
  messages: undefined,
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
      }
    case chatConstants.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        partner: action.partner,
        messages: action.data
      }
    case chatConstants.GET_MESSAGE_FAILURE: 
      return {
        ...state,
        errMessage: action.error
      }
    case chatConstants.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        errMessage: undefined,
      }
    case chatConstants.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        errMessage: action.error
      }
    default:
      return {
        ...state
      }
    }
}

export default chat