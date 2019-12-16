import axios from 'axios';
import { contractConstants } from '../constants';
import {API_URL} from '../constants/index';

const getContractDetail = (id) => {
    return dispatch => {

        setTimeout(() => {
            axios
                .get(`${API_URL}users/contract/read/${id}`)
                .then(result => {
                    console.log(result.data);
                    dispatch(success(result.data));
                })
                .catch(error => {
                    return dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };

    function success(data) { return { type: contractConstants.GET_CONTRACT_DETAIL_SUCCESS, data} }
    function failure(error) { return { type: contractConstants.GET_CONTRACT_DETAIL_FAILURE, error } }
}

export const contractActions = {
  getContractDetail
};