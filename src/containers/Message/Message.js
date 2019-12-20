import React, { useEffect, useRef } from 'react'
import{ connect } from 'react-redux'
import {userActions} from '../../actions/user.actions'
import {chatActions} from '../../actions/chat.actions'
import { Tooltip, Badge, Button, Avatar, Input} from 'antd';
import MessageContent from './MessageContent/MessageContent'
import NotificationMessage from './NotificationMessage/NotificationMessage'
import './style.css'
class Message extends React.Component {

  constructor() {
    super();
    this.state = {
      numberSelected: "0",
    };

		this.mesRef = React.createRef();
	}
  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const {listPartner} = this.props;
    if(listPartner !== undefined && listPartner.length !== 0) {
      this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
    }
  };

  render() {
    const {listPartner, getMessage} = this.props;
    console.log(listPartner);
    return (
      <>
        {listPartner !== undefined && listPartner.length !== 0 ? (
          <div className="mesage-component">
            <div className="from">
              {listPartner.map((element) => 
                <NotificationMessage 
                  from={element.name} 
                  fromID={element.partnerID} 
                  unSeen={element.unseen} 
                  getMessage={getMessage}
                  avatar={element.avatar}
                />
              )}
              
              {/* <NotificationMessage from="Uyển Nhi" unSeen={5} />
              <NotificationMessage from="Uyển Nhi" unSeen={5} />
              <NotificationMessage from="Uyển Nhi" unSeen={5} />
              <NotificationMessage from="Uyển Nhi" unSeen={5} />
              <NotificationMessage from="Uyển Nhi" unSeen={5} />
              <NotificationMessage from="Uyển Nhi" unSeen={5} />
              <NotificationMessage from="Uyển Nhi" unSeen={5} />
              <NotificationMessage from="Uyển Nhi" unSeen={5} /> */}
            </div>
            <div className="message-content-component">
              <div className="message-content" ref={this.mesRef}>
                <MessageContent message="a" time="4:12 19/12/2019" isReceived={true} />
                {/* <MessageContent message="aaaaaaaaaabbbbbbbbbbbbbbb" time="4:12 19/12/2019" isReceived={false} />
                <MessageContent message="a" time="4:12 19/12/2019" isReceived={true} />
                <MessageContent message="aaaaaaaaaabbbbbbbbbbbbbbb" time="4:12 19/12/2019" isReceived={false} />
                <MessageContent message="a" time="4:12 19/12/2019" isReceived={true} />
                <MessageContent message="aaaaaaaaaabbbbbbbbbbbbbbb" time="4:12 19/12/2019" isReceived={false} />
                <MessageContent message="a" time="4:12 19/12/2019" isReceived={true} />
                <MessageContent message="aaaaaaaaaabbbbbbbbbbbbbbb" time="4:12 19/12/2019" isReceived={false} />
                <MessageContent message="a" time="4:12 19/12/2019" isReceived={true} />
                <MessageContent message="aaaaaaaaaabbbbbbbbbbbbbbb" time="4:12 19/12/2019" isReceived={false} />
                <MessageContent message="a" time="4:12 19/12/2019" isReceived={true} />
                <MessageContent message="aaaaaaaaaabbbbbbbbbbbbbbb" time="4:12 19/12/2019" isReceived={false} />
                <MessageContent message="a" time="4:12 19/12/2019" isReceived={true} />
                <MessageContent message="aaaaaaaaaabbbbbbbbbbbbbbb" time="4:12 19/12/2019" isReceived={false} />
                <MessageContent message="a" time="4:12 19/12/2019" isReceived={true} />
                <MessageContent message="aaaaaaaaaabbbbbbbbbbbbbbb" time="4:12 19/12/2019" isReceived={false} /> */}
              </div>
              <div className="input-message">
                <Input
                  placeholder="Nhập tin nhắn của bạn"
                ></Input>
                <Button type="primary" style={{marginLeft: "10px"}}>Gửi</Button>
              </div>
            </div>
          </div>
        ):(
        <div>
          <p style={{textAlign: "left", fontSize: "16px"}}>
            Bạn chưa có tin nhắn. 
          </p> 
          <p style={{textAlign: "left", fontSize: "16px"}}>
            Khi gửi hợp đồng đến một giáo viên, bạn có thể nhắn tin với người đó!
          </p> 
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
  };
}

const mapDispatchToProps = (dispatch) => ({
  getMessage: (data) => dispatch(chatActions.getMessage(data)),
  sendMessage: (data) => dispatch(chatActions.sendMessage(data)),
  getPartnerList: (data) => dispatch(chatActions.getPartnerList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Message)