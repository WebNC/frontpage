import React from 'react';
import { Form, Input, Button, Icon, Select, Typography, Tabs, Upload} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import moment from 'moment';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {history} from '../../helper';
import NavBar from '../../components/NavBar/NavBar';
import MyAvatar from '../../components/MyAvatar/MyAvatar';
import WrappedStudentInfoForm from './StudentInfoForm/StudentInfoForm';
import NotificationContract from '../../components/NotificationContract/NotificationContract';
import WrappedChangePassForm from '../../components/ChangePassForm/ChangePassForm';

const { TabPane } = Tabs;
const { Paragraph } = Typography;
const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class StudentInfoPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isEdit: false,
        activeKey: "1",
      };
    }
    componentDidMount() {
      const { getDetail } = this.props;
      getDetail();
    }

    handleEdit = e => {
      this.setState({isEdit: !this.state.isEdit, activeKey: "1"})
    }

    handleTabChange = activeKey => {
      this.setState({isEdit: false, activeKey: activeKey})
    }

  render() {
    const {user, changePass, errMessage, successMessage, pending} = this.props;
    const listContract = [];
    if(user.history !== null && user.history !== undefined ) {
      user.history.forEach(element => {
        listContract.push(<NotificationContract isTeacher={false} contractInfo={element}/>)
      });
    }
    return (
      <div className="student-info-page">
        <Header username={user.username}/>
        <NavBar/>
        <div class="cover-component">
            <div class="info-component">
              <MyAvatar imageUrl={user.url}/>
              <div className="name-component">
                <h3 className="username">{user.username}</h3>
              </div>
            </div>
            <div className="btns-component">
            {this.state.isEdit === false ? (
              <Button icon="edit" type="normal" className="btn" onClick = {this.handleEdit}>
                Cập nhật thông tin cá nhân
              </Button>
            ):(
              <Button icon="rollback" type="normal" className="btn" onClick = {this.handleEdit}>
                Trở về trang cá nhân
              </Button>
             )}
          </div>
        </div>
        <div class="content-component">
          <Tabs tabPosition="left" onChange={this.handleTabChange} activeKey={this.state.activeKey}>
            <TabPane tab="Thông tin cá nhân" key="1">
              <div className="basic-info-component">
                
                {this.state.isEdit === false ? (
                  <>
                    <h3 className="title">Thông tin cơ bản</h3>
                    <div className="item-info">
                      <h5 className="info-title">Địa chỉ:</h5>
                      <h5 className="item-content">
                        {user.address === undefined ? '' : `${user.address.address}, ${user.address.district}, Hồ Chí Minh` } 
                      </h5>
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Số điện thoại:</h5> 
                      <h5 className="item-content">
                        {user.phone}
                      </h5> 
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Ngày Sinh:</h5> 
                      <h5 className="item-content">
                        {user.birthday === undefined ? '' : moment(user.birthday).format('DD/MM/YYYY') }
                      </h5>
                    </div>
                    <div className="item-info">
                      <h5 className="info-title">Giới tính: </h5>
                      <h5 className="item-content">
                        {user.sex}
                      </h5>
                    </div>
                  </>
                ) :(
                  <> 
                    <h3 className="title">Cập nhật thông tin cá nhân</h3>
                    <WrappedStudentInfoForm />
                  </>
                )}
              </div>
            </TabPane>
            <TabPane tab="Danh sách hợp đồng" key="2">
              <div className="contract-history-component">
                <h3>Danh sách hợp đồng</h3>
                {listContract}
              </div>
            </TabPane>
            <TabPane tab="Đổi mật khẩu" key="3">
              <div className="contract-history-component">
                <h3>Đổi mật khẩu</h3>
                <WrappedChangePassForm 
                  userId={user._id} 
                  changePass={changePass} 
                  errMessage={errMessage} 
                  successMessage={successMessage}
                  pending={pending}
                />
              </div>
            </TabPane>
          </Tabs> 
        </div>
        <Footer />
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return { 
    errMessage: state.user.errMessage,
    successMessage: state.user.successMessage,
    pending: state.user.pending,
    user: state.user.user
  };
}

const mapDispatchToProps = (dispatch) => ({
  getDetail: () => dispatch(userActions.getDetail()),
  logout: () => dispatch(userActions.logout()),
  changePass: (data) => dispatch(userActions.changePass(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentInfoPage)