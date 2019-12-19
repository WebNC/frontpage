import {contractConstants} from '../constants'

const initialState = {
  successMessage: undefined,
  errMessage: undefined,
  pending: false
}

const contracts = (state = initialState, action) => {
  switch (action.type) {
    case contractConstants.GET_CONTRACT_DETAIL_REQUEST:
      return {
        ...state,
        contractDetail: undefined,
        errMessage: undefined,
        successMessage: undefined
      }
    case contractConstants.GET_CONTRACT_DETAIL_SUCCESS:
      return {
        ...state,
        contractDetail: action.data,
      }
    case contractConstants.GET_CONTRACT_DETAIL_FAILURE:
      return {
        ...state,
        errMessage: action.error,
      }
    case contractConstants.EDIT_CONTRACT_REQUEST:
      return {
        ...state,
        pending: true,
        contractUpdate: undefined,
        errMessage: undefined,
        successMessage: undefined
      }
    case contractConstants.EDIT_CONTRACT_SUCCESS:
      return {
        ...state,
        pending: false,
        contractInfo: action.contract,
        successMessage: action.message,
        errMessage: undefined
      }
    case contractConstants.EDIT_CONTRACT_FAILURE:
      return {
        ...state,
        pending: false,
        successMessage: undefined,
        errMessage: action.error
      }
    case contractConstants.EVALUATE_CONTRACT_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: undefined,
        successMessage: undefined
      }
    case contractConstants.EVALUATE_CONTRACT_SUCCESS:
      return {
        ...state,
        pending: false,
        contractInfo: action.contract,
        successMessage: action.message,
        errMessage: undefined
      }
    case contractConstants.EVALUATE_CONTRACT_FAILURE:
      return {
        ...state,
        pending: false,
        successMessage: undefined,
        errMessage: action.error
      }
    case contractConstants.DELETE_CONTRACT_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: undefined,
        successMessage: undefined
      }
    case contractConstants.DELETE_CONTRACT_SUCCESS:
      return {
        ...state,
        pending: false,
        successMessage: action.message,
        errMessage: undefined
      }
    case contractConstants.DELETE_CONTRACT_FAILURE:
      return {
        ...state,
        pending: false,
        successMessage: undefined,
        errMessage: action.error
    }
    case contractConstants.REPORT_CONTRACT_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: undefined,
        successMessage: undefined
      }
    case contractConstants.REPORT_CONTRACT_SUCCESS:
      return {
        ...state,
        pending: false,
        successMessage: action.message,
        errMessage: undefined
      }
    case contractConstants.REPORT_CONTRACT_FAILURE:
      return {
        ...state,
        pending: false,
        successMessage: undefined,
        errMessage: action.error
    }
    case contractConstants.PAYMENT_CONTRACT_REQUEST:
      return {
        ...state,
        pending: true,
        successMessage: undefined,
        errMessage: undefined,
      }
    case contractConstants.PAYMENT_CONTRACT_SUCCESS:
      return {
        ...state,
        pending: false,
        successMessage: action.message,
        errMessage: undefined
      }
    case contractConstants.PAYMENT_CONTRACT_FAILURE:
      return {
        ...state,
        pending: false,
        successMessage: undefined,
        errMessage: action.error
    }
    case contractConstants.REPLY_CONTRACT_REQUEST: 
      return {
        pending: true,
        successMessage: undefined,
        errMessage: undefined,
        contractDetail: undefined
      }
    case contractConstants.REPLY_CONTRACT_SUCCESS:
      return {
        pending: false,
        successMessage: action.message,
        errMessage: undefined
      }
    case contractConstants.REPLY_CONTRACT_FAILURE:
      return {
        pending: false,
        successMessage: undefined,
        errMessage: action.error
      }
    default:
      return state
    }
}

export default contracts