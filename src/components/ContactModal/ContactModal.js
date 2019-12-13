import React from 'react';
import './ContactModal.scss'
import { Modal} from 'react-bootstrap'
import{ connect } from 'react-redux';
import WrapContactForm from './ContactForm/ContactForm'




class ContactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teacherInfo : {},
            skills: [],
            isFirstLoad: true,
        }
    }

    componentDidMount = () =>{
      const {teacherInfo} = this.props
      this.setState({teacherInfo})
    }

    handleContact = () =>{

    }

    

    render() {
        const {handleCloseModal, open} = this.props;
        const {teacherInfo} = this.state

        return (
          <>
          <Modal show={open} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Contact to teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please fill out all information to contact successfully
              <WrapContactForm skills={teacherInfo.skill}/>

            </Modal.Body>
          </Modal>
        </>    
        )
    }




}



function mapStateToProps(state) {
  return {
    teacherInfo: state.teachers.teacherInfo,
  };
}
// const mapDispatchToProps = (dispatch) => ({
//   getAllSkill:() => dispatch(skillActions.getAll()),
//   handleContact : (teacherInfo) => dispatch(handleContact(teacherInfo))
// });



export default connect(mapStateToProps, null)(ContactModal)
