import React from 'react';
import { Button, Form, Input, Result} from 'antd';
import 'antd/dist/antd.css';
import { contractActions } from '../../../actions/contract.actions'
import {userActions} from '../../../actions/user.actions';
import {connect} from 'react-redux'

class ReportContractForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isFirstLoad: true,
      }
    }

    handleSubmit = (e) =>{
      const {getFieldsValue} = this.props.form;
      const {contractInfo, reportContract, getDetail, user} = this.props;
      e.preventDefault();
      
      const values = getFieldsValue();
      reportContract({
        contractID: contractInfo._id,
        teacherID: contractInfo.teacherID,
        studentID: user._id,
        content: values.content
      });

      getDetail();
      this.setState({isFirstLoad: false})
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const {successMessage, errMessage, pending} = this.props;

        return(
          <>
            {successMessage !== undefined && !this.state.isFirstLoad ? ( 
              <Result
                status="success"
                title={successMessage}
              />
            ): (
              <Form onSubmit={this.handleSubmit} className="evaluate-contract-form">
                <Form.Item style={{marginBottom: "0px"}}>
                  <div className="error-message">{errMessage}</div>
                </Form.Item>
                <Form.Item label="Nội dung" style={{marginBottom: "0px"}}>
                  {getFieldDecorator('content', {
                  rules: [
                  {
                    required: false,
                  },
                  ],
                  })(<Input.TextArea style={{height: 150}} autoSize={{ minRows: 5 }} placeholder="Nội dung khiếu nại"/>
                    )}
                </Form.Item>
                <Form.Item style={{marginBottom: "0px"}}>
                  <Button type="primary" htmlType="submit" className="register-teacher-form-button" loading={pending}>
                    Gửi khiếu nại
                  </Button>
                </Form.Item>
              </Form>
            )}
          </> 
        )
    }
}

function mapStateToProps(state) {
  return {
    errMessage: state.contracts.errMessage,
    successMessage: state.contracts.successMessage,
    user: state.user.user,
    pending: state.contracts.pending
  };
}
const mapDispatchToProps = dispatch => ({
  reportContract: (data) => dispatch(contractActions.reportContract(data)),
  getDetail: () => dispatch(userActions.getDetail()),
});

const WrappedReportContractForm = (Form.create({ name: 'report-contract-form' })(ReportContractForm));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedReportContractForm)