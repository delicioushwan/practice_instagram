import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Carousel from '../mypage/CarouselPictures';

export default hot(module)(class extends Component {

  render = () => {
    const { pictures } = this.props;
    console.log(pictures)
    return (
      <div className="feed_picture">
        <Carousel pictures={pictures} />
      </div>
    );
  }
});
