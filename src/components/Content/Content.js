import React from 'react';
import Filter from '../Filter/Filter'
import Cart from '../Cart/Cart'
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
        }
    }

    componentDidMount = () =>{
       
    }

    render() {
        const arr = [1,2,3,4,5];
      
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
                    arr.map(item => 
                        <Cart cartInfor={cartInfor} key={item}/>
                    )
                }
               
            </div>        
        )
    }




}
export default Content;
