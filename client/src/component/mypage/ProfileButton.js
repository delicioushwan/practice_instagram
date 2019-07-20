import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

export default hot(module)(class extends Component {
  updateMyPage = state => this.props.MyPage.setState(state)

  changeStage = (stage) => {
    this.updateMyPage({ show: true, onStage: stage });
  }

  render = () => (
    <div className="follow_button">
      <button type="button" onClick={() => this.changeStage('edit')}>프로필 편집</button>
      <button type="button" onClick={() => this.changeStage('createPost')}>게시글 쓰기</button>
    </div>
  );
});
