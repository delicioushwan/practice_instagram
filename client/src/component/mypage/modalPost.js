import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

export default hot(module)(class extends Component {
  render = () => {
    console.log(this);
    return (
      <div className="modal_post">
        <div>
          <div>123</div>
          <div>123</div>
        </div>
      </div>

    );
  }
});
