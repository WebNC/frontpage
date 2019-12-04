import React from 'react';
import './Cart.scss'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'


// const cartInfor = {
//     username: 'USER NAME',
//     subject: ['WordPress','BuddyPress','WooCommerce','Designer'],
//     hourlyRate: 75,
//     success: true,
//     totalJob: 130,
//     country: 'Viet Nam',
//     languages: ['C', 'C++', 'C#','Java', 'Python'],
//     description: 'Over the past 8 years, I have developed a wide range of websites using WordPress/HTML5/CSS3, PHP, MySQL and jQuery, including sites for startup companies, small businesses and individuals. I enjoy designing, building and maintaining clean, professional, and easy to navigate websites.',

// }



class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartInfor : this.props.cartInfor
        }
    }

    // componentDidMount = () =>{
    //    const {cartInfor} = this.props;
    //    this.setState({cartInfor});
    // }

    render() {
        const {cartInfor} = this.state;
        return (
            <div className="cart d-flex">
                <img src="http://placehold.it/1000" height="80" width="80" alt="avatar" className="avartar"/>
                <div className="infor">
                    <Link to="/" className="username">{cartInfor.username}</Link>
                    <div className="d-flex subjects">
                        {cartInfor.subject.map((item, index) => <div key={index} className="d-flex subject">{item}</div>)}

                    </div>
                    <div className="d-flex justify-content-between status">
                        <div><b>${cartInfor.hourlyRate}</b> /hr</div>
                        <div className="d-flex">
                            {cartInfor.success ? '100% JOB SUCCESS' : 'NOT COMPLETED'} ({cartInfor.totalJob} jobs)
                        </div>
                        <div>{cartInfor.country}</div>
                    </div>
                    <div className="d-flex languages">
                        {cartInfor.languages.map((item, index) => 
                            <div className="language" key={index}>{item}</div>
                        )}
                    </div>
                    <div className="description">{cartInfor.description}</div>
                    <Button variant="success">Expand Profile</Button>


                </div>
                
            </div>        
        )
    }




}
export default Content;
