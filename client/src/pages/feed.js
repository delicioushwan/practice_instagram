import React, { Component } from 'react';
import Axios from 'axios';
import { hot } from 'react-hot-loader';
import '../style/feed.css';
import Head from '../component/feed/Head';
import Picture from '../component/feed/Picture';
import Like from '../component/feed/Like';
import Comment from '../component/feed/Comment';
import InputComment from '../component/feed/InputComment';


class Feed extends Component {
  state = { posts: [] };

  updateApp = state => this.props.App.setState(state)

  componentDidMount = () => {
    Axios.request({
      method: 'GET',
      url: 'http://localhost:4000/feed',
      withCredentials: true,
    })
      .then(res => this.setState({ posts: res.data.posts, user: res.data.user }))
      .catch(() => this.updateApp({ currentPage: 'Home' }));
  }

  render = () => {
    const { posts } = this.state;
    console.log('this.state.posts', this.state);
    return (
      <div className="feed">
        <div className="feed_container">
          <div>
            {posts.map((post, i) => (
              <div key={i} className="feed_post">
                <Head user={post.users} Feed={this} />
                <Picture pictures={post.pictures} Feed={this} />
                <Like post={post} Feed={this} />
                <Comment post={post} Feed={this} />
                <InputComment post={post} Feed={this} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(Feed);
