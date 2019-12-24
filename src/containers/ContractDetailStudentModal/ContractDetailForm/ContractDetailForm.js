import React from 'react';
import { Button, Form, InputNumber, Icon, Select, DatePicker} from 'antd'
import AddressInput from '../../../components/AddressInput/AddressInput'
import moment from 'moment'
import 'antd/dist/antd.css'
import { contractActions } from '../../../actions/contract.actions'
import { connect } from 'react-redux'


const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;
const { RangePicker } = DatePicker;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class ContractDetailForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            total: 0,
            hour: 1,
            data: null,
            disabled: false,
        }
    }

    componentDidMount() {
      // To disabled submit button at the beginning.
      const {form, contractDetail} = this.props;
      console.log(contractDetail.contract);
      
      const selectedSkill = [];
      contractDetail.contract.skill.forEach((element)=>{
        selectedSkill.push(element.id)
      })

      form.setFieldsValue({
        skill: selectedSkill,
        fromDate: [moment(contractDetail.contract.fromDate),moment(contractDetail.contract.toDate)],
        address: contractDetail.contract.address, 
        hour: contractDetail.contract.hour,
        });

      contractDetail.contract.status !== "Đang chờ" ? this.setState({disabled: true}) : this.setState({disabled: false});
      this.setState({total: contractDetail.contract.value});
    }

    handleSubmit = (e) =>{
      const {getFieldsValue} = this.props.form;
      const {contractDetail, editContract} = this.props;
      e.preventDefault();
      
      const values = getFieldsValue();
      editContract({
          id: contractDetail.contract._id,
          fromDate: values.fromDate[0],
          toDate: values.fromDate[1],
          hour: values.hour,
          skill: values.skill, 
          value: this.state.total, 
          address: values.address
      });
      this.setState({isFirstLoad: false})
    }

    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    }
      

    disabledDate = (current)=> {
        return current && current < moment().endOf('day');
    }

    disabledRangeTime = (_, type) => {
        if (type === 'start') {
          return {
            disabledHours: () => this.range(0, 60).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
          };
        }
        return {
          disabledHours: () => this.range(0, 60).splice(20, 4),
          disabledMinutes: () => this.range(0, 31),
          disabledSeconds: () => [55, 56],
        };
    }

    onChange = e =>{
      const { teacher } = this.props.contractDetail;
      
      if(parseInt(e)) {
        this.setState({
            total : e*teacher.price,
        })
      }
      else {
          this.setState({
              total : teacher.price,
          })
      }
    }


    render(){
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const {allSkill, errMessage, successMessage, pending} = this.props;

        const fromDateError = isFieldTouched('fromdate') && getFieldError('fromdate');
        const hourError = isFieldTouched('hour') && getFieldError('hour');
        const skillError = isFieldTouched('skill') && getFieldError('skill');
        const addressError = isFieldTouched('address') && getFieldError('address');
        const {total} = this.state;

        const selectSkill=[];
        allSkill.forEach(skill => {
          selectSkill.push(<Option key={ skill._id }>{skill.name}</Option>)
        });
        
        return(
          <Form onSubmit={this.handleSubmit} className="contract-detail-form">
            {successMessage && !this.state.isFirstLoad &&
              <Form.Item>
                <div className="success-message">{successMessage}</div>
              </Form.Item>
            }
            {errMessage && !this.state.isFirstLoad &&
              <Form.Item>
                <div className="error-message">{errMessage}</div>
              </Form.Item>
            }
            <Form.Item label="Thời gian dạy" validateStatus={fromDateError ? 'error' : ''} help={fromDateError || ''}>
              {getFieldDecorator('fromDate', {
                rules: [
                {
                  required: true,
                   message: 'Vui lòng chọn ngày học!',
                },
                ],
                })(
                  <RangePicker
                        disabledDate={this.disabledDate}
                        disabledTime={this.disabledRangeTime}
                        name="range" id="range"
                        onChange = {this.onChange}
                        showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        format={dateFormat}
                        style={{width: '100%'}}
                      />
                )}
            </Form.Item>
            <Form.Item label="Địa chỉ" validateStatus={addressError ? 'error' : ''} help={addressError || ''}>
              {getFieldDecorator('address', {
              rules: [
              {
                required: true,
                 message: 'Vui lòng nhập địa chỉ!',
              },
              ],
              })(<AddressInput />
                )}
            </Form.Item>
            <Form.Item label="Skill" validateStatus={skillError ? 'error': ''} help={skillError || ''}>
              {getFieldDecorator('skill', {
                rules: [
                  {
                    required: true,     
                    message: 'Vui lòng chọn kỹ năng bạn muốn học!',
                  },
                ],
              })(<Select 
                  mode="tags"
                  tokenSeparators={[',']}
                  placeholder="Skill">
                  {selectSkill}
                  </Select>,
                    )}
            </Form.Item>
            <Form.Item label="Tổng số giờ" validateStatus={hourError ? 'error' : ''} help={hourError || ''}>
              {getFieldDecorator('hour', {
                rules: [
                  {
                    required: true,
                    message: 'Enter number of studying hour',
                  },
                ],
                  })(<InputNumber
                    prefix={<Icon type="hourglass" 
                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                    style={{width: '100%'}}
                    formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.onChange}
                  />
              )}
            </Form.Item>
            <Form.Item>
              <p style={{fontSize: "16px", textAlign: "left"}}>{`Tổng tiền : ${total} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                disabled={hasErrors(getFieldsError())} 
                loading={pending}
                style={{width: "50%", marginLeft: "25%", marginTop: 20}}
                >
                Cập nhật hợp đồng
              </Button>
            </Form.Item>
          </Form>
        )
    }
}

function mapStateToProps(state) {
  return {
    allSkill: state.skill.allSkill,
    contractDetail: state.contracts.contractDetail,
    errMessage: state.contracts.errMessage,
    successMessage: state.contracts.successMessage,
    pending: state.contracts.pending,
  };
}
const mapDispatchToProps = dispatch => ({
  editContract: (data) => dispatch(contractActions.editContract(data)),
});

const WrappedContractDetailForm = (Form.create({ name: 'contract-detail-form' })(ContractDetailForm));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedContractDetailForm)