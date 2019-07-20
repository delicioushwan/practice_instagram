import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

export default hot(module)(class extends Component {
  render = () => (
    <div className="profile_button">
      <button type="button">팔로우</button>
    </div>
  );
});
