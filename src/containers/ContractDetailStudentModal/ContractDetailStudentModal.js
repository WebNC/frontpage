import React from "react";
import { Icon, Button } from "antd";
import "antd/dist/antd.css";
// import {history} from '../../helper'
import WrappedContractDetailForm from "./ContractDetailForm/ContractDetailForm";
import { Modal } from "react-bootstrap";
import { skillActions } from '../../actions/skill.actions'
import { contractActions } from '../../actions/contract.actions'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class ContractDetailStudentModal extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    const { getAllSkill, getContractDetail, contractId} = this.props;
    console.log(contractId);
    getAllSkill();
    getContractDetail(contractId);
  }

  render() {
    const { open, handleShowDetailContract, contractInfo, allSkill } = this.props;
    return (
      <Modal className="notification-contract-component" show={open} onHide={handleShowDetailContract}>
        <Modal.Header closeButton>
          	<Modal.Title>Thông tin chi tiết hợp đồng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{textAlign: "left", fontSize: 16}}>Giáo viên: <Link to={`/teachers/${contractInfo.teacher._id}`}>{contractInfo.teacher.username}</Link></p>
          <p style={{textAlign: "left", fontSize: 16}}>Trạng thái: {contractInfo.contract.status}</p>
          <p style={{textAlign: "left", fontSize: 16}}>Chi tiết hợp đồng:</p>
          <WrappedContractDetailForm className="contract-detail-form" contractInfo={contractInfo} allSkill={allSkill}/>
        </Modal.Body>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    allSkill: state.skill.allSkill,
    contractInfo: state.contracts.contractInfo
  };
}
const mapDispatchToProps = dispatch => ({
  getAllSkill:() => dispatch(skillActions.getAll()),
  getContractDetail: (id) => dispatch(contractActions.getContractDetail(id)),
});

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDetailStudentModal)
