import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileButton from './ProfileButton';
import FollowButton from './FollowButton';


class ProfileBig extends Component {
  updateMyPage = state => this.props.MyPage.setState(state);

  changeStage = (stage) => {
    this.updateMyPage({ show: true, onStage: stage });
  }


  render = () => {
    const { main_image, about, name } = this.props.user;
    const { posts, followers, followings, pageUser } = this.props.mypage;
    const { loggedIn } = this.props.feed;
    const buttonSelector = () => {
      if (pageUser.id === Number(loggedIn)) {
        return <ProfileButton MyPage={this.props.MyPage} />;
      }
      return <FollowButton MyPage={this.props.MyPage} />;
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
                  <span>{followings && followings.length}</span>
                </span>
              </li>
              <li>
                <span>
                  팔로워
                  <span>{followers && followers.length}</span>
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
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null,
)(ProfileBig);
