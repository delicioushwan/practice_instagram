import React, { Component } from 'react';
import { hot } from 'react-hot-loader';


export default hot(module)(class extends Component {
  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { main_image, about, follower_count, following_count, name, post_count } = this.props.user;
    return (
      <div className="mypage_top_container_B">
        <div>
          <div style={{ background: main_image ? `url(${main_image}) center center / cover no-repeat` : 'blue' }} />
        </div>
        <div className="profile_B">
          <div>
            <div>{name}</div>
            <div>
              <button type="button">프로필 편집</button>
              <button type="button" onClick={() => this.updateMyPage({ show: true, onStage: 'createPost' })}>게시글 쓰기</button>
            </div>
            <div style={{ display: 'none' }}>follow</div>
          </div>

          <div>
            <ul>
              <li>
                <span>
                  게시글
                  <span>{post_count}</span>
                </span>
              </li>
              <li>
                <span>
                  팔로우
                  <span>{following_count}</span>
                </span>
              </li>
              <li>
                <span>
                  팔로워
                  <span>{follower_count}</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            {about || 'aboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutabout'}
          </div>
        </div>
      </div>
    );
  }
});
