import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';
import Comment from './comments';
import CommentInput from './commentInput';
import CarouselPictures from './CarouselPictures';

export default hot(module)(class extends Component {
  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { post, updateApp } = this.props;
    const { posts, on, currentPage, feed } = this.props.MyPage.state;
    const userInfo = on;
    const data = { post_id: post.id, currentPage, feed };
    const like = () => {
      Axios.request({
        method: 'POST',
        url: 'http://cloninginstagram-env.qxdnpfc8ws.us-east-2.elasticbeanstalk.com/mypage/like',
        data,
        withCredentials: true,
      }).then(result => this.updateMyPage({ posts: result.data.posts }));
    };
    const getPost = posts[posts.findIndex(x => x.id === this.props.post.id)];
    const hitHeart = getPost.likes.findIndex(x => x.user_id === Number(userInfo)) !== -1;

    return (
      <div className="modal_post">
        <div>
          <CarouselPictures pictures={post.pictures} MyPage={this.props.MyPage} />
          <div className="right_container">
            <div>
              <div style={{ background: post.users.main_image ? `url(${post.users.main_image}) center center / cover no-repeat` : 'red', width: '32px', height: '32px', margin: 'auto 20px auto 0', borderRadius: '50%' }} />
              <span onClick={() => updateApp && updateApp({ currentPage: 'MyPage', feed: post.user_id })}>{post.users.name}</span>
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
                {getPost.comments.map((com, i) => <Comment key={i} comment={com} MyPage={this.props.MyPage} userInfo={userInfo} />)}
              </div>
            </div>
            <div>
              <span className={hitHeart ? 'hit_heart' : 'empty_heart'} onClick={like} />
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
});
