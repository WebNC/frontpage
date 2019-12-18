import React from 'react';
import { Button } from 'antd';
import { Modal } from 'react-bootstrap'
import 'antd/dist/antd.css';
import './style.css'
import DetailContract from './DetailContract/DetailContract'
import ContractDetailStudentModal from '../../containers/ContractDetailStudentModal/ContractDetailStudentModal'
import EvaluationContractModal from '../../containers/EvaluationContractModal/EvaluationContractModal'
import ReportContractModal from '../../containers/ReportContractModal/ReportContractModal'
import { Link } from 'react-router-dom'
import { contractActions } from '../../actions/contract.actions'
import { connect } from 'react-redux'

class NotificationContract extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      openModal : false,
      openEvaluation: false,
      openPayment: false,
      openReport: false
    }
  }

  componentDidMount = () =>{
    const {contractInfo, resetContractUpdate} = this.props;
    resetContractUpdate();
    this.setState({
      contractInfo
    })
  }

  handleShowDetailContract = () =>{
    const {openModal} = this.state;
    const {getContractDetail, contractInfo} = this.props;
    getContractDetail(contractInfo._id)
    this.setState({
        openModal : !openModal,
        openEvaluation: false,
        openPayment: false
    })
  }

  handleShowEvaluationForm = () => {
    const {openEvaluation} = this.state;
    this.setState({
        openEvaluation : !openEvaluation,
        openModal: false,
        openPayment: false,
    })
  }

  handlePayment = () => {
    const {openPayment} = this.state;
    const { paymentContract, contractInfo } = this.props;

    paymentContract(contractInfo._id);
    this.setState({
        openPayment : !openPayment,
        openModal: false,
        openEvaluation: false
    })
  }

  handlePaymentClose = () => {
    this.setState({
      openPayment : false
    })
  }

  handleShowReportForm = () => {
    const {openReport} = this.state;
    this.setState({
        openReport: !openReport,
        openEvaluation : false,
        openModal: false,
        openPayment: false,
    })
  }

    render() {
        const {isTeacher, contractInfo, successPayMessage, errPayMessage, contractUpdate} = this.props;
        const {openModal, openEvaluation, openPayment, openReport} = this.state;
        console.log(contractInfo);
        return (
          <>
          { isTeacher && openModal &&
            <DetailContract open={openModal}
             handleShowDetailContract={this.handleShowDetailContract}
             contractInfo={contractInfo}
             isWaiting={contractInfo.status === "Đang chờ"}
             /> 
          }
          { !isTeacher && openModal && 
          <ContractDetailStudentModal 
            open={openModal}
            handleShowDetailContract={this.handleShowDetailContract}
            contractInfo={contractInfo} 
          /> 
          }
          {openEvaluation && 
            <EvaluationContractModal 
            open={openEvaluation}
            handleShowEvaluationForm={this.handleShowEvaluationForm}
            contractInfo={contractInfo} 
          />
          }
          {openReport && 
            <ReportContractModal 
            open={openReport}
            handleShowReportForm={this.handleShowReportForm}
            contractInfo={contractInfo} 
          />
          }

          {openPayment && 
            <Modal className="notification-contract-component" show={openPayment} onHide={this.handlePaymentClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Thanh toán hợp đồng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{errPayMessage !== undefined ? errPayMessage : successPayMessage}</p>
              </Modal.Body>
            </Modal>
          }
          <div className="notification-contract-component">
              {isTeacher === true ? (
                <p className="notify">
                  Bạn có một hợp đồng từ <span className="username">{contractInfo.studentName}</span>
                </p>
                ):(
                <p className="notify-teacher">
                  Giáo viên: <Link to={`/teachers/${contractInfo.teacherID}`}>{contractInfo.teacherName}</Link>
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
                  {!isTeacher &&
                    <>
                      <Button onClick={this.handleShowEvaluationForm}>Đánh giá</Button>
                      <Button onClick={this.handleShowReportForm}>Khiếu nại</Button>
                    </>
                  }
                  <Button onClick={this.handleShowDetailContract}>Xem chi tiết</Button>
                </div>
              )}
              {contractInfo.status === "Đã chấp nhận" && (
                <> 
                  {contractUpdate !== undefined ? (
                    <div className="btn-status-component"> 
                    <p className="status paid-status">
                      {contractUpdate.status}
                    </p>
                    {!isTeacher &&
                    <>
                      <Button onClick={this.handleShowEvaluationForm}>Đánh giá</Button>
                      <Button onClick={this.handleReportContract}>Khiếu nại</Button>
                    </>
                    }
                    <Button onClick={this.handleShowDetailContract}>Xem chi tiết</Button>
                  </div>
                  ):(
                    <div className="btn-status-component"> 
                      <p className="status accept-status">
                        {contractInfo.status}
                      </p>
                      {!isTeacher && <Button onClick={this.handlePayment}>Thanh toán</Button>}
                      <Button onClick={this.handleShowDetailContract}>Xem chi tiết</Button>
                    </div>
                    
                  )
                  }
                  
                </>
              )}
          </div>
        </>
       )
    }
}
function mapStateToProps(state) {
  return {
    successPayMessage: state.contracts.successPayMessage,
    errPayMessage: state.contracts.errPayMessage,
    contractUpdate: state.contracts.contractUpdate,
    user: state.user.user
  };
}
const mapDispatchToProps = dispatch => ({
  paymentContract: (id) => dispatch(contractActions.paymentContract(id)),
  resetContractUpdate: () => dispatch(contractActions.resetContractUpdate()),
  reportContract: (data) => dispatch(contractActions.reportContract(data)),
  getContractDetail: (id) => dispatch(contractActions.getContractDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContract)
