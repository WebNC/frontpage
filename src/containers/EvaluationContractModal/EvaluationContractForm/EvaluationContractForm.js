import React from 'react';
import { Button, Form, Input} from 'antd';
import StarRatings from 'react-star-ratings';
import 'antd/dist/antd.css';
import { contractActions } from '../../../actions/contract.actions'
import {userActions} from '../../../actions/user.actions';
import {connect} from 'react-redux'

class EvaluationContractForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        rating: 5,
        isFirstLoad: true,
    }
    this.changeRating = this.changeRating.bind(this);
  }

  componentDidMount() {
    const { form, contractInfo} = this.props;
    if (contractInfo.comment) {
      this.setState({rating: contractInfo.rating})
      form.setFieldsValue({comment: contractInfo.comment.comment}) ;
    }
    form.validateFields();
  }

    handleSubmit = (e) =>{
      const {getFieldsValue} = this.props.form;
      const {contractInfo, evaluateContract, getDetail} = this.props;
      e.preventDefault();
      
      const values = getFieldsValue();
      evaluateContract({
          id: contractInfo._id,
          rating: this.state.rating,
          comment: values.comment
      });

      getDetail();
      this.setState({isFirstLoad: false})
    }

    changeRating( newRating, name ) {
      this.setState({
        rating: newRating
      });
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
                <Form.Item style={{marginBottom: "0px"}}>
                  <div style={{display: "flex"}}>
                    <p style={{marginRight: "10px", paddingTop: "5px"}}>Đánh giá của bạn: </p>
                    <StarRatings
                      rating={this.state.rating}
                      starRatedColor="#fcba03"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      starDimension={25}
                      starHoverColor="#fcba03"
                    />
                  </div>
                </Form.Item>
                <Form.Item label="Nội dung" style={{marginBottom: "0px"}}>
                  {getFieldDecorator('comment', {
                  rules: [
                  {
                    required: false,
                  },
                  ],
                  })(<Input.TextArea style={{height: 150}} autoSize={{ minRows: 5 }} placeholder="Nội dung đánh giá"/>
                    )}
                </Form.Item>
                <Form.Item style={{marginBottom: "0px"}}>
                  <Button type="primary" htmlType="submit" className="register-teacher-form-button">
                    Gửi đánh giá
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
    successMessage: state.contracts.successMessage
  };
}
const mapDispatchToProps = dispatch => ({
  evaluateContract: (data) => dispatch(contractActions.evaluateContract(data)),
  getDetail: () => dispatch(userActions.getDetail()),
});

const WrappedEvaluationContractForm = (Form.create({ name: 'evaluation-contract-form' })(EvaluationContractForm));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedEvaluationContractForm)