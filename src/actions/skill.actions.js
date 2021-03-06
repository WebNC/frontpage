import axios from 'axios';
import { skillConstants } from '../constants';
import {API_URL} from '../constants/index';

const getAll = () => {
    return dispatch => {

        setTimeout(() => {
            axios
                .get(`${API_URL}skill`)
                .then(result => {
                    dispatch(success(result.data.message));
                })
                .catch(error => {
                    return dispatch(failure('Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };

    function success(data) { return { type: skillConstants.GETALL_SUCCESS, data} }
    function failure(error) { return { type: skillConstants.GETALL_FAILURE, error } }
}

export const skillActions = {
  getAll
};