import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './comments';
import CommentInput from './commentInput';
import CarouselPictures from './CarouselPictures';
import * as actions from '../../actions';

class modalPost extends Component {
  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { post, history, currentPage } = this.props;
    const { posts } = currentPage === 'MyPage' ? this.props.mypage : this.props.feed;
    const userInfo = this.props.feed.loggedIn;

    const getPost = posts[posts.findIndex(x => x.id === post.id)];
    const hitHeart = getPost.likes.findIndex(x => x.user_id === Number(userInfo)) !== -1;

    return (
      <div className="modal_post">
        <div>
          <CarouselPictures pictures={post.pictures} MyPage={this.props.MyPage} />
          <div className="right_container">
            <div>
              <div style={{ background: post.users.main_image ? `url(${post.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: 'auto 20px auto 0', borderRadius: '50%' }} />
              <span onClick={() => history.push(`/mypage/${post.users.user_account}`)}>{post.users.name}</span>
            </div>
            <div>
              <div>
                <div>
                  <div style={{ display: 'flex' }}>
                    <div style={{ background: getPost.users.main_image ? `url(${getPost.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: 'auto 20px auto 0', borderRadius: '50%', flex: 'none' }} />
                    <div style={{ margin: 'auto 0' }}>
                      <span>{getPost.users.name}</span>
                      <span>{getPost.content}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {getPost.comments.map((com, i) => <Comment key={i} comment={com} post={post} userInfo={userInfo} />)}
              </div>
            </div>
            <div>
              <span className={hitHeart ? 'hit_heart' : 'empty_heart'} onClick={() => this.props.like({ post_id: post.id, currentPage, feed: post.userId })} />
              <div>
                <span>좋아요</span>
                <span style={{ marginLeft: '5px' }}>{getPost.likes.length}</span>
                <span>개</span>
              </div>
            </div>
            <div>
              <CommentInput post={post} MyPage={this.props.MyPage} />
            </div>
          </div>
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
)(modalPost);
