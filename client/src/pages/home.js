import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Signin from '../component/signin';

class Home extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Signin />
      </div>
    );
  }
}

export default hot(module)(Home);
