import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { comment, userInfo } = this.props;
    const { currentPage, feed } = this.props.MyPage.state;
    const data = { comment_id: comment.id, currentPage, feed };
    const likeComment = () => {
      Axios.request({
        method: 'POST',
        url: 'http://cloninginstagram-env.qxdnpfc8ws.us-east-2.elasticbeanstalk.com/mypage/commentlike',
        data,
        withCredentials: true,
      }).then(result => this.updateMyPage({ posts: result.data.posts }));
    };
    const hitHeart = comment.likes.findIndex(x => x.user_id === Number(userInfo)) !== -1;

    return (
      <div>
        <div style={{ display: 'flex', position: 'relative' }}>
          <div style={{ background: comment.users.main_image ? `url(${comment.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: '0 20px auto 0', borderRadius: '50%', flex: 'none' }} />
          <div style={{ margin: 'auto 0', marginRight: '15px' }}>
            <span>{comment.users.name}</span>
            <span>{comment.comment}</span>
            <div className={hitHeart ? 'heart_comment hit' : 'heart_comment'} onClick={likeComment} />
          </div>
        </div>
        <div style={{ marginLeft: '52px' }}>
          <span>좋아요</span>
          <span style={{ marginLeft: '5px' }}>{comment.likes.length}</span>
          <span>개</span>
        </div>
      </div>
    );
  }
});
