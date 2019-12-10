import { combineReducers } from 'redux'
import user from './user.reducer'
import skill from './skill.reducer'
// import user from './user.reducer'

export default combineReducers({
    user,
    skill
})