import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

export default hot(module)(class extends Component {
  state={ num: 0 }

  componentWillUpdate = () => {
    if (this.state.num !== 0 && this.props.MyPage.state.show === false) {
      this.setState({ num: 0 });
    }
  }

  render = () => {
    const { pictures } = this.props;
    return (
      <div className="carousel_pics">
        {pictures && <img src={pictures[this.state.num].pic} alt="" />}
        <div className={this.state.num < pictures.length - 1 ? '' : 'carousel_arrow_none'} onClick={() => this.setState(prev => prev.num++)} />
        <div className={this.state.num === 0 ? 'carousel_arrow_none' : ''} onClick={() => this.setState(prev => prev.num--)} />
      </div>
    );
  }
});
