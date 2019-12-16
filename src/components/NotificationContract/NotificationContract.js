import React from 'react';
import { Icon, Button} from 'antd';
import 'antd/dist/antd.css';
import './style.css'
import DetailContract from './DetailContract/DetailContract'
import ContractDetailStudentModal from '../../containers/ContractDetailStudentModal/ContractDetailStudentModal'



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
        console.log(contractInfo);
        const {openModal} = this.state;
        return (
          <>
          { isTeacher && openModal &&
            < DetailContract open={openModal}
             handleShowDetailContract={this.handleShowDetailContract}
             contractInfo={contractInfo}
             /> 
          }
          { !isTeacher && openModal && 
          <ContractDetailStudentModal 
            open={openModal}
            handleShowDetailContract={this.handleShowDetailContract}
            contractId={contractInfo._id} 
          /> 
          }
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
                <div className="btn-status-component">
                  <p className="status pending-status">
                    {contractInfo.status}
                  </p>
                  <Button onClick={this.handleShowDetailContract}>Xem chi tiết</Button>
                </div>
              )}
              {contractInfo.status === "Từ chối" && (
                <div className="btn-status-component">
                  <p className="status deline-status">
                    {contractInfo.status}
                  </p>
                  <Button onClick={this.handleShowDetailContract}>Xem chi tiết</Button>
                </div>
              )}
              {contractInfo.status === "Đã thanh toán" && (
                <div className="btn-status-component"> 
                  <p className="status paid-status">
                    {contractInfo.status}
                  </p>
                  <Button onClick={this.handleShowDetailContract}>Đánh giá</Button>
                  <Button onClick={this.handleShowDetailContract}>Xem chi tiết</Button>
                </div>
              )}
              {contractInfo.status === "Đã chấp nhận" && (
                <div className="btn-status-component"> 
                  <p className="status accept-status">
                    {contractInfo.status}
                  </p>
                  <Button onClick={this.handleShowDetailContract}>Thanh toán</Button>
                  <Button onClick={this.handleShowDetailContract}>Xem chi tiết</Button>
                </div>
              )}

                  
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
