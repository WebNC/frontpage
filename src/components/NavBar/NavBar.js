import React from 'react';
import './NavBar.scss'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount = () =>{
        const {categories} = this.props
        this.setState({
            categories
        })
    }

    render() {
        const {categories} = this.state;
        const categoriesBar = categories.map((item, index) => {
            return(
                <li key={index}> {item}</li>
            )
        })
        return (
        <ul className="d-flex justify-content-center nav-bar ">{categoriesBar}</ul>
        )
    }




}
export default NavBar;
