import React, { Component } from 'react';
import { hot } from 'react-hot-loader';


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
    const hoverFeature = (value) => {
      value && console.log(value.comments.length, value.likes.length)
    }

    return (
      <div className="posts">
        {postBundle().map((bundle, i) => (
          <div key={i}>
            <div><div><div onMouseOver={() => hoverFeature(bundle[0])}><img src={bundle[0].pictures[0].pic} alt="pics" /></div><div></div></div></div>
            <div><div><div onMouseOver={() => hoverFeature(bundle[1])}>{bundle[1] ? <img src={bundle[1].pictures[0].pic} alt="pics" /> : null}</div></div></div>
            <div><div><div onMouseOver={() => hoverFeature(bundle[2])}>{bundle[2] ? <img src={bundle[2].pictures[0].pic} alt="pics" /> : null}</div></div></div>
          </div>
        ))}
      </div>
    );
  }
});
