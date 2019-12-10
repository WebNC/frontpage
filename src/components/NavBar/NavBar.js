import React from 'react';
import './NavBar.scss'
const categoryList = ['Web Dev', 'Mobile Dev', 'Design', 'Quality Control', 'Quality Assurance', 'Tester', 'Business Analyst',  'All Category']


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
        let {categories} = this.state;
        if(!categories)
            categories= categoryList
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
