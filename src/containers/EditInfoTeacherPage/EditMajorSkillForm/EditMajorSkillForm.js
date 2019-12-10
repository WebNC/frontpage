import React from 'react';
import { Form, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import {userActions} from '../../../actions/user.actions';
import {skillActions} from '../../../actions/skill.action';
import{ connect } from 'react-redux';

// import './style.css';
const {Option} = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditMajorSkillForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    const { form, getAllSkill, user } = this.props;
    getAllSkill();
    // form.setFieldsValue({username: username});
    form.setFieldsValue({major: user.major, skill: user.skill});
    form.validateFields();
  }

    handleSubmit = e => {
      const {getFieldsValue} = this.props.form;
      const {updateTeacherMajorSkill, user} = this.props;
      e.preventDefault();
      
      const values = getFieldsValue();
      
      updateTeacherMajorSkill({
        id:user._id,
        skill: values.skill,
        major: values.major
      });
      
      this.setState({isFirstLoad: false})
    }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {message, pending, allSkill,  successMessage, errMessage} = this.props;
    // Only show error after a field is touched.
    const skillError = isFieldTouched('skill') && getFieldError('skill');
    const majorError = isFieldTouched('major') && getFieldError('major');

    const selectSkill=[];
    if (allSkill !== undefined) {
      allSkill.forEach(skill => {
        selectSkill.push(<Option key={ skill._id }>{skill.name}</Option>)
        });
    }

    return (
              <Form className="major-skill-form" onSubmit={this.handleSubmit}>
                <Form.Item>
                  {successMessage && !this.state.isFirstLoad &&
                    <div className="success-message">{successMessage}</div>
                  }
                  {errMessage && !this.state.isFirstLoad &&
                    <div className="error-message">{errMessage}</div>
                  }
                </Form.Item>
                <Form.Item label="Chuyên môn" validateStatus={majorError ? 'error' : ''} help={majorError || ''}>
                  {getFieldDecorator('major', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập chuyên môn của bạn!',
                      },
                    ],
                  })(<Input placeholder="Web developer"/>,
                    )}
                </Form.Item>
                <Form.Item label="Kỹ năng" validateStatus={skillError ? 'error': ''} help={skillError || ''}>
                  {getFieldDecorator('skill', {
                      rules: [
                        {
                          required: true,
                          message: 'Vui lòng nhập những kỹ năng của bạn!',
                        },
                      ],
                    })(<Select 
                        mode="tags" 
                        style={{ width: '100%' }} 
                        tokenSeparators={[',']}
                        placeholder="Kỹ năng">
                          {selectSkill}
                      </Select>,
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
    allSkill: state.skill.allSkill
  };
}
const mapDispatchToProps = (dispatch) => ({
  updateTeacherMajorSkill: (user) => dispatch(userActions.updateTeacherMajorSkill(user)),
  getAllSkill:() => dispatch(skillActions.getAll())
});

const WrappedEditMajorSkillForm = (Form.create({ name: 'major-skill' })(EditMajorSkillForm));

export default connect(mapStateToProps, mapDispatchToProps)(WrappedEditMajorSkillForm)