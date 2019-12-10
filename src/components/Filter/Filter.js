import React from 'react';
import './Filter.scss'



class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSort: false,    
        }
    }

    componentDidMount = () =>{
        const {data} = this.props;
        this.setState({data})
    }

    toggle = () => {
        this.setState(({
            openSort: !this.state.openSort
        }));
    }

    render() {
        const sort = "All";
        const {data} = this.state;
        return (
            <div className="drop-down  d-flex justify-content-between "  onClick={this.toggle}>
                    <p className="sort-by">Sort By:
                        <span className="sort-by-selected">{sort}</span>
                    </p>
                    <img src="/asserts/arrow.svg"
                        className="arrow " alt="arrow" />
                    {
                        this.state.openSort === true ? <div className="sort-by-items">
                            {data.map((item, index) => {
                                return (
                                    <p key={index}
                                        className="sort-by-item"
                                        name={item}
                                    > {item}</p>
                                )
                            }
                            )}
                        </div> : <></>
                    }
                </div>
     )
    }

}
export default Filter;
