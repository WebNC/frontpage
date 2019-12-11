import React from 'react';
import './Cart.scss'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {skillActions} from '../../actions/skill.action'
import{ connect } from 'react-redux';

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

    render() {
        const {cartInfor, skills} = this.state;
        return (
            <div className="cart d-flex">
                <img src="http://placehold.it/1000" height="80" width="80" alt="avatar" className="avartar"/>
                <div className="infor">
                    <Link to={`/teachers/${cartInfor._id}`} className="username mr-5">{`${cartInfor.username}`}</Link>
                    <div className="d-flex subjects">{ cartInfor.major ? `${cartInfor.major}    -    ${cartInfor.email}` : cartInfor.email}</div>

                    <div className="d-flex justify-content-between status">
                         <div>{ cartInfor ? cartInfor.sex : ' '}</div>
                         <div>{cartInfor ?  cartInfor.phone : ' '}</div>
                        <div>{( cartInfor.address && cartInfor.address.address && cartInfor.address.district) ? `${cartInfor.address.address} , ${cartInfor.address.district}` : ' '}</div>
                    </div>


                    <div className="d-flex languages">
                        {skills.map((item, index) => 
                            <div className="language" key={index}>{item}</div>
                        )}
                    </div>

                    <div className="description">{cartInfor.intro ||  ` Wellcome everyone to my class`}</div>
                    <Link to={`/teachers/${cartInfor._id}`}     >
                    <Button variant="success">Expand Profile</Button>

                    </Link>


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
    getAllSkill:() => dispatch(skillActions.getAll())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Content)
