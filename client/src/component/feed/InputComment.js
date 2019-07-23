import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  state ={ commentInput: '' }

  updateFeed = state => this.props.Feed.setState(state)

  render = () => {
    const { post } = this.props;
    const { currentPage } = this.props.Feed.state;
    const data = { comment: this.state.commentInput, post_id: post.id, currentPage };
    const createComment = () => {
      Axios.request({
        method: 'POST',
        url: 'http://localhost:4000/mypage/createComment',
        data,
        withCredentials: true,
      }).then(result => this.updateFeed({ posts: result.data.posts }));
      this.setState({ commentInput: '' });
    };

    return (
      <div className="feed_input_comment">
        <input
          onKeyPress={e => e.key === 'Enter' && createComment()}
          onChange={e => this.setState({ commentInput: e.target.value })}
          value={this.state.commentInput}
          placeholder="Add a comment..."
        />
      </div>
    );
  }
});
