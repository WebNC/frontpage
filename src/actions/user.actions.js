import axios from 'axios';
import { userConstants } from '../constants/index';
import {API_URL} from '../constants/index';
import {history} from '../helper';

const login = ({email, password}) => {
    return dispatch => {
        dispatch(request());

        setTimeout(() => {
            axios
                .post(`${API_URL}users/login`, {
                    email,
                    password,
                })
                .then(result => {
                    localStorage.setItem('token', result.data.user.token);
                    const isTeacher = ( result.data.user.type ===  "Người dạy" );
                    dispatch(success(result.data.user, isTeacher));
                    if (isTeacher) {
                        history.push('/teacher-home'); 
                    }
                    else {
                        history.push('/home');
                    }
                })
                .catch(error => {
                    return dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.LOGIN_REQUEST} }
    function success(user, isTeacher) { return { type: userConstants.LOGIN_SUCCESS, user, isTeacher} }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const loginWithFB = (accessToken) => {
    const authOptions = {
        method: 'POST',
        url: `${API_URL}users/login/facebook`,
        headers: {
            'Access_token': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        json: true
    };
    return dispatch => {
        setTimeout(() => {
            axios(authOptions)
            .then( result => {
                const isTeacher = ( result.data.user.type ===  "Người dạy" )
                dispatch(success(result.data.user, isTeacher));
                if (isTeacher) {
                    history.push('/teacher-home');
                }
                else {
                    history.push('/home');
                }
                })
            .catch(error => {
                return dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
            })
        }, 1000)

    };

    function success(user, isTeacher) { return { type: userConstants.LOGIN_SUCCESS, user, isTeacher } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const loginWithGG = (accessToken) => {
    const authOptions = {
        method: 'POST',
        url: `${API_URL}users/login/google`,
        headers: {
            'Access_token': accessToken,
            'Content-Type': 'application/json'
        },
        json: true
      };
    return dispatch => {
        setTimeout(() => {
            axios(authOptions)
            .then( result => { 
                const isTeacher = ( result.data.user.type ===  "Người dạy" )
                    dispatch(success(result.data.user, isTeacher));
                    if (isTeacher) {
                        history.push('/teacher-home');
                    }
                    else {
                        history.push('/home');
                    }
                })
            .catch(error => {
                return dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
            })
        }, 1000)

    };

    function success(user, isTeacher) { return { type: userConstants.LOGIN_SUCCESS, user, isTeacher } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const logout = () => {
    return dispatch => {
        dispatch({ type: userConstants.LOGOUT });
        localStorage.removeItem('token');
    }
}

const register = ({email,password,username, type}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}users/register`, {
                    email,
                    password,
                    username,
                    type
                })
                .then( result => {
                    localStorage.setItem('token', result.data.user.token);
                    const isTeacher = (type ===  "Người dạy" )
                    dispatch(success(result.data.user, isTeacher));
                    if (isTeacher) {
                        return history.push('/teacher-register');
                    }
                    else {
                        localStorage.setItem('token', result.data.user.token);
                        return history.push(`/comfirm-email`);
                    }
                })
                .catch(error => {
                    return dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)

    };

    function request() { return { type: userConstants.REGISTER_REQUEST} }
    function success(newUser, isTeacher) { return { type: userConstants.REGISTER_SUCCESS, newUser, isTeacher } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

const registerTeacher = ({id, address, phone, birthday, intro, major, skill, sex, price}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}users/register-teacher`, {
                    id,
                    address,
                    phone,
                    birthday,
                    intro,
                    major,
                    skill,
                    sex,
                    price
                })
                .then( result => {
                        dispatch(success(true));
                        return history.push(`comfirm-email`);
                    }
                )
                .catch(error => {
                    return dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)

    };

    function request() { return { type: userConstants.REGISTER_TEACHER_REQUEST} }
    function success(isTeacher) { return { type: userConstants.REGISTER_TEACHER_SUCCESS, isTeacher} }
    function failure(error) { return { type: userConstants.REGISTER_TEACHER_FAILURE, error } }
}

const activeEmail = (token) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .get(`${API_URL}users/verified-account/${token}`)
                .then( result => {
                        dispatch(success(result.data.message));
                    }
                )
                .catch(error => {
                    return dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };
    
    function request() { return { type: userConstants.ACTIVE_EMAIL_REQUEST} }
    function success(message) { return { type: userConstants.ACTIVE_EMAIL_SUCCESS, message} }
    function failure(error) { return { type: userConstants.ACTIVE_EMAIL_FAILURE, error } }
}

const getDetail = () => {
    return dispatch => {
        dispatch(request());

        setTimeout(() => {
            axios
                .get(`${API_URL}users/me`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem("token")}})
                .then(result => {
                    dispatch(success(result.data));
                })
                .catch(error => {
                    return dispatch(failure( 'Đã có lỗi xảy ra, vui lòng thử lại!'));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.GETDETAIL_REQUEST} }
    function success(user) { return { type: userConstants.GETDETAIL_SUCCESS, user} }
    function failure(error) { return { type: userConstants.GETDETAIL_FAILURE, error } }
}

const updateTeacherInfo = ({id, username, address, phone, birthday, sex, price }) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}teachers/edit/info`, {
                    id, username, address, phone, birthday, sex, price
                })
                .then( result => { 
                        return dispatch(success("Cập nhật thông tin thành công!", result.data));
                    }
                )
                .catch(error => {
                    return dispatch(failure("Đã có lỗi xảy ra, vui lòng thử lại!"));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message, user) { return { type: userConstants.UPDATE_SUCCESS, message, user} }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

const updateTeacherIntro = ({id, intro}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}teachers/edit/intro`, {
                    id, intro
                })
                .then( result => { 
                        return dispatch(success("Cập nhật thông tin thành công!", result.data));
                    }
                )
                .catch(error => {
                    return dispatch(failure("Đã có lỗi xảy ra, vui lòng thử lại!"));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message, user) { return { type: userConstants.UPDATE_SUCCESS, message, user} }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

const updateTeacherMajorSkill = ({id, major, skill }) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}teachers/edit/major-skill`, {
                    id, major, skill
                })
                .then( result => { 
                        return dispatch(success("Cập nhật thông tin thành công!", result.data));
                    }
                )
                .catch(error => {
                    return dispatch(failure("Đã có lỗi xảy ra, vui lòng thử lại!"));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message, user) { return { type: userConstants.UPDATE_SUCCESS, message, user} }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

const updateAvatar = ({id, file}) => {
    return dispatch => {
        dispatch(request());
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('id', id);
        console.log(formData);
        const config = {
            'headers': { 
            'content-type': 'multipart/form-data'
            }
        }
        setTimeout(() => {
            axios
                .post(`${API_URL}upload/avatar`,
                    formData, config)
                .then( result => { 
                        return dispatch(success("Cập nhật thông tin thành công!", result.data));
                    }
                )
                .catch(error => {
                    return dispatch(failure("Đã có lỗi xảy ra, vui lòng thử lại!"));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message, user) { return { type: userConstants.UPDATE_SUCCESS, message, user} }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

const requireResetPassword = ({email}) => {
    return dispatch => {
        dispatch(request());

        setTimeout(() => {
            axios
                .post(`${API_URL}upload/avatar`,
                    email)
                .then( result => { 
                        return dispatch(success("Cập nhật thông tin thành công!", result.data));
                    }
                )
                .catch(error => {
                    return dispatch(failure("Đã có lỗi xảy ra, vui lòng thử lại!"));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message, user) { return { type: userConstants.UPDATE_SUCCESS, message, user} }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}
const update = ({_id, displayname}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(API_URL + 'users/update', {
                    _id,
                    displayname
                })
                .then( result => { 
                        return dispatch(success(result.data.message, result.data.user));
                    }
                )
                .catch(error => {
                    return dispatch(failure("Đã có lỗi xảy ra, vui lòng thử lại"));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message, user) { return { type: userConstants.UPDATE_SUCCESS, message, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

const changepass = ({_id, passpresent, password}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post('https://hw6-caro-api.herokuapp.com/user/changepass', {
                    _id,
                    passpresent,
                    password
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success(result.data.message));
                    }
                )
                .catch(error => {
                    dispatch(failure(error.response.data.message));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.CHANGEPASS_REQUEST} }
    function success(message) { return { type: userConstants.CHANGEPASS_SUCCESS, message } }
    function failure(error) { return { type: userConstants.CHANGEPASS_FAILURE, error } }
}

const requestContract = (studentID, teacherID, fromDate, toDate, hour, skill,value, address) => {
    return axios
        .post(`${API_URL}student/contract/request`, {
            studentID, teacherID,fromDate, toDate, hour, skill, value, address
        })
        .then(res => {
            return res.data
        }).catch(error => console.log(error));
}

export const userActions = {
    login,
    loginWithFB,
    loginWithGG,
    logout,
    register,
    update,
    changepass,
    getDetail,
    registerTeacher,
    updateTeacherInfo,
    updateTeacherIntro,
    updateTeacherMajorSkill,
    updateAvatar,
    activeEmail,
    requestContract
};