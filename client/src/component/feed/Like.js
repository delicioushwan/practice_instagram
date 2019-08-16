import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Like extends Component {
  updateFeed = state => this.props.Feed.setState(state)

  render = () => {
    const { likes, id } = this.props.post;
    const { currentPage } = this.props;
    const { loggedIn } = this.props.feed;

    const hitHeart = likes.findIndex(x => x.user_id === Number(loggedIn)) !== -1;
    return (
      <div className="feed_like">
        <div className={hitHeart ? 'hit_heart' : 'empty_heart'} onClick={() => this.props.like({ post_id: id, currentPage })} />
        <div>
          <span>좋아요</span>
          <span>{likes.length}</span>
          <span>개</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  like: data => dispatch(actions.likeOnMypage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Like);
