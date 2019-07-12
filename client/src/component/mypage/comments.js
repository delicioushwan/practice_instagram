import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { comment } = this.props;
    const { user } = this.props.MyPage.state;
    const likeComment = () => {
      Axios.request({
        method: 'POST',
        url: 'http://localhost:4000/mypage/commentlike',
        data: { comment_id: comment.id },
        withCredentials: true,
      }).then(result => this.updateMyPage({ posts: result.data }));
    };
    const hitHeart = comment.likes.findIndex(x => x.user_id === user.id) !== -1;

    return (
      <div onClick={likeComment} style={{ display: 'flex', position: 'relative' }}>
        <div style={{ background: comment.users.main_image ? `url(${comment.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: 'auto 20px auto 0', borderRadius: '50%', flex: 'none' }} />
        <div style={{ margin: 'auto 0', marginRight: '15px' }}>
          <span>{comment.users.name}</span>
          <span>{comment.comment}</span>
          <div className={hitHeart ? 'heart_comment hit' : 'heart_comment'} />
        </div>
      </div>
    );
  }
});
