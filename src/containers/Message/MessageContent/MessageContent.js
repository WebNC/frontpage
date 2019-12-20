import React from 'react'
import { Tooltip, Typography } from 'antd';

const { Text } = Typography;

class MessageContent extends React.Component {

  render() {
    const { message, time, isReceived} = this.props;
    var styleDiv = {
      display: "flex",
      justifyContent: "flex-end",
      lineHeight: "30px",
      margin: "10px 0"
    }

    var styleText = {
      minWidth: "20%", 
      maxWidth: "60%", 
      backgroundColor: "#1890ff",
      color: "#ffffff",
      padding: "0 10px",
      borderRadius: "5px"
    }

    var tooltip = "left"

    if(isReceived) {
      styleDiv = {
        display: "flex",
        lineHeight: "30px",
        margin: "10px 0"
      }
  
      styleText = {
        minWidth: "20%", 
        maxWidth: "60%", 
        backgroundColor: "#f5f5f5",
        color: "#262626",
        padding: "0 10px",
        borderRadius: "5px"
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