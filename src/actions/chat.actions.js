import axios from 'axios';
import { chatConstants } from '../constants';
import {API_URL} from '../constants/index';

const getPartnerList = ({type, ID}) => {
    return dispatch => {
      dispatch(request());
        setTimeout(() => {
            axios
                .post(`${API_URL}chat/get-partner-list`, {
                  type, ID
                })
                .then(result => {
                    dispatch(success(result.data.chat));
                })
                .catch(error => {
                    return dispatch(failure('Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
                })
        }, 1000)
    };
    function request() { return { type: chatConstants.GET_PARTNER_CHAT_REQUEST} }
    function success(data) { return { type: chatConstants.GET_PARTNER_CHAT_SUCCESS, data} }
    function failure(error) { return { type: chatConstants.GET_PARTNER_CHAT_FAILURE, error } }
}

const getMessage = ({type, studentID, teacherID}) => {
  return dispatch => {
    dispatch(request());
      setTimeout(() => {
          axios
              .post(`${API_URL}chat/get-chat`, {
                type, studentID, teacherID
              })
              .then(result => {
                  dispatch(success(result.data.chat, result.data.partner));
              })
              .catch(error => {
                  return dispatch(failure('Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
              })
      }, 1000)
  };
  function request() { return { type: chatConstants.GET_MESSAGE_REQUEST} }
  function success(data, partner) { return { type: chatConstants.GET_MESSAGE_SUCCESS, data, partner} }
  function failure(error) { return { type: chatConstants.GET_MESSAGE_FAILURE, error } }
}

const sendMessage = ({teacherID, studentID, type, content}) => {
  return dispatch => {
    dispatch(request());
      setTimeout(() => {
          axios
              .post(`${API_URL}chat/send-chat`, {
                type, studentID, teacherID, content
              })
              .then(result => {
                  dispatch(success(result.data.chat));
              })
              .catch(error => {
                  return dispatch(failure('Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
              })
      }, 1000)
  };
  function request() { return { type: chatConstants.SEND_MESSAGE_REQUEST}}
  function success(data) { return { type: chatConstants.SEND_MESSAGE_SUCCESS, data}}
  function failure(error) { return { type: chatConstants.SEND_MESSAGE_FAILURE, error}}
}

const createRoom = ({teacherID, studentID}) => {
  return dispatch => {
    dispatch(request());
      setTimeout(() => {
          axios
              .post(`${API_URL}chat/create-room`, {
                studentID, teacherID
              })
              .then(result => {
                  dispatch(success());
              })
              .catch(error => {
                  return dispatch(failure());
              })
      }, 1000)
  };
  function request() { return { type: chatConstants.CREATE_ROOM_REQUEST }}
  function success() { return { type: chatConstants.CREATE_ROOM_SUCCESS }}
  function failure() { return { type: chatConstants.CREATE_ROOM_FAILURE }}
}

export const chatActions = {
  getMessage,
  getPartnerList,
  sendMessage,
  createRoom,
}