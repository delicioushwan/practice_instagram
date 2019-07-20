import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

export default hot(module)(class extends Component {
  updateFeed = state => this.props.Feed.setState(state);

  render = () => {
    const { post, updateApp } = this.props;
    return (
      <div className="feed_head">
        <div style={{ background: post.users.main_image ? `url(${post.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: 'auto 10px auto 0', borderRadius: '50%' }} />
        <span onClick={() => updateApp({ currentPage: 'MyPage', feed: post.user_id })}>{post.users.name}</span>
      </div>
    );
  }
});
