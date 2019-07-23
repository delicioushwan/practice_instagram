import React, { Component } from 'react';
import Axios from 'axios';
import { hot } from 'react-hot-loader';
import '../style/mypage.css';
import ProfileBig from '../component/mypage/profileBig';
import Posts from '../component/mypage/posts';
import Modal from '../component/Modal';
import ModalPost from '../component/mypage/modalPost';
import CreatePost from '../component/mypage/CreatePost';
import EditProfile from '../component/mypage/EditProfile';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.App.state,
      posts: [],
      user: {},
      show: false,
      onStage: '',
    };
  }

  updateApp = state => this.props.App.setState(state);

  componentDidMount = () => {
    const { feed } = this.props.App.state;
    Axios.request({
      method: 'GET',
      url: 'http://localhost:4000/mypage',
      params: { feed },
      withCredentials: true,
    })
      .then(res => this.setState({
        posts: res.data.posts,
        user: res.data.user,
        on: Number(res.data.on),
        followers: res.data.followers,
        followings: res.data.followings,
      }))
      .catch(() => this.updateApp({ currentPage: 'Home' }));
  }

  modalOpen = open => this.setState({ show: open });

  render = () => {
    const { posts, user, show, bundle } = this.state;
    return (
      <div className="mypage">
        <div className="mypage_container">
          <div>
            {user && <ProfileBig user={user} MyPage={this} />}
            <Posts posts={posts} MyPage={this} />
          </div>
        </div>
        <Modal show={show} close={() => this.modalOpen(false)}>
          {this.state.onStage === 'bundle' ? bundle && <ModalPost post={bundle} MyPage={this} />
            : this.state.onStage === 'createPost' ? <CreatePost MyPage={this} />
              : this.state.onStage === 'edit' ? <EditProfile MyPage={this} /> : null}
        </Modal>
      </div>
    );
  }
}

export default hot(module)(MyPage);
