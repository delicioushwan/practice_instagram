import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Comment extends Component {
  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { comment, userInfo } = this.props;
    const { currentPage } = this.props.MyPage.state;
    const hitHeart = comment.likes.findIndex(x => x.user_id === Number(userInfo)) !== -1;

    return (
      <div>
        <div style={{ display: 'flex', position: 'relative' }}>
          <div style={{ background: comment.users.main_image ? `url(${comment.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: '0 20px auto 0', borderRadius: '50%', flex: 'none' }} />
          <div style={{ margin: 'auto 0', marginRight: '15px' }}>
            <span>{comment.users.name}</span>
            <span>{comment.comment}</span>
            <div className={hitHeart ? 'heart_comment hit' : 'heart_comment'} onClick={() => this.props.like({ comment_id: comment.id, currentPage })} />
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
}


const mapDispatchToProps = dispatch => ({
  like: comment_id => dispatch(actions.likeOnComment(comment_id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Comment);
