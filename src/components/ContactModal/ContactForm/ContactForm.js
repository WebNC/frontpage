import React from 'react';
import { Button, Form, Input, InputNumber, Icon, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';

const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;

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
        
        const fromDateError = isFieldTouched('fromdate') && getFieldError('fromdate');
        const toDateError = isFieldTouched('fromdate') && getFieldError('fromdate');

        const hourError = isFieldTouched('hour') && getFieldError('hour');
        const skillError = isFieldTouched('skill') && getFieldError('skill');
        const {total} = this.state;

        const selectSkill=[];
    if (skills !== undefined) {
      skills.forEach(skill => {
        selectSkill.push(<Option key={ skill._id }>{skill.name}</Option>)
        });
    }

        return(
            
            <Form className="info-form" onSubmit={this.handleSubmit}>
                <div className="d-flex">
                    <Form.Item  className="mr-3" label="Frome Date" validateStatus={fromDateError ? 'error' : ''} help={fromDateError || ''}>
                        {getFieldDecorator('fromdate', {
                        rules: [
                            {
                            required: true,
                            message: 'Enter date from please !',
                            },
                        ],
                        })(<DatePicker placeholder='dd/mm/yyyy' format={dateFormat} style={{width:270}}/>
                        )}
                     </Form.Item>

                    <Form.Item label="To Date" validateStatus={toDateError ? 'error' : ''} help={toDateError || ''}>
                            {getFieldDecorator('todate', {
                            rules: [
                                {
                                required: true,
                                message: 'Enter date to please!',
                                },
                            ],
                            })(<DatePicker placeholder='dd/mm/yyyy' format={dateFormat} style={{width:270}}/>
                            )}
                    </Form.Item>

                </div>
              
                <div className="d-flex">
                    <Form.Item label="Number of studying hour" validateStatus={hourError ? 'error' : ''} help={hourError || ''}>
                        {getFieldDecorator('hour', {
                            rules: [
                            {
                                required: true,
                                message: 'Enter number of studying hour',
                            },
                            ],
                        })(<InputNumber
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Total hours"
                            />
                            )}
                    </Form.Item>
                    <div className="total">
                        {`Total : ${total} VND`}
                    </div>
             </div>

            

                <Form.Item label="Skill" validateStatus={skillError ? 'error': ''} help={skillError || ''}>
                {getFieldDecorator('skill', {
                    rules: [
                        {
                        required: true,
                        message: 'Select skill',
                        },
                    ],
                    })(<Select 
                        mode="tags" 
                        style={{ width: '80%' }} 
                        tokenSeparators={[',']}
                        placeholder="Skill">
                        {selectSkill}
                    </Select>,
                )}
                </Form.Item>

              

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="" disabled={hasErrors(getFieldsError())}>
                    Contact now
                  </Button>
                </Form.Item>  

            </Form>


        )
    }
}

const WrapContactForm = (Form.create({ name: 'contact-modal' })(ContactForm));

export default WrapContactForm;