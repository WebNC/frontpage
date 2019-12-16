import React from 'react';
import { Icon, Button} from 'antd';
import 'antd/dist/antd.css';
import './style.css'
import DetailContract from './DetailContract/DetailContract'




class NotificationContract extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      openModal : false,
    }
  }

  componentDidMount = () =>{
    const {contractInfo} = this.props;
    this.setState({
      contractInfo
    })
  }

  handleShowDetailContract = () =>{
    const {openModal} = this.state;
    this.setState({
        openModal : !openModal,
    })
  }
   


    render() {
        const {isTeacher, contractInfo} = this.props;
        const {openModal} = this.state;
        return (
          <>
            <DetailContract open={openModal}
             handleShowDetailContract={this.handleShowDetailContract}
             contractInfo={contractInfo}
             /> 
                
          <div className="notification-contract-component">
              {isTeacher === true ? (
                <p className="notify">
                  Bạn có một hợp đồng từ <span className="username">{contractInfo.studentID}</span>
                </p>
                ):(
                <p className="notify">
                  Bạn có gửi hợp đồng đến <span className="username">{contractInfo.teacherID}</span>
                </p>
                )
              }
              {contractInfo.status === "Đang chờ" && (
                <p className="status pending-status">
                  {contractInfo.status}
                </p>
              )}
              {contractInfo.status === "Từ chối" && (
                <p className="status deline-status">
                  {contractInfo.status}
                </p>
              )}
              {contractInfo.status === "Thành công" && (
                <p className="status accept-status">
                  {contractInfo.status}
                </p>
              )}

                <Button onClick={this.handleShowDetailContract}  >Xem chi tiết</Button>
            {/* {isTeacher === true ? (
              <Button onClick={()=> history.push(`teacher/contract/${contractInfo._id}`)}>Xem chi tiết</Button>
            ):(
              <Button onClick={()=> history.push(`/contract/${contractInfo._id}`)}>Xem chi tiết</Button>
            )
            } */}


          </div>
                

          </>
       )
    }
}

export default NotificationContract
