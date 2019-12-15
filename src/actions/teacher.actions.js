import API from './axios.config'
import {teacherConstants} from '../constants/index'

export const getAllUserTeacher = page => {
    return API
        .get(`teachers/list/${page}`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}

// getNumberUserTeacher getDetailTeacher

export const getNumberUserTeacher = () => {
    return API
        .get(`teachers/number`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}


export const getDetailTeacher = (id) => {
    return API
        .get(`teachers/detail/${id}`)
        .then(res => {
            return res
        }).catch(error => console.log(error));
}

export const filterTeacher = ( local, type, skill) => {
    return API
        .post(`teachers/filter`,{local, type, skill})
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}

export const filterAdress = (address) =>{
    return dispatch => {
        dispatch({type: teacherConstants.FILTER_ADRESS_REQUEST,
            address
        })
    }
}

export const filterCost = (cost) =>{
    return dispatch => {
        dispatch({type: teacherConstants.FILTER_COST_REQUEST,
        cost
        })
    }
}

export const filterSkill = (skill) =>{
    return dispatch => {
        dispatch({type: teacherConstants.FILTER_SKILL_REQUEST,
        skill
        })
    }
}


export const handleContact = (teacherInfo) =>{
    return dispatch => {
        dispatch({type: teacherConstants.HANDLE_CONTACT,
            teacherInfo
        })
    }
}