import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  updateFeed = state => this.props.Feed.setState(state)

  render = () => {
    const { likes, id } = this.props.post;
    const { user } = this.props.Feed.state;
    const like = () => {
      Axios.request({
        method: 'POST',
        url: 'http://localhost:4000/mypage/like',
        data: { post_id: id, user },
        withCredentials: true,
      }).then(result => this.updateFeed({ posts: result.data.posts, user: result.data.user }));
    };
    const hitHeart = likes.findIndex(x => x.user_id === Number(user)) !== -1;
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
