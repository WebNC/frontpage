import React from "react"
import { Icon, Button } from "antd"
import "antd/dist/antd.css"
import WrappedEvaluationContractForm from "./EvaluationContractForm/EvaluationContractForm"
import { Modal } from "react-bootstrap"

class EvaluationContractModal extends React.Component {

  render() {
    const { open, handleShowEvaluationForm, contractInfo} = this.props;
    return (
      <Modal className="notification-contract-component" show={open} onHide={handleShowEvaluationForm}>
        <Modal.Header closeButton>
          	<Modal.Title>Đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WrappedEvaluationContractForm contractInfo={contractInfo}/>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EvaluationContractModal
