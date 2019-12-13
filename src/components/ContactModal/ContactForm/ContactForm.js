import React from 'react';
import { Button, Form, Input, InputNumber, Icon, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';

const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class ContactForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            total: 0,
        }
    }

    render(){
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const {skills} = this.props;
        
        const dobError = isFieldTouched('dob') && getFieldError('dob');
        const phoneError = isFieldTouched('phone') && getFieldError('phone');
        const skillError = isFieldTouched('skill') && getFieldError('skill');
        const salaryError = isFieldTouched('salary') && getFieldError('salary');
        const {total} = this.state;

        return(
            
            <Form className="info-form" onSubmit={this.handleSubmit}>
                <div className="d-flex">
                    <Form.Item  className="mr-3" label="Frome Date" validateStatus={dobError ? 'error' : ''} help={dobError || ''}>
                        {getFieldDecorator('dob', {
                        rules: [
                            {
                            required: true,
                            message: 'Vui lòng nhập ngày sinh!',
                            },
                        ],
                        })(<DatePicker placeholder='dd/mm/yyyy' format={dateFormat} style={{width:270}}/>
                        )}
                     </Form.Item>

                    <Form.Item label="To Date" validateStatus={dobError ? 'error' : ''} help={dobError || ''}>
                            {getFieldDecorator('dob', {
                            rules: [
                                {
                                required: true,
                                message: 'Vui lòng nhập ngày sinh!',
                                },
                            ],
                            })(<DatePicker placeholder='dd/mm/yyyy' format={dateFormat} style={{width:270}}/>
                            )}
                    </Form.Item>

                </div>
              
                <div className="d-flex">
                    <Form.Item label="Số điện thoại" validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
                        {getFieldDecorator('phone', {
                            rules: [
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                            ],
                        })(<Input
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Số điện thoại"
                            />
                            )}
                    </Form.Item>
                    <div className="total">
                        {`Total : ${total} VND`}
                    </div>
             </div>

            

                    {/* <Form.Item label="Kỹ năng" validateStatus={skillError ? 'error': ''} help={skillError || ''}>
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
                        {skills || ['abc']}
                    </Select>,
                )}
                </Form.Item> */}

              

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="register-teacher-form-button" disabled={hasErrors(getFieldsError())}>
                    Lưu thay đổi
                  </Button>
                </Form.Item>  

            </Form>


        )
    }
}

const WrapContactForm = (Form.create({ name: 'contact-modal' })(ContactForm));

export default WrapContactForm;