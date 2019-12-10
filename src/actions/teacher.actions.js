import API from './axios.config'


export const getAllUserTeacher = page => {
    return API
        .get(`/teachers/list/${page}`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}

// getNumberUserTeacher getDetailTeacher

export const getNumberUserTeacher = () => {
    return API
        .get(`/teachers/number`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}


export const getDetailTeacher = (id) => {
    return API
        .get(`/teachers/detail/${id}`)
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}