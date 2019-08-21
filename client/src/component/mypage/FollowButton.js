import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
)(class extends Component {
  render = () => {
    const { followers } = this.props.mypage;
    const { loggedIn } = this.props.feed;
    const data = { on: loggedIn };
    const follow = () => {
      Axios.request({
        method: 'POST',
        url: 'http://localhost:4000/mypage/Follow',
        data,
        withCredentials: true,
      }).then(result => this.setState({ followers: result.data.followers, followings: result.data.followings }));
    };
    const checkFollowing = followers !== undefined && followers.findIndex(follower => follower.follower_id === loggedIn) !== -1;
    return (
      <div>
        <button className={checkFollowing ? ' follow_button' : ''} type="button" onClick={follow}>팔로우</button>
      </div>
    );
  };
});
