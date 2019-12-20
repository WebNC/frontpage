import React from 'react'
import { Tooltip, Badge, Button, Avatar} from 'antd';

class NotificationMessage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      unSeen: 0
    }
  }

  componentDidMount() {
    const { unSeen } = this.props;
    this.setState({unSeen: unSeen})
  }

  handelClick = () => {
    const { getMessage, userID, fromID, isTeacher } = this.props;
    if(isTeacher) {
      getMessage({
        type: 'Người dạy',
        studentID: fromID,
        teacherID: userID,
      });
    }
    else {
      getMessage({
        type: 'Người học',
        studentID: userID,
        teacherID: fromID,
      });
    }
    this.setState({unSeen: 0})
  }

  render() {
    const {from, unSeen, avatar} = this.props;

    return (
      <Button style={{width: "100%", height: "70px", padding: "0 10px", margin: "5px 0", border: "0"}} onClick={this.handelClick}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div style={{display: "flex", alignItems: "center"}}> 
            <Avatar size={50} src={avatar}/>
            <p style={{marginLeft: "10px", justifyContent: "center", marginBottom: "0", fontSize: "16px"}}>
              {from}
            </p>
          </div>
          {unSeen !== 0 &&
            <Badge count={this.state.unSeen}></Badge>
          }
        </div>
      </Button>
    );
  }
}

export default NotificationMessage