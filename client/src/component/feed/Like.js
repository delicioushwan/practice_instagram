import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  updateFeed = state => this.props.Feed.setState(state)

  render = () => {
    const { likes, id } = this.props.post;
    const { on, currentPage } = this.props.Feed.state;
    const data = { post_id: id, currentPage };
    const like = () => {
      Axios.request({
        method: 'POST',
        url: 'http://cloninginstagram-env.qxdnpfc8ws.us-east-2.elasticbeanstalk.com/mypage/like',
        data,
        withCredentials: true,
      }).then(result => this.updateFeed({ posts: result.data.posts, on: Number(result.data.on) }));
    };
    const hitHeart = likes.findIndex(x => x.user_id === Number(on)) !== -1;
    return (
      <div className="feed_like">
        <div className={hitHeart ? 'hit_heart' : 'empty_heart'} onClick={like} />
        <div>
          <span>좋아요</span>
          <span>{likes.length}</span>
          <span>개</span>
        </div>
      </div>
    );
  }
});
