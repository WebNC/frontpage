import React from 'react';
import { Icon, Button, Spin} from 'antd';
import {Modal} from 'react-bootstrap'
import 'antd/dist/antd.css';
import './style.css'
import moment from 'moment';
import { connect } from 'react-redux'
import { contractActions } from '../../../actions/contract.actions';
import { userActions } from '../../../actions/user.actions';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class DetailContract extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isFirstLoad: true
    }
  }

  handleAccept = () => {
    const {replyContract, contractDetail, getDetail} = this.props;
    replyContract({
      id: contractDetail.contract._id,
      status: 'Đã chấp nhận'
    });
    this.setState({isFirstLoad: false})
    getDetail();
  }

  handleDeline = () => {
    const {replyContract, contractDetail, getDetail} = this.props;
    replyContract({
      id: contractDetail.contract._id,
      status: 'Từ chối'
    });
    this.setState({isFirstLoad: false})
    getDetail();
  }

    render() {
        const {open, handleShowDetailContract, contractDetail, isWaiting, successMessage, errMessage} = this.props;
      
        var selectedSkill =[];
        if(contractDetail !== null && contractDetail !== undefined) {
          console.log(contractDetail.contract.skill)

          contractDetail.contract.skill.forEach(element => {
            selectedSkill.push(
            <h5 style={{fontSize: 14, textAlign: "left"}} >
              {element.name}
            </h5>)
          });
        }
        return (
         <Modal show={open} onHide={handleShowDetailContract} dialogClassName="modal-600">
            <Modal.Header closeButton>
              <Modal.Title>Thông tin hợp đồng</Modal.Title>
            </Modal.Header>
            {successMessage !== undefined && !this.state.isFirstLoad ? (
              <p style={{fontSize: 18, lineHeight: "100px"}}>
                {successMessage}
              </p>
            ):(
              <Modal.Body>
                <div className="error-message">{errMessage}</div>
                {contractDetail !== undefined ?  
                  (<div className="info-contract-teacher">
                    <div className="item-info-contract-teacher">
                      <h5 className="title-contract-teacher">Địa chỉ học :</h5>
                      <h5>
                        {`${contractDetail.contract.address.address}, ${contractDetail.contract.address.district}, Hồ Chí Minh` } 
                      </h5>
                    </div>
                    <div className="item-info-contract-teacher">
                      <h5 className="title-contract-teacher">Tên học viên: </h5> 
                      <h5>
                        {contractDetail.student.username}
                      </h5> 
                    </div>
                    <div className="item-info-contract-teacher">
                      <h5 className="title-contract-teacher">Thời gian dạy:</h5>
                      <h5>
                        {contractDetail.contract.fromDate !== undefined ? 
                          ` Từ ${moment(contractDetail.contract.fromDate).format('DD/MM/YYYY')} đến ${moment(contractDetail.contract.toDate).format('DD/MM/YYYY')}` 
                          : ''
                        } 
                      </h5>
                    </div>
                    <div className="item-info-contract-teacher">
                      <h5 className="title-contract-teacher">Địa chỉ:</h5>
                      <h5>
                        {`${contractDetail.contract.address.address}, ${contractDetail.contract.address.district}, Hồ Chí Minh` } 
                      </h5>
                    </div>
                    <div className="item-info-contract-teacher">
                      <h5 className="title-contract-teacher">Kỹ năng:</h5>
                      <div style={{display: "block"}}>
                        {selectedSkill}
                      </div>
                    </div>
                    <div className="item-info-contract-teacher">
                      <h5 className="title-contract-teacher">Tổng số giờ:</h5> 
                      <h5>
                        { contractDetail.contract.hour }
                      </h5>
                    </div>
                    <div className="item-info-contract-teacher">
                      <h5 className="title-contract-teacher" style={{fontSize: 20}}>Tổng tiền: </h5>
                      <h5 style={{fontSize: 24}}>
                        {`${contractDetail.contract.value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </h5>
                    </div>
                </div> 
                ):(
                  <div style={{textAlign: "center"}}>
                    <Spin indicator={antIcon} />
                  </div>
                )
                }
              </Modal.Body>
            )}
            
            {successMessage === undefined && errMessage === undefined && contractDetail !== undefined && isWaiting &&
              <Modal.Footer>
                  <Button type="primary" onClick={this.handleAccept}>Đồng ý</Button>
                  <Button type="secondary" onClick={this.handleDeline}>Từ chối</Button>
              </Modal.Footer>
            }
          </Modal>
        )
    }
}

function mapStateToProps(state) {
  return {
    successMessage: state.contracts.successMessage,
    errMessage: state.contracts.errMessage,
    contractDetail: state.contracts.contractDetail
  };
}
const mapDispatchToProps = dispatch => ({
  replyContract: (data) => dispatch(contractActions.replyContract(data)),
  getDetail: () => dispatch(userActions.getDetail())
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailContract)
