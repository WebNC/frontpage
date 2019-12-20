import React from 'react'
import StarRatings from 'react-star-ratings';
import './Rating.scss'


class StarRating extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rating: 5,
            starRatedColor: "rgb(238, 147, 11)",
            starHoverColor: "rgb(238, 147, 11)",
            starDimension: "16px",
            starSpacing: "2px",
            numberOfStars: 5,
            name: 'rating'
        }
    }

    componentDidMount = () =>{
        const {rating} = this.props
        if(rating){
            this.setState({
                rating
            })
        }
    }

    render() {
        const { rating } = this.state;
        const {rated, textColor} = this.props;
        const style = textColor && {color: 'white'}
        
        return (
            <div className="d-flex rating">
                <StarRatings
                    rating={rating}
                    starRatedColor="#fcba03"
                    numberOfStars={5}
                    starDimension={20}
                    starHoverColor="#fcba03"
                    starSpacing = "2px"
                />
            </div>

        );
    }
}

export default StarRating;
