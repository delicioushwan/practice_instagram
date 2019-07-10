import React, { Component } from 'react';
import Axios from 'axios';
import { hot } from 'react-hot-loader';
import '../style/mypage.css';
import ProfileBig from '../component/mypage/profileBig';
import Posts from '../component/mypage/posts';
import Modal from '../component/Modal';
import ModalPost from '../component/mypage/modalPost';

class MyPage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: {},
      show: true,
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

  modalOpen = open => this.setState({ show: open });

  render = () => {
    const { posts, user } = this.state;

    return (
      <div className="mypage">
        <div className="nav">
          nav
        </div>
        <div className="mypage_container">
          <div>
            <ProfileBig user={user} />
            <Posts posts={posts} />
          </div>
        </div>
        <Modal show={this.state.show} close={() => this.modalOpen(false)}>
          <ModalPost />
        </Modal>
      </div>
    );
  }
}

export default hot(module)(MyPage);
