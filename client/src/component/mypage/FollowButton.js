import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  updateMyPage = state => this.props.MyPage.setState(state);


  render = () => {
    const { feed, on, followers } = this.props.MyPage.state;
    const data = { feed, on };
    const follow = () => {
      Axios.request({
        method: 'POST',
        url: 'http://localhost:4000/mypage/Follow',
        data,
        withCredentials: true,
      }).then(result => this.updateMyPage({ followers: result.data.followers, followings: result.data.followings }));
    };
    const checkFollowing = followers !== undefined && followers.findIndex(follower => follower.follower_id === on) !== -1;
    return (
      <div>
        <button className={checkFollowing ? ' follow_button' : ''} type="button" onClick={follow}>팔로우</button>
      </div>
    );
  };
});
