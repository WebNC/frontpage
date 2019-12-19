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

    changeRating = (newRating) => {
        this.setState({
            rating: newRating
        });
    }


    render() {
        const { rating, starHoverColor, starRatedColor, starDimension, starSpacing, numberOfStars, name } = this.state;
        const {rated, textColor} = this.props;
        const style = textColor && {color: 'white'}
        
        return (
            <div className="d-flex rating">
                <p className="number-of-review mr-1 p-1" style={style}>{`${rating.toFixed(1)}`}</p>
                <StarRatings
                    rating={rating}
                    starRatedColor={starRatedColor}
                    starHoverColor={starHoverColor}
                    starDimension={starDimension}
                    starSpacing={starSpacing}
                    changeRating={!rated && this.changeRating}
                    numberOfStars={numberOfStars}
                    name={name}

                />
            </div>

        );
    }
}

export default StarRating;
