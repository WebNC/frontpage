import {contractConstants} from '../constants'

const initialState = {
  listContract: [],
  teacherInfo: undefined,
  studentInfo: undefined,
  contractInfo: undefined,
  successMessage: undefined,
  errMessage: undefined,
}

const contracts = (state = initialState, action) => {
  switch (action.type) {
    case contractConstants.GET_CONTRACT_DETAIL_SUCCESS:
      return {
        ...state,
        contractInfo: action.data,
      }
    case contractConstants.GET_CONTRACT_DETAIL_FAILURE:
      return {
        ...state,
        errMessage: action.errMessage,
      }
      default:
        return state
    }
}

export default contracts