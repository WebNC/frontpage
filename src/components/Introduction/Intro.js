import React from 'react';
import './Intro.scss';

const feature =  {
        name: 'Post a job',
        description : 'Tell us about your project. Upwork connects you with top talent around the world, or near you.'
    }


class Intro extends React.Component {
  
  render() {
      const arr = [1,2,3,4];
    return (
      <div className="introduction">
      <h2 className="intro-title">How it work</h2>
      <div className="features d-flex justify-content-between">
          {
              arr.map((item, index) => <div className="feature" key={index}>
                  <img src="http://placehold.it/1000" height="80" width="80" alt="img" />
                 <h4>{feature.name}</h4>
                 <p>{feature.description}</p>
              </div>)
          }
      </div>
      </div> 
    );
  }
}

export default Intro;