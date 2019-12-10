import React from 'react';
import Filter from '../../components/Filter/Filter'
import Cart from '../Cart/Cart'
import {getAllUserTeacher, getNumberUserTeacher} from '../../actions/teacher.actions'
import './Content.scss'

const countries = ['All', 'Item1','Item2','Item3', 'Item4'];
const hourRate = ['All', '10$-20$','20$-30$','> 30$'];
const sort = ['All', 'Low to high','High to low'];

const cartInfor = {
    username: 'USER NAME',
    subject: ['WordPress','BuddyPress','WooCommerce','Designer'],
    hourlyRate: 75,
    success: true,
    totalJob: 130,
    country: 'Viet Nam',
    languages: ['C', 'C++', 'C#','Java', 'Python'],
    description: 'Over the past 8 years, I have developed a wide range of websites using WordPress/HTML5/CSS3, PHP, MySQL and jQuery, including sites for startup companies, small businesses and individuals. I enjoy designing, building and maintaining clean, professional, and easy to navigate websites.',
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            amount: 0, 
            page : 0
        }
    }

    componentDidMount = () =>{
        const {page} = this.state;
       getAllUserTeacher(page).then(res=>{
           this.setState({
               teachers: res.message
           })
       })
       getNumberUserTeacher().then(res=>{
           this.setState({
               amount: res.message
           })
       })

    }

    render() {
        const {teachers} = this.state;
      
        return (
            <div className="content">
                <div className="d-flex filter-banner">
                    <h6 className="filter">Filter</h6>
                    <Filter data={countries} />
                    <Filter data={hourRate} />

                    <div className="ml-auto d-flex">
                        <h6>Sort By : </h6>
                        <Filter data={sort} />

                    </div>
                </div>
                {
                    teachers.map((item, index) => 
                        <Cart cartInfor={item} key={index}/>
                    )
                }
               
            </div>        
        )
    }




}
export default Content;
