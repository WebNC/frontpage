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
     const skills = [...allSkill.slice(0, allSkill.length-1)];
     this.setState({skills})
    //  console.log(skills)
    //  console.log(allSkill)
    }

   
    render() {
        const {handleCloseModal, open, loggedIn, isTeacher, userInfo, teacherInfo, getDetail} = this.props;
        // const skills = [{_id: '1', name: 'skill 1'}]

        const {skills} = this.state;
        const notification = <h6 
        > <Icon type="warning" className="mr-5" style={{color: 'red'}}/>You must login first to contact with teacher !</h6>

        return (
          <>
          <Modal show={open} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Contact to teacher</Modal.Title>
            </Modal.Header>
            {
              (loggedIn && !isTeacher) ?  <Modal.Body>Please fill out all information to contact successfully
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
