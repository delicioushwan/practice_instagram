import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';

export default hot(module)(class extends Component {
  state={ input: '' }

  update = state => this.props.MyPage.props.App.setState(state);

  updateMyPage = state => this.props.MyPage.setState(state);


  render = () => {
    const inputHandler = e => this.setState({ input: e.target.value });
    const inputPic = e => this.setState({ inputPic: e.target.files[0] });
    const logOut = () => {
      Axios.get('http://localhost:4000/home/logOut', { withCredentials: true })
        .then(() => this.update({ user: '', currentPage: 'Home' }));
    };

    const editSomething = (url) => {
      const { input } = this.state;
      Axios.request({
        url: `http://localhost:4000/Mypage/${url}`,
        method: 'POST',
        data: { input },
        withCredentials: true,
      })
        .then((result) => {
          this.setState({ input: '' });
          this.updateMypage({ show: false, user: result.data });
        });
    };

    const editPic = () => {
      const data = new FormData();
      data.append('main_image', this.state.inputPic);

      Axios.request({
        url: 'http://localhost:4000/mypage/editMainPic',
        method: 'POST',
        data,
        withCredentials: true,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(result => this.updateMyPage({ user: result.data, show: false }));
    };
    return (
      <div className="edit_profile">
        <div className={this.state.on !== 'name' ? '' : 'none'} onClick={() => this.setState({ input: '', on: 'name' })}>이름변경</div>
        <div className={this.state.on === 'name' ? '' : 'none'}>
          <input
            onKeyPress={e => e.key === 'Enter' && editSomething('editName')}
            onChange={inputHandler}
            value={this.state.input}
          />
        </div>
        <div className={this.state.on !== 'about' ? '' : 'none'} onClick={() => this.setState({ input: '', on: 'about' })}>about변경</div>
        <div className={this.state.on === 'about' ? '' : 'none'}>
          <input
            onKeyPress={e => e.key === 'Enter' && editSomething('editAbout')}
            onChange={inputHandler}
            value={this.state.input}
          />
        </div>
        <div className={this.state.on !== 'pic' ? '' : 'none'} onClick={() => this.setState({ input: '', on: 'pic' })}>내 사진 변경</div>
        <div className={this.state.on === 'pic' ? '' : 'none'}>
          <input type="file" onChange={inputPic} />
          <input type="submit" onClick={editPic} />
        </div>
        <div onClick={logOut}>로그아웃</div>
      </div>
    );
  }
});
