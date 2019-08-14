import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Post extends Component {
  updateFeed = state => this.props.Feed.setState(state)

  render = () => {
    const { comments, content, users } = this.props.post;
    const { post } = this.props;
    const { currentPage } = this.props.Feed.state;
    const { loggedIn } = this.props.feed;
    const set = () => {
      this.props.set(post);
      this.updateFeed({ show: true });
    };

    return (
      <div className="feed_comment">
        <div>
          <span>{users.name}</span>
          <span>{content}</span>
          <div onClick={set}>
            <div>
              <span>댓글</span>
              <span>{comments.length}</span>
              <span>개 모두보기</span>
            </div>
          </div>
        </div>
        {comments.slice(0, 2).map((comment, i) => {
          const hitHeart = comment.likes.findIndex(x => x.user_id === Number(loggedIn)) !== -1;
          return (
            <div className="comment" key={i}>
              <span>{comment.users.name}</span>
              <span>{comment.comment}</span>
              <div className={hitHeart ? 'hit_heart' : 'empty_heart'} onClick={() => this.props.like({ comment_id: comment.id, currentPage })} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  set: bundle => dispatch(actions.getBundleFeed(bundle)),
  like: comment_id => dispatch(actions.likeOnComment(comment_id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
