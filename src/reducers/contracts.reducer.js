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
        successPayMessage: undefined,
        errPayMessage: undefined,
        contractUpdate: undefined
      }
    case contractConstants.PAYMENT_CONTRACT_SUCCESS:
      return {
        ...state,
        pending: false,
        successPayMessage: action.message,
        contractUpdate: action.contract,
        errPayMessage: undefined
      }
    case contractConstants.PAYMENT_CONTRACT_FAILURE:
      return {
        ...state,
        pending: false,
        successPayMessage: undefined,
        errPayMessage: action.error
    }
    case 'RESET_CONTRACT_UPDATE': 
      return {
        ...state,
        contractUpdate: undefined
    }
    default:
      return state
    }
}

export default contracts