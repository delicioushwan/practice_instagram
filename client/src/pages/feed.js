import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import '../style/feed.css';
import Head from '../component/feed/Head';
import Picture from '../component/feed/Picture';
import Like from '../component/feed/Like';
import Comment from '../component/feed/Comment';
import InputComment from '../component/feed/InputComment';
import Modal from '../component/Modal';
import ModalPost from '../component/mypage/modalPost';
import * as actions from '../actions';


class Feed extends Component {
  state = { ...this.props.App.state, posts: [], show: false };

  updateApp = state => this.props.App.setState(state)

  componentDidMount = () => {
    this.props.test();
    Axios.request({
      method: 'GET',
      url: 'http://localhost:4000/feed',
      withCredentials: true,
    })
      .then(res => this.setState({ posts: res.data.posts, on: Number(res.data.on) }))
      .catch(() => this.updateApp({ currentPage: 'Home' }));
  }

  modalOpen = open => this.setState({ show: open });

  render = () => {
    const { show } = this.state;
    const { posts, bundle } = this.props.feed;
    return (
      <div className="feed">
        <div className="feed_container">
          <div>
            {posts.map((post, i) => (
              <div key={i} className="feed_post">
                <Head post={post} Feed={this} updateApp={this.updateApp} />
                <Picture pictures={post.pictures} Feed={this} />
                <Like post={post} Feed={this} />
                <Comment post={post} Feed={this} />
                <InputComment post={post} Feed={this} />
              </div>
            ))}
          </div>
        </div>
        <Modal show={show} close={() => this.modalOpen(false)}>
          {bundle && <ModalPost post={bundle} MyPage={this} updateApp={this.updateApp} />}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  test: () => dispatch(actions.requestFeed()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);
