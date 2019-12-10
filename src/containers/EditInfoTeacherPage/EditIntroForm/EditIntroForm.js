import React from 'react';
import { Form, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import {userActions} from '../../../actions/user.actions';
import{ connect } from 'react-redux';
// import './style.css';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditIntroTeacherForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    const { form, user} = this.props;
    // form.setFieldsValue({username: username});
    form.setFieldsValue({intro: user.intro});
    form.validateFields();
  }
    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      const {updateTeacherIntro, user} = this.props;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      updateTeacherIntro({
        id: user._id,
        intro: values.intro
      })
      
      this.setState({isFirstLoad: false})
    }

  render() {
    const { getFieldDecorator, getFieldsError} = this.props.form;
    const {successMessage,errMessage, pending} = this.props;

    return (
      <Form className="intro-form" onSubmit={this.handleSubmit}>
        <Form.Item>
          {successMessage && !this.state.isFirstLoad &&
            <div className="success-message">{successMessage}</div>
          }
          {errMessage && !this.state.isFirstLoad &&
            <div className="error-message">{errMessage}</div>
          }
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('intro')(<Input.TextArea autoSize={{ minRows: 10 }} placeholder="Giới thiệu bản thân"/>,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-teacher-form-button" disabled={hasErrors(getFieldsError())} loading={pending}>
            Lưu thay đổi
          </Button>
        </Form.Item>  
      </Form>
    );
  }
}
function mapStateToProps(state) {
  return { 
    successMessage: state.user.successMessage,
    errMessage: state.user.errMessage,
    pending: state.user.pending,
    user: state.user.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateTeacherIntro: (user) => dispatch(userActions.updateTeacherIntro(user))
});

const WrappedEditIntroTeacherForm = (Form.create({ name: 'edit-intro-teacher' })(EditIntroTeacherForm));

export default connect(mapStateToProps, mapDispatchToProps)(WrappedEditIntroTeacherForm)