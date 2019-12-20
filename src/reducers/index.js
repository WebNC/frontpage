import { combineReducers } from 'redux'
import user from './user.reducer'
import skill from './skill.reducer'
import teachers from './teacher.reducer'
import contracts from './contracts.reducer'
import chat from './chat.reducer'
// import user from './user.reducer'

export default combineReducers({
    user,
    skill,
    teachers,
    contracts,
    chat,
})