import React from 'react';
import { Button, Form, Input} from 'antd';
import StarRatings from 'react-star-ratings';
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

    componentDidMount() {
      const { form, contractInfo} = this.props;
      this.setState({rating: contractInfo.rating})
      form.setFieldsValue({comment: contractInfo.comment.comment}) ;
      form.validateFields();
    }

    handleSubmit = (e) =>{
      const {getFieldsValue} = this.props.form;
      const {contractInfo, reportContract, getDetail, user} = this.props;
      e.preventDefault();
      
      const values = getFieldsValue();
      reportContract({
        courseID: contractInfo._id,
        userID: user._id,
        content: values.content
      });

      getDetail();
      this.setState({isFirstLoad: false})
    }


    render(){
        const {getFieldDecorator} = this.props.form;
        const {successMessage, errMessage} = this.props;

        return(
          <>
            {successMessage !== undefined && !this.state.isFirstLoad ? ( 
              <p>
                {successMessage}
              </p> 
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
                  <Button type="primary" htmlType="submit" className="register-teacher-form-button">
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
    user: state.user.user
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