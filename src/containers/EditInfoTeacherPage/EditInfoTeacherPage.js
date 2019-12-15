import React from 'react';
import { Button, Avatar, Tabs} from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import{ connect } from 'react-redux'
import {userActions} from '../../actions/user.actions';
import Header from '../../components/Header/Header';
import WrappedEditInfoTeacherForm from './EditInfoTeacherForm/EditInfoTeacherForm'
import WrappedEditIntroTeacherForm from './EditIntroForm/EditIntroForm'
import WrappedEditMajorSkillForm from './EditMajorSkillForm/EditMajorSkillForm'
import MyAvatar from '../../components/MyAvatar/MyAvatar'
import {history} from '../../helper'

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
    const {user, logout} = this.props;
    console.log(user);
    return (
      <div className="edit-teacher-page">
        <Header username={user.username}/>
        <div class="cover-component">
          <div className="info-component">
            <MyAvatar imageUrl={user.url}/>
            <div class="name-component">
              <h3 className="username">{user.username}</h3>
              <h4>{user.major}</h4>
            </div>
          </div>
          <div className="btns-component">
            <Button icon="rollback" type="normal" className="btn" onClick = {() => history.push('/teacher-home')}>Trở về trang chủ</Button>
            <Button icon="plus" type="normal" className="btn">Thêm khóa học mới</Button>
          </div>
        </div>
        <div class="content-component">
          <Tabs tabPosition="left">
            <TabPane tab="Thông tin cá nhân" key="1">
              <h3 className="title">Thông tin cá nhân</h3>
              <WrappedEditInfoTeacherForm/>
            </TabPane>
            <TabPane tab="Tự giới thiệu" key="2">
              <h3 className="title">Tự giới thiệu</h3>
              <WrappedEditIntroTeacherForm />
            </TabPane>
            <TabPane tab="Chuyên môn và kỹ năng" key="3">
              <h3 className="title">Chuyên môn và kỹ năng</h3>
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