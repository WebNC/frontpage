import React from 'react'
import { Tooltip, Typography, Avatar } from 'antd';

const { Text } = Typography;

class MessageContent extends React.Component {

  render() {
    const { message, time, isReceived, img} = this.props;
    var styleDiv = {
      display: "flex",
      justifyContent: "flex-end",
      margin: "10px 0",
      wordWrap: "break-word"
    }

    var styleText = {
      maxWidth: "80%", 
      backgroundColor: "#1890ff",
      color: "#ffffff",
      padding: "0 10px",
      borderRadius: "5px",
      lineHeight: "35px"
    }

    var tooltip = "left"

    if(isReceived) {
      styleDiv = {
        display: "flex",
        margin: "10px 0",
        wordWrap: "break-word"
      }
  
      styleText = {
        maxWidth: "80%", 
        backgroundColor: "#f5f5f5",
        color: "#262626",
        padding: "0 10px",
        borderRadius: "5px",
        marginLeft: "5px",
        lineHeight: "35px"
      }
  
      tooltip = "right"
    }

    return (
      <div style={styleDiv}>
        <Tooltip placement={tooltip} title={time}>
           <Text style={styleText} >
              {message}
            </Text>
        </Tooltip>
      </div>
    );
  }
}

export default MessageContent