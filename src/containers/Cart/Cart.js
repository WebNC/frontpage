import React from 'react';
import './Cart.scss'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {skillActions} from '../../actions/skill.actions'
import{ connect } from 'react-redux';
import { handleContact } from '../../actions/teacher.actions';
import StarRating from '../../components/Rating/Rating'
import { Avatar, Icon} from 'antd'

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

    handleClickContact = () =>{
        const {handleCloseModal, handleContact} = this.props;
        const {cartInfor} = this.state
        
        handleCloseModal();
        handleContact(cartInfor);
    }

    render() {
        const {cartInfor, skills} = this.state;
        return (
            <div className="cart d-flex">
                <Avatar src={cartInfor.url || './default-avatar.png'} size={120} className="avartar"/>
                <div className="infor">
                    <Link to={`/teachers/${cartInfor._id}`} className="username mr-5">{`${cartInfor.username}`}</Link>
                    <div className="d-flex subjects">
                        { cartInfor.major ? `${cartInfor.major}    -    ${cartInfor.email}` : cartInfor.email}
                    </div>
                    <h5 style={{textAlign: "left", marginTop: "0.5em", fontWeight: "bold"}}>{`${cartInfor.price}đ/h`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
                    <div className="d-flex justify-content-between status">
                        <StarRating rating={cartInfor.rating}/>
                        <p className="ratio ml-5 mt-1 d-flex" > 
                            {`${cartInfor.successRatio || 100}% thành công  (${cartInfor.numJob})`}
                        </p>
                        <p className="ratio ml-5 mt-1 d-flex " >
                            <Icon type="phone" style={{marginTop: "3px", marginRight: "5px"}}/>
                            {cartInfor ?  cartInfor.phone : ' '}
                        </p>
                        <p className="ratio ml-5 mt-1 d-flex " >
                            <Icon type="environment" style={{marginTop: "3px", marginRight: "5px"}}/> 
                            {( cartInfor.address && cartInfor.address.address && cartInfor.address.district) ? `${cartInfor.address.address} , ${cartInfor.address.district}` : ' '}
                        </p>
                    </div>

                    <div className="d-flex languages">
                        {skills.map((item, index) => 
                            <div className="language" key={index}>{item}</div>
                        )}
                    </div>

                    <div className="description">
                        {cartInfor.intro ||  `Chưa có bài tự giới thiệu`}
                    </div>
                    <Link to={`/teachers/${cartInfor._id}`}     >
                        <Button variant="success" className="mr-3"  size="sm" onClick={this.handleClickContact} >Xem chi tiết</Button>
                    </Link>
                    <Button variant="primary" type="primary" size="sm" onClick={this.handleClickContact}>
                        Liên hệ ngay
                    </Button>
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
