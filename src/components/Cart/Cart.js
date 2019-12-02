import React from 'react';
import './Cart.scss'



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
            <div className="cart d-flex">
                <img src="http://placehold.it/1000" height="80" width="80" alt="avatar" className="avartar"/>
                <div>
                    infor
                </div>
                
            </div>        
        )
    }




}
export default Content;
