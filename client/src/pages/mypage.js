import React, { Component } from 'react';
import Axios from 'axios';
import { hot } from 'react-hot-loader';
import '../style/mypage.css';
import ProfileBig from '../component/mypage/profileBig';

class MyPage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount = () => {
    const updateApp = state => this.props.App.setState(state);
    const getCookie = () => {
      const first = document.cookie.indexOf('user1=');
      const second = document.cookie.indexOf(';') - 6;
      const checkUser = document.cookie.substr(first + 6, second);
      return checkUser;
    };
    const user = getCookie();

    Axios.request({
      method: 'GET',
      url: 'http://localhost:4000/mypage',
      withCredentials: true,
      params: { user },
    })
      .then((res) => { this.setState({ posts: res.data.posts, user: res.data.user }); })
      .catch(() => updateApp({ currentPage: 'Home' }));
  }

  render = () => {
    const { posts, user } = this.state;

    return (
      <div className="mypage" onClick={console.log(posts, user)}>
        <div className="nav">
          nav
        </div>
        <div className="mypage_container">
          <div>
            <ProfileBig />
            <div className="posts">
                posts
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(MyPage);
