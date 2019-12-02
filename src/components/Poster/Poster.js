import React from 'react';
import './Poster.scss'
import {Button} from 'react-bootstrap'

class Poster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount = () =>{
        
    }

    render() {
        const posterIMG = '/asserts/banner.png';
       
        return (
            <div className="container-fluid poster">
                <img className="posterIMG" src={posterIMG} alt="poster" />
                <div className="sub-infor">
                    <h1>Work hard for big dream, never give up </h1>
                    <h5>Wellcome to our class</h5>
                    <Button variant="success" className="get-started">Get Started </Button>
                </div>
               
                

        </div>
        )
    }




}
export default Poster;
