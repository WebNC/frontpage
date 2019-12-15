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

const { TabPane } = Tabs;
const { Paragraph } = Typography;
const dateFormat = 'DD-MM-YYYY';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class StudentInfoPage extends React.Component {

    componentDidMount() {
      const { getDetail } = this.props;
      getDetail();

    }

    // handleSubmit = e => {
    //   const {getFieldsValue} = this.props.form;
    //   e.preventDefault();
      
    //   const values = getFieldsValue();
      
    //   this.props.getDetail();
      
    //   this.setState({isFirstLoad: false})
    // }

  render() {
    var {user} = this.props;

    return (
      <div className="student-home-page">
        <Header username={user.username}/>
        <NavBar/>
        <div class="cover-component">
            <div class="info-component">
              <MyAvatar imageUrl={user.url}/>
              <div className="name-component">
                <h3 className="username">{user.username}</h3>
              </div>
            </div>
        </div>
        <div class="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
              <div className="basic-info-component">
                <h3 className="title">Thông tin cơ bản</h3>
                <WrappedStudentInfoForm />
              </div>
            </TabPane>
            <TabPane tab="Yêu cầu từ người học" key="2">
              <div className="requirement-component">
                Hợp đồng hiện có
              </div>
            </TabPane>
            <TabPane tab="Lịch sử" key="3">
              <div className="history-component">
                Lịch sử 
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
    message: state.user.message,
    pending: state.user.pending,
    user: state.user.user
  };
}

const mapDispatchToProps = (dispatch) => ({
  getDetail: () => dispatch(userActions.getDetail()),
  logout: () => dispatch(userActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentInfoPage)