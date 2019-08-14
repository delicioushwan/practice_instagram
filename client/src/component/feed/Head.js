import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Head extends Component {
  render = () => {
    const { post, updateApp } = this.props;

    const getUserId = () => {
      updateApp({ currentPage: 'MyPage' });
      this.props.getUserIdGet(post.user_id);
    };

    return (
      <div className="feed_head">
        <div style={{ background: post.users.main_image ? `url(${post.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: 'auto 10px auto 0', borderRadius: '50%' }} />
        <span onClick={() => getUserId()}>{post.users.name}</span>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getUserIdGet: id => dispatch(actions.mypageUserId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Head);
