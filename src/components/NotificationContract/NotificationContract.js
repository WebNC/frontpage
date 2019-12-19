import React from 'react';
import { Button, Result, Icon, Spin } from 'antd';
import { Modal } from 'react-bootstrap'
import 'antd/dist/antd.css';
import './style.css'
import DetailContract from './DetailContract/DetailContract'
import ContractDetailStudentModal from '../../containers/ContractDetailStudentModal/ContractDetailStudentModal'
import EvaluationContractModal from '../../containers/EvaluationContractModal/EvaluationContractModal'
import ReportContractModal from '../../containers/ReportContractModal/ReportContractModal'
import { Link } from 'react-router-dom'
import { contractActions } from '../../actions/contract.actions'
import { userActions } from '../../actions/user.actions'
import { connect } from 'react-redux'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class NotificationContract extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      openModal : false,
      openEvaluation: false,
      openPayment: false,
      openReport: false,
      openComplete: false,
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
    })
  }

  handleShowEvaluationForm = () => {
    const {openEvaluation} = this.state;
    this.setState({
        openEvaluation : !openEvaluation,
    })
  }

  handlePayment = () => {
    const {openPayment} = this.state;
    const { paymentContract, contractInfo, getDetail } = this.props;

    paymentContract(contractInfo._id);
    this.setState({
        openPayment : !openPayment,
    })
    getDetail();
  }

  handlePaymentClose = () => {
    this.setState({
      openPayment : false
    })
  }

  handleComplete = () => {
    const {openComplete} = this.state;
    const { completeContract, contractInfo, getDetail } = this.props;

    completeContract(contractInfo._id);
    this.setState({
        openComplete : !openComplete,
    })
    getDetail();
  }

  handleCompleteClose = () => {
    this.setState({
      openComplete : false
    })
  }

  handleShowReportForm = () => {
    const {openReport} = this.state;
    this.setState({
        openReport: !openReport,
    })
  }

    render() {
        const {isTeacher, contractInfo, successMessage, errMessage} = this.props;
        const {openModal, openEvaluation, openPayment, openReport, openComplete} = this.state;
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
                {errMessage !== undefined && 
                  <Result
                    status="warning"
                    title={errMessage}
                  />
                }
                {successMessage !== undefined && 
                  <Result
                    status="success"
                    title={successMessage}
                  />
                } 
                { errMessage === undefined && successMessage === undefined &&
                  <div style={{textAlign: "center"}}>
                    <Spin indicator={antIcon} />
                  </div>
                }
              </Modal.Body>
            </Modal>
          }

          {openComplete && 
            <Modal className="notification-contract-component" show={openComplete} onHide={this.handleCompleteClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Xác nhật hoàn thành hợp đồng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {errMessage !== undefined && 
                  <Result
                    status="warning"
                    title={errMessage}
                  />
                }
                {successMessage !== undefined && 
                  <Result
                    status="success"
                    title={successMessage}
                  />
                } 
                { errMessage === undefined && successMessage === undefined &&
                  <div style={{textAlign: "center"}}>
                    <Spin indicator={antIcon} />
                  </div>
                }
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
                <>
                  <p className="status pending-status">
                    {contractInfo.status}
                  </p>
                  <div className="btn-status-component">
                    <Button type="primary" onClick={this.handleShowDetailContract} className="status-btn">Xem chi tiết</Button>
                  </div>
                </>
              )}
              {contractInfo.status === "Từ chối" && (
                <>
                  <p className="status deline-status">
                    {contractInfo.status}
                  </p>
                  <div className="btn-status-component">
                    <Button type="primary" onClick={this.handleShowDetailContract} className="status-btn">Xem chi tiết</Button>
                  </div>
                </>
              )}
              {contractInfo.status === "Đã chấp nhận" && (
                <>
                  <p className="status accept-status">
                    {contractInfo.status}
                  </p>
                  <div className="btn-status-component"> 
                    {!isTeacher && <Button onClick={this.handlePayment} className="status-btn">Thanh toán</Button>}
                    <Button type="primary" onClick={this.handleShowDetailContract} className="status-btn">Xem chi tiết</Button>
                  </div>
                </>
              )}
              {contractInfo.status === "Đã thanh toán" && (
                <>
                  <p className="status paid-status">
                    {contractInfo.status}
                  </p>
                  <div className="btn-status-component"> 
                    {!isTeacher && <Button onClick={this.handleComplete} className="status-btn">Hoàn thành</Button>}
                    <Button type="primary" onClick={this.handleShowDetailContract} className="status-btn">Xem chi tiết</Button>
                  </div>
                </>
              )}
              

              {contractInfo.status === "Đã hoàn thành" && (
                <>
                  <p className="status complete-status">
                    {contractInfo.status}
                  </p>
                  <div className="btn-status-component"> 
                  {!isTeacher &&
                    <>
                      <Button onClick={this.handleShowEvaluationForm} className="status-btn">Đánh giá</Button>
                      <Button onClick={this.handleShowReportForm} className="status-btn">Khiếu nại</Button>
                    </>
                  }
                    <Button type="primary" onClick={this.handleShowDetailContract} className="status-btn">Xem chi tiết</Button>
                  </div>
                </>
              )}
          </div>
        </>
       )
    }
}
function mapStateToProps(state) {
  return {
    successMessage: state.contracts.successMessage,
    errMessage: state.contracts.errMessage,
    user: state.user.user
  };
}
const mapDispatchToProps = dispatch => ({
  paymentContract: (id) => dispatch(contractActions.paymentContract(id)),
  resetContractUpdate: () => dispatch(contractActions.resetContractUpdate()),
  reportContract: (data) => dispatch(contractActions.reportContract(data)),
  getContractDetail: (id) => dispatch(contractActions.getContractDetail(id)),
  completeContract: (id) => dispatch(contractActions.completeContract(id)),
  getDetail: () => dispatch(userActions.getDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContract)
