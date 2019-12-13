import { teacherConstants } from '../constants';

const initialState = {
  address : null,
  cost: null,
  skill: null,
  teacherInfo: {}
}

const teachers = (state = initialState, action) => {
  switch (action.type) {
    case teacherConstants.FILTER_ADRESS_REQUEST:
      return { 
        ...state,
        address: action.address 
      }
    case teacherConstants.FILTER_COST_REQUEST:

      return { 
        ...state,
        cost: action.cost 
      }
    case teacherConstants.FILTER_SKILL_REQUEST:
      return { 
        ...state,
        skill: action.skill 
      }
      case teacherConstants.HANDLE_CONTACT:
      console.log(action.teacherInfo)
      return { 
        ...state,
        teacherInfo: action.teacherInfo 
      }
    default:
      return state
  }
}
export default teachers;