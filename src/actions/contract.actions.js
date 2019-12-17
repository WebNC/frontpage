import axios from 'axios';
import { contractConstants } from '../constants/index';
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

const editContract = ({ id, fromDate, toDate, hour, skill, value, address }) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}student/contract/edit`, {
                    id, fromDate, toDate, hour, skill, value, address 
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success("Cập nhật thông tin thành công!", result.data.contract));
                    }
                )
                .catch(error => {
                    dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };

    function request() { return { type: contractConstants.EDIT_CONTRACT_REQUEST} }
    function success(message, contract) { return { type: contractConstants.EDIT_CONTRACT_SUCCESS, message, contract } }
    function failure(error) { return { type: contractConstants.EDIT_CONTRACT_FAILURE, error } }
}

const evaluateContract = ({id, rating, comment}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}student/contract/evaluate`, {
                    id, rating, comment 
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success("Đã đánh giá thành công!", result.data.contract));
                    }
                )
                .catch(error => {
                    dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };

    function request() { return { type: contractConstants.EVALUATE_CONTRACT_REQUEST} }
    function success(message, contract) { return { type: contractConstants.EVALUATE_CONTRACT_SUCCESS, message, contract } }
    function failure(error) { return { type: contractConstants.EVALUATE_CONTRACT_FAILURE, error } }
}

const deleteContract = (id) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}student/contract/delete`, {
                    id
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success("Hợp đồng đã được xóa!"));
                    }
                )
                .catch(error => {
                    dispatch(failure('Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };

    function request() { return { type: contractConstants.DELETE_CONTRACT_REQUEST} }
    function success(message) { return { type: contractConstants.DELETE_CONTRACT_SUCCESS, message} }
    function failure(error) { return { type: contractConstants.DELETE_CONTRACT_FAILURE, error } }
}

const reportContract = ({courseID, userID, content}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}student/contract/report`, {
                    courseID, userID, content
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success("Khiếu nại của bạn đã được gửi đi!"));
                    }
                )
                .catch(error => {
                    dispatch(failure('Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };

    function request() { return { type: contractConstants.REPORT_CONTRACT_REQUEST} }
    function success(message) { return { type: contractConstants.REPORT_CONTRACT_SUCCESS, message} }
    function failure(error) { return { type: contractConstants.REPORT_CONTRACT_FAILURE, error } }
}

const paymentContract = (id) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}student/payment`, {
                    id
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success("Thanh toán hợp đồng thành công!"));
                    }
                )
                .catch(error => {
                    dispatch(failure('Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };

    function request() { return { type: contractConstants.PAYMENT_CONTRACT_REQUEST} }
    function success(message) { return { type: contractConstants.PAYMENT_CONTRACT_SUCCESS, message} }
    function failure(error) { return { type: contractConstants.PAYMENT_CONTRACT_FAILURE, error } }
}


export const contractActions = {
  getContractDetail,
  editContract,
  evaluateContract,
  deleteContract,
  reportContract,
  paymentContract
};