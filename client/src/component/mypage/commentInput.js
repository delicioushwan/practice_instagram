import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  state ={ commentInput: '' }

  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { post } = this.props;
    const createComment = () => {
      Axios.request({
        method: 'POST',
        url: 'http://localhost:4000/mypage/createComment',
        data: { comment: this.state.commentInput, post_id: post.id },
        withCredentials: true,
      }).then(result => this.updateMyPage({ posts: result.data }));
      this.setState({ commentInput: '' });
    };

    return (
      <input
        onKeyPress={e => e.key === 'Enter' && createComment()}
        onChange={e => this.setState({ commentInput: e.target.value })}
        value={this.state.commentInput}
        placeholder="Add a comment..."
      />
    );
  }
});
