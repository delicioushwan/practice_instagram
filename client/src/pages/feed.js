import React, { Component } from 'react';
import Axios from 'axios';
import { hot } from 'react-hot-loader';

class Feed extends Component {
  constructor() {
    super();
    this.state = {
    };
    Axios.request({
      method: 'GET',
      url: 'http://localhost:4000/feed',
      withCredentials: true,
    })
      .then(res => res)
      .catch(err => err);
  }

  updateApp = state => this.props.App.setState(state)

  render = () => <div onClick={() => this.updateApp({ currentPage: 'MyPage' })}>feed</div>
}

export default hot(module)(Feed);
