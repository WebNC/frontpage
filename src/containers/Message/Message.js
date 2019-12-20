import React, { useEffect, useRef } from 'react'
import{ connect } from 'react-redux'
import {userActions} from '../../actions/user.actions'
import {chatActions} from '../../actions/chat.actions'
import {Button, Input, Spin, Icon} from 'antd';
import MessageContent from './MessageContent/MessageContent'
import NotificationMessage from './NotificationMessage/NotificationMessage'
import './style.css'
import moment from 'moment';
import 'moment/locale/vi'
moment.locale('vi');

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Message extends React.Component {

  constructor() {
    super();
    this.state = {
      mess: '',
    };
		this.mesRef = React.createRef();
	}
  componentDidUpdate() {
    const {messages, pendingGet } = this.props;
    if(messages !== undefined && pendingGet === false) {
      this.scrollToBottom();
    }
  }

  handleInputChange = (e) => {
    this.setState({mess: e.target.value});
  }

  handleSendMessage = async () => {
    const {sendMessage, user, partner, getMessage, isTeacher} = this.props;
    // console.log(user);
    // console.log(partner);
    // console.log(this.state.mess);
    if (isTeacher) {
      await sendMessage({
        type: 'Người dạy',
        studentID: partner._id,
        teacherID: user._id,
        content: this.state.mess,
      });
    }
    else {
      await sendMessage({
        type: 'Người học',
        studentID: user._id,
        teacherID: partner._id,
        content: this.state.mess,
      });
    }

    this.setState({mess: ''});
  }

  scrollToBottom = () => {
    const {messages, pendingGet } = this.props;
    if(messages !== undefined && pendingGet === false) {
      this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
    }
  };

  render() {
    const {listPartner, getMessage, user, isTeacher, messages, partner, pendingGet, pendingSend} = this.props;

    return (
      <>
        {listPartner !== undefined ? (
          <>
            { listPartner.length !== 0 ? (
              <div className="mesage-component">
                <div className="from">
                  {listPartner.map((element) => 
                    <NotificationMessage 
                      from={element.name} 
                      fromID={element.partnerID}
                      unSeen={element.unseen} 
                      getMessage={getMessage}
                      avatar={element.avatar}
                      userID={user._id}
                      isTeacher={isTeacher}
                    />
                  )}
                </div>
                {messages !== undefined ? (
                  <div className="message-content-component">
                    <div className="message-content" ref={this.mesRef}>
                      { pendingGet === true ? (
                        <div style={{textAlign: "center"}}>
                          <Spin indicator={antIcon} />
                        </div>
                      ):(
                        <>
                          {messages.length === 1 && messages[0].content.length === 0 ? (
                            <div>
                              {`Hãy bắt đầu trò chuyện với ${partner.username}!`}
                            </div>
                          ):(
                            <>
                              {messages[0].content.map((element) => 
                                <MessageContent 
                                  message={element.content} 
                                  time={moment(element.time).format('lll')} 
                                  isReceived={user._id == element.from ? false : true}
                                  img={partner.url} 
                                />
                              )}
                            </>
                          )}
                        </>
                    )}
                    </div>
                    <div className="input-message">
                      <Input
                        placeholder="Nhập tin nhắn của bạn"
                        onChange={this.handleInputChange}
                        onPressEnter={this.handleSendMessage}
                        value={this.state.mess}
                      ></Input>
                      <Button type="primary" style={{marginLeft: "10px"}} onClick={this.handleSendMessage} loading={pendingSend}>Gửi</Button>
                    </div>
                  </div>
                ):(
                  <p style={{lineHeight: "30px", marginTop: "10px", marginLeft: "10px"}}>Hãy chọn người bạn muốn trò chuyện. </p>
                )}
              </div>
            ):(
              <div>
                <p style={{textAlign: "left", fontSize: "16px"}}>
                  Bạn chưa có tin nhắn. 
                </p>
                { !isTeacher &&  
                  <p style={{textAlign: "left", fontSize: "16px"}}>
                    Khi gửi hợp đồng đến một giáo viên, bạn có thể nhắn tin với người đó!
                  </p>
                }
              </div>
            )}
          </>
        ):(
          <div style={{textAlign: "center"}}>
            <Spin indicator={antIcon} />
          </div>
      )}
     </>
    );
  }
}

function mapStateToProps(state) {
  return { 
    errMessage: state.chat.errMessage,
    partner: state.chat.partner,
    listPartner: state.chat.listPartner,
    messages: state.chat.messages,
    user: state.user.user,
    isTeacher: state.user.isTeacher,
    pendingGet: state.chat.pendingGet,
    pendingSend: state.chat.pendingSend
  };
}

const mapDispatchToProps = (dispatch) => ({
  getMessage: (data) => dispatch(chatActions.getMessage(data)),
  sendMessage: (data) => dispatch(chatActions.sendMessage(data)),
  getPartnerList: (data) => dispatch(chatActions.getPartnerList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Message)