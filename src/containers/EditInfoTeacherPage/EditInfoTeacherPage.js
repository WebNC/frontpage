import React from 'react';
import { Form, Input, Button, Icon, Select, Avatar, Tabs, DatePicker} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux'
import {userActions} from '../../actions/user.actions';
import Header from '../../components/Header/Header';
import WrappedEditInfoTeacherForm from '../EditInfoTeacherForm/EditInfoTeacherForm'
import WrappedEditIntroForm from '../EditIntroForm/EditIntroForm'
import WrappedEditMajorSkillForm from '../EditMajorSkillForm/EditMajorSkillForm'

const { TabPane } = Tabs;

class EditInfoTeacherPage extends React.Component {

    componentDidMount() {
    }

    // handleEditInfoSubmit = e => {
    //   const {getFieldsValue} = this.props.form;
    //   e.preventDefault();
      
    //   const values = getFieldsValue();
      
    //   this.props.getDetail();
      
    //   this.setState({isFirstLoad: false})
    // }

  render() {
    const {user} = this.props;
    console.log(user);
    return (
      <div className="teacher-home-page">
        <Header username={user.username}/>
        <div class="cover-component">
            <Avatar size={130}/>
            <div class="info-component">
              <h3>{user.username}</h3>
              <h4>{user.major}</h4>
            </div>
            <div className="btns-component">
              <Button icon="edit" className="btn">Hủy thay đổi</Button>
              <Button icon="plus" className="btn">Thêm khóa học mới</Button>
            </div>
        </div>
        <div class="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
              <h3>Thông tin cá nhân</h3>
              <WrappedEditInfoTeacherForm/>
            </TabPane>
            <TabPane tab="Tự giới thiệu" key="2">
              <h3>Tự giới thiệu</h3>
              <WrappedEditIntroForm />
            </TabPane>
            <TabPane tab="Chuyên môn và kỹ năng" key="3">
              <h3>Chuyên môn và kỹ năng</h3>
              <WrappedEditMajorSkillForm />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    message: state.user.message,
    pending: state.user.pending,
    user: state.user.user,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getDetail: () => dispatch(userActions.getdetail()),
  logout: () => dispatch(userActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditInfoTeacherPage)