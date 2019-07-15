import React, { Component } from 'react';
import Axios from 'axios';
import { hot } from 'react-hot-loader';
import '../style/mypage.css';
import ProfileBig from '../component/mypage/profileBig';
import Posts from '../component/mypage/posts';
import Modal from '../component/Modal';
import ModalPost from '../component/mypage/modalPost';
import CreatePost from '../component/mypage/CreatePost';

class MyPage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: {},
      show: false,
      onStage: 'createPost',
    };
  }

  componentDidMount = () => {
    const updateApp = state => this.props.App.setState(state);

    Axios.request({
      method: 'GET',
      url: 'http://localhost:4000/mypage',
      withCredentials: true,
    })
      .then(res => this.setState({ posts: res.data.posts, user: res.data.user }))
      .catch(() => updateApp({ currentPage: 'Home' }));
  }

  modalOpen = open => this.setState({ show: open });

  render = () => {
    console.log('mypage', this.state);
    const { posts, user, show, bundle } = this.state;

    return (
      <div className="mypage">
        <div className="nav">
          nav
        </div>
        <div className="mypage_container">
          <div>
            {user && <ProfileBig user={user} />}
            <Posts posts={posts} MyPage={this} />
          </div>
        </div>
        <Modal show={show} close={() => this.modalOpen(false)}>
          {this.state.onStage === 'bundle' ? bundle && <ModalPost post={bundle && bundle} MyPage={this} />
            : this.state.onStage === 'createPost' ? <CreatePost /> : null}
        </Modal>
      </div>
    );
  }
}

export default hot(module)(MyPage);
