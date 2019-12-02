import React from 'react';
import Filter from '../Filter/Filter'
import Cart from '../Cart/Cart'
import './Content.scss'

const countries = ['All', 'Item1','Item2','Item3', 'Item4'];
const hourRate = ['All', '10$-20$','20$-30$','> 30$'];
const sort = ['All', 'Low to high','High to low'];


class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () =>{
       
    }

    render() {
      
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
                <Cart/>
            </div>        
        )
    }




}
export default Content;
