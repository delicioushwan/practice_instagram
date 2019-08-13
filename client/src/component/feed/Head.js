import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Head extends Component {
  updateFeed = state => this.props.Feed.setState(state);

  render = () => {
    console.log('Head', this.props);

    const { post, updateApp } = this.props;
    return (
      <div className="feed_head">
        <div style={{ background: post.users.main_image ? `url(${post.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: 'auto 10px auto 0', borderRadius: '50%' }} />
        <span onClick={() => updateApp({ currentPage: 'MyPage', feed: post.user_id })}>{post.users.name}</span>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserIdGet: () => dispatch(actions.mypageUserId()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Head);
