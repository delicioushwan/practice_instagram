import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Axios from 'axios';


export default hot(module)(class extends Component {
  state = {
    picture: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    for (let i = 0; i < this.state.picture.length; i++) {
      data.append('uploadImage', this.state.picture[i]);
    }
    Axios.request({
      url: 'http://localhost:4000/mypage/createPost',
      method: 'POST',
      data,
      withCredentials: true,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(res => console.log(res));
  }

  render = () => {
    console.log(this.state.picture);
    console.log(this.state.picture.length)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="uploadImage" type="file" multiple onChange={e => this.setState({ picture: e.target.files })} />
          <input type="submit" />
        </form>
      </div>
    );
  }
});
