import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  updateFeed = state => this.props.Feed.setState(state)

  updateApp = state => this.props.Feed.props.App.setState(state)

  render = () => {
    const { comments, content, users } = this.props.post;
    const { post } = this.props;
    const { on, currentPage } = this.props.Feed.state;
    const set = () => {
      this.updateFeed({ bundle: post, show: true });
      this.updateApp({ feed: post.user_id });
    };

    const like = (id) => {
      Axios.request({
        method: 'POST',
        url: 'http://cloninginstagram-env.qxdnpfc8ws.us-east-2.elasticbeanstalk.com/mypage/commentlike',
        data: { comment_id: id, currentPage },
        withCredentials: true,
      }).then(result => this.updateFeed({ posts: result.data.posts }));
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
          const hitHeart = comment.likes.findIndex(x => x.user_id === Number(on)) !== -1;
          return (
            <div className="comment" key={i}>
              <span>{comment.users.name}</span>
              <span>{comment.comment}</span>
              <div className={hitHeart ? 'hit_heart' : 'empty_heart'} onClick={() => like(comment.id)} />
            </div>
          );
        })}
      </div>
    );
  }
});
