import React from 'react';
import './ContactModal.scss'
import { Modal} from 'react-bootstrap'
import{ connect } from 'react-redux';
import { Icon} from 'antd';
import 'antd/dist/antd.css';
import WrapContactForm from './ContactForm/ContactForm'
import {userActions} from '../../actions/user.actions'




class ContactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            isFirstLoad: true,
        }
    }

    componentDidMount = () =>{
     const {allSkill} = this.props.skills;
     const skills = [...allSkill.slice(0, allSkill.length)];
     this.setState({skills})
    }

   
    render() {
        const {handleCloseModal, open, loggedIn, isTeacher, userInfo, teacherInfo, getDetail} = this.props;
        // const skills = [{_id: '1', name: 'skill 1'}]

        const {skills} = this.state;
        const notification = <h6 
        > <Icon type="warning" className="mr-5" style={{color: 'red'}}/>Bạn phải đăng nhập trước khi liên hệ với giao viên nhé !</h6>

        return (
          <>
          <Modal show={open} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Thông tin hợp đồng</Modal.Title>
            </Modal.Header>
            {
              (loggedIn && !isTeacher) ?  <Modal.Body>Hãy điền đầy đủ thông tin đề giáo viên sắp xếp bạn nhé
              <WrapContactForm skills={skills} userInfo={userInfo}
               teacherInfo={teacherInfo}
               getDetail = {getDetail}
               handleCloseModal={handleCloseModal}/>
            </Modal.Body>
            :
            <Modal.Body>{notification} </Modal.Body>
            }
          </Modal>
        </>    
        )
    }




}



function mapStateToProps(state) {
  return {
    teacherInfo: state.teachers.teacherInfo,
    userInfo : state.user,
    loggedIn: state.user.loggedIn,
    isTeacher: state.user.isTeacher,
    skills : state.skill

  };
}
const mapDispatchToProps = (dispatch) => ({
  getDetail: () => dispatch(userActions.getDetail()),

});



export default connect(mapStateToProps, mapDispatchToProps)(ContactModal)
