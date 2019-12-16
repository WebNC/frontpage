import React from 'react';
import './Cart.scss'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {skillActions} from '../../actions/skill.actions'
import{ connect } from 'react-redux';
import { handleContact } from '../../actions/teacher.actions';
import StarRating from '../../components/Rating/Rating'
import {Icon} from 'antd'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartInfor : this.props.cartInfor,
            skills: []
        }
    }

    componentDidMount = () =>{
       const {cartInfor, allSkill} = this.props;
       let {skills} = this.state;
        allSkill.forEach(item => {
            if(cartInfor.skill.indexOf(item._id) !== -1 && !item.isDeleted)
                skills.push(item.name)
        });
        this.setState({skills})
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            cartInfor: nextProps.cartInfor
        })
    }

    handleClickContact = () =>{
        const {handleCloseModal, handleContact} = this.props;
        const {cartInfor} = this.state
        
        handleCloseModal();
        handleContact(cartInfor);
    }

  

    render() {
        const {cartInfor, skills} = this.state;
        // console.log(cartInfor)
        return (
            <div className="cart d-flex">
                <img src="http://placehold.it/1000" height="80" width="80" alt="avatar" className="avartar"/>
                <div className="infor">
                    <Link to={`/teachers/${cartInfor._id}`} className="username mr-5">{`${cartInfor.username}`}</Link>
                    <div className="d-flex subjects">{ cartInfor.major ? `${cartInfor.major}    -    ${cartInfor.email}` : cartInfor.email}</div>

                    <div className="d-flex rating-ratio ">
                        <StarRating rating={cartInfor.rating}/>
                        <div className=" mr-5 ml-5"></div>
                         <div className="ratio ml-5 mt-1 d-flex " > 
                            <Icon type="trophy" theme="filled" style={{color: 'green',  fontSize: '20px'}} className="mr-2" />
                            <div className=""> {`Thành công : ${cartInfor.successRatio || 100}%`} </div>
                           </div>

                    </div>
                    <div className="d-flex justify-content-between status">
                         <div> <Icon type="crown" style={{ fontSize: '20px', color: '#08c' }}  className="mr-2"/>
                             { cartInfor ? cartInfor.sex : ' '}</div>
                         <div>
                         <Icon type="phone" style={{ fontSize: '20px', color: '#08c' }}  className="mr-2" />
                             {cartInfor ?  cartInfor.phone : ' '}</div>
                        <div>
                        <Icon type="home" style={{ fontSize: '20px', color: '#08c' }} className="mr-2" />
                            {( cartInfor.address && cartInfor.address.address && cartInfor.address.district) ? `${cartInfor.address.address} , ${cartInfor.address.district}` : ' '}</div>
                    </div>


                    <div className="d-flex languages">
                        {skills.map((item, index) => 
                            <div className="language" key={index}>{item}</div>
                        )}
                    </div>

                    <div className="description">{cartInfor.intro ||  ` Wellcome everyone to my class`}</div>
                    <Link to={`/teachers/${cartInfor._id}`}     >
                        <Button variant="success" size="sm" className="mr-3" onClick={this.handleClickContact} >Xem chi tiết</Button>
                    </Link>
                    <Button variant="primary"  size="sm"  onClick={this.handleClickContact}>Liên hệ ngay</Button>



                </div>
                
            </div>        
        )
    }




}


function mapStateToProps(state) {
    return {
      allSkill: state.skill.allSkill
    };
  }
  const mapDispatchToProps = (dispatch) => ({
    getAllSkill:() => dispatch(skillActions.getAll()),
    handleContact : (teacherInfo) => dispatch(handleContact(teacherInfo))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Content)
