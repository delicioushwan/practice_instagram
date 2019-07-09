import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Post from './post';

export default hot(module)(class extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps) {
    return nextProps;
  }

  render = () => {
    const { posts } = this.state;
    const postBundle = () => {
      const result = [];
      let temp = [];
      posts.forEach((post, i) => {
        if (temp.length === 3) {
          result.push(temp);
          temp = [];
        }
        temp.push(post);
        if (i === posts.length - 1) {
          result.push(temp);
        }
      });
      console.log(result);
      return result;
    };

    return (
      <div className="posts">
        {postBundle().map((bundle, i) => (
          <div key={i}>
            <Post bundle={bundle[0]} />
            <Post bundle={bundle[1]} />
            <Post bundle={bundle[2]} />
          </div>
        ))}
      </div>
    );
  }
});
