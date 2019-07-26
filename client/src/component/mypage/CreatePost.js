import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';


export default hot(module)(class extends Component {
  state = {
    picture: '',
    imgsUrl: [],
    content: '',
  }

  updateMyPage = state => this.props.MyPage.setState(state);

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    for (let i = 0; i < this.state.picture.length; i++) {
      data.append('uploadImage', this.state.picture[i]);
    }
    data.append('content', this.state.content);

    Axios.request({
      url: 'http://localhost:4000/mypage/createPost',
      method: 'POST',
      data,
      withCredentials: true,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((result) => {
        this.updateMyPage({ posts: result.data.posts, show: false });
        this.setState({ picture: '', imgsUrl: '' });
      });
  }

  pickPictures = (e) => {
    this.setState({ picture: e.target.files });
    const files = Array.from(e.target.files);
    const urls = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        urls.push(reader.result);
        this.setState({ imgsUrl: urls });
      };
    });
  }

  render = () => (
    <div className="create_post">
      <form onSubmit={this.state.imgsUrl.length !== 0 ? this.handleSubmit : null}>
        <input name="uploadImage" type="file" multiple onChange={this.pickPictures} value={this.state.Picture} />
        <div>
          {this.state.imgsUrl && this.state.imgsUrl.map((url, i) => (
            <div key={i}>
              <img src={url} alt="" />
            </div>
          ))}
        </div>
        <div>
          <input placeholder="문구 입력" onChange={(e) => { this.setState({ content: e.target.value }); }} />
        </div>
        <div style={{ margin: '0' }}>
          <div className={this.state.imgsUrl.length !== 0 ? '' : 'create_submit_err'}>사진은 필수입니다!!(최대 4장!!!!!)</div>
          <input className="create_post_submit" type="submit" />
        </div>
      </form>
    </div>
  );
});
