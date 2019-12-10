import {skillConstants} from '../constants'

const initialState = {
  allSkill: [],
}

const skills = (state = initialState, action) => {
  switch (action.type) {
    case skillConstants.GETALL_SUCCESS:
      return { 
        ...state,
        allSkill: action.data, 
      };
    case skillConstants.GETALL_FAILURE: 
      return {
        ...state,
      }
      default:
        return state
    }
}

export default skills