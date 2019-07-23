import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import ProfileButton from './ProfileButton';
import FollowButton from './FollowButton';


export default hot(module)(class extends Component {
  state={}

  static getDerivedStateFromProps(nextProps) {
    return nextProps;
  }


  updateMyPage = state => this.props.MyPage.setState(state);

  changeStage = (stage) => {
    this.updateMyPage({ show: true, onStage: stage });
  }


  render = () => {
    const { main_image, about, follower_count, following_count, name } = this.props.user;
    const { posts, on } = this.props.MyPage.state;
    const { feed } = this.props.MyPage.props.App.state;
    const buttonSelector = () => {
      if (feed === undefined || feed === on) {
        return <ProfileButton MyPage={this.props.MyPage} />;
      }
      return <FollowButton />;
    };
    return (
      <div className="mypage_top_container_B">
        <div>
          <div style={{ background: main_image ? `url(${main_image}) center center / cover no-repeat` : 'blue' }} />
        </div>
        <div className="profile_B">
          <div>
            <div>{name}</div>
            {buttonSelector()}
            <div style={{ display: 'none' }}>follow</div>
          </div>

          <div>
            <ul>
              <li>
                <span>
                  게시글
                  <span>{posts.length}</span>
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
            {about || '무언가 쓰면 좋을텐데'}
          </div>
        </div>
      </div>
    );
  }
});
