import React from "react"
import { Icon, Button } from "antd"
import "antd/dist/antd.css"
import WrappedReportContractForm from "./ReportContractForm/ReportContractForm"
import { Modal } from "react-bootstrap"

class ReportContractModal extends React.Component {

  render() {
    const { open, handleShowReportForm, contractInfo} = this.props;
    return (
      <Modal className="notification-contract-component" show={open} onHide={handleShowReportForm}>
        <Modal.Header closeButton>
          	<Modal.Title>Khiếu nại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WrappedReportContractForm contractInfo={contractInfo}/>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ReportContractModal
