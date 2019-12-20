import React from "react";
import { Button, Form, InputNumber, Icon, Select, DatePicker , Spin} from "antd";
import AddressInput from '../../components/AddressInput/AddressInput'
import "antd/dist/antd.css";
import './style.css'
// import {history} from '../../helper'
import WrappedContractDetailForm from "./ContractDetailForm/ContractDetailForm";
import { Modal } from "react-bootstrap";
import { skillActions } from '../../actions/skill.actions'
import { contractActions } from '../../actions/contract.actions'
import { userActions } from '../../actions/user.actions'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ContractDetailForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isFirstLoad: true,
        total: 0,
        hour: 0,
        isEdit: false
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    const { getAllSkill, getContractDetail, contractInfo, form} = this.props;
    getAllSkill();
    getContractDetail(contractInfo._id)
    form.setFieldsValue({
      skill: contractInfo.skill,
      fromDate: [moment(contractInfo.fromDate),moment(contractInfo.toDate)],
      address: contractInfo.address, 
      hour: contractInfo.hour,
    });

    contractInfo.status !== "Đang chờ" ? this.setState({disabled: true}) : this.setState({disabled: false});
    this.setState({total: contractInfo.value});
    }

    handleEdit = () => {
      this.setState({isEdit: true})
    }

  render() {
    const { open, handleShowDetailContract, contractDetail} = this.props;


    var selectedSkill =[];
    if(contractDetail !== null && contractDetail !== undefined) {
      contractDetail.contract.skill.forEach(element => {
        selectedSkill.push(
        <h5 style={{fontSize: 14}}>
          <Icon type="check" className="icon"/>
          {element.name}
        </h5>)
      });
    }

    return (
      <Modal className="notification-contract-component" show={open} onHide={handleShowDetailContract}>
        <Modal.Header closeButton>
          	<Modal.Title>Thông tin chi tiết hợp đồng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { contractDetail !== undefined ? ( 
          <>
            <p style={{textAlign: "left", fontSize: 16}}>Giáo viên: <Link to={`/teachers/${contractDetail.teacher._id}`}>{contractDetail.teacher.username}</Link></p>
            <p style={{textAlign: "left", fontSize: 16}}>Trạng thái: {contractDetail.contract.status}</p>
            <p style={{textAlign: "left", fontSize: 16}}>Ngày tạo: {moment(contractDetail.contract.createAt).format('DD/MM/YYYY')}</p>
            <p style={{textAlign: "left", fontSize: 16}}>Chi tiết hợp đồng:</p>
            {this.state.isEdit === true ? (
              <WrappedContractDetailForm />
            ):(
              <>
                  <div className="item-info-contract">
                    <h5 className="title">Thời gian dạy:</h5>
                    <h5>
                      {contractDetail.contract.fromDate !== undefined ? 
                        ` Từ ${moment(contractDetail.contract.fromDate).format('DD/MM/YYYY')} đến ${moment(contractDetail.contract.toDate).format('DD/MM/YYYY')}` 
                        : ''
                      } 
                    </h5>
                  </div>
                  <div className="item-info-contract">
                    <h5 className="title">Địa chỉ:</h5>
                    <h5>
                      {contractDetail.contract.address === undefined ? '' : `${contractDetail.contract.address.address}, ${contractDetail.contract.address.district}, Hồ Chí Minh` } 
                    </h5>
                  </div>
                  <div className="item-info-contract">
                    <h5 className="title">Kỹ năng:</h5>
                    <div>
                      {selectedSkill}
                    </div>
                  </div>
                  <div className="item-info-contract">
                    <h5 className="title">Tổng số giờ:</h5> 
                    <h5>
                      { contractDetail.contract.hour }
                    </h5>
                  </div>
                  <div className="item-info-contract">
                    <h5 className="title">Tổng tiền: </h5>
                    <h5>
                      {`${contractDetail.contract.value } đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </h5>
                  </div>
                  {contractDetail.contract.status === "Đang chờ" ? (
                    <Button type="primary" onClick={this.handleEdit} style={{width: "50%", marginLeft: "25%", marginTop: 20}}>Chỉnh sửa hợp đồng</Button>
                  ):(
                    <>
                    </> 
                  )
                }
                  
                </>
              )
            }
            </>
          ):(
            <div style={{textAlign: "center"}}>
              <Spin indicator={antIcon} />
            </div>
          )
        }
        </Modal.Body>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    allSkill: state.skill.allSkill,
    contractDetail: state.contracts.contractDetail,
    errMessage: state.contracts.errMessage,
    successMessage: state.contracts.successMessage,
  };
}
const mapDispatchToProps = dispatch => ({
  getAllSkill:() => dispatch(skillActions.getAll()),
  getContractDetail: (id) => dispatch(contractActions.getContractDetail(id)),
 });

const ContractDetailStudentModal = (Form.create({ name: 'contract-detail-form' })(ContractDetailForm));

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDetailStudentModal)
