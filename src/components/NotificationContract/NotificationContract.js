import React from 'react';
import { Button } from 'antd';
import { Modal } from 'react-bootstrap'
import 'antd/dist/antd.css';
import './style.css'
import DetailContract from './DetailContract/DetailContract'
import ContractDetailStudentModal from '../../containers/ContractDetailStudentModal/ContractDetailStudentModal'
import EvaluationContractModal from '../../containers/EvaluationContractModal/EvaluationContractModal'
import { Link } from 'react-router-dom'
import { contractActions } from '../../actions/contract.actions'
import { connect } from 'react-redux'

class NotificationContract extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      openModal : false,
      openEvaluation: false,
      openPayment: false
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
    render() {
        const {isTeacher, contractInfo, successPayMessage, errPayMessage, contractUpdate} = this.props;
        const {openModal, openEvaluation, openPayment} = this.state;
        console.log(contractInfo);
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
                <p className="notify">
                  Bạn có gửi hợp đồng đến <Link to={`/teachers/${contractInfo.teacherID}`}>{contractInfo.teacherName}</Link>
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
                  {!isTeacher && <Button onClick={this.handleShowEvaluationForm}>Đánh giá</Button>}
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
                    {!isTeacher && <Button onClick={this.handleShowEvaluationForm}>Đánh giá</Button> }
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
  };
}
const mapDispatchToProps = dispatch => ({
  paymentContract: (id) => dispatch(contractActions.paymentContract(id)),
  resetContractUpdate: () => dispatch(contractActions.resetContractUpdate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContract)
