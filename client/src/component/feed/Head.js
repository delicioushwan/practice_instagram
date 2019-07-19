import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

export default hot(module)(class extends Component {
  render = () => {
    const { user } = this.props;
    return (
      <div className="feed_head">
        <div style={{ background: user.main_image ? `url(${user.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: 'auto 10px auto 0', borderRadius: '50%' }} />
        <span>{user.name}</span>
      </div>
    );
  }
});
