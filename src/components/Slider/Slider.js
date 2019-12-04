import React from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import {Button} from 'react-bootstrap'
import './Slider.scss'


class Sliders extends React.Component{

    render(){
        const arr = [1,2,3,4,5];
        const posterIMG = '/asserts/banner.png';
        return (
            <Slider className="slider">
            {arr.map((item) => <div key={item}>
                 <img className="posterIMG" src={posterIMG} alt="poster" />
                <div className="sub-infor">
                    <h1>Work hard for big dream, never give up </h1>
                    <h5>Wellcome to our class</h5>
                    <Button variant="success" className="get-started">Get Started </Button>
                </div>
            </div>)}
            </Slider>
        )
    }
}

export default Sliders

