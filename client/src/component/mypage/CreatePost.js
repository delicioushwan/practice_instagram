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
    const image = document.querySelector('input[type="file"]').files[0];
    data.append('uploadImage', image);
    console.log(image)

    Axios.request({
      url: 'http://localhost:4000/upload',
      method: 'POST',
      body: data,
      withCredentials: true,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(res => console.log(res));
  }

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="uploadImage" type="file" multiple onChange={e => this.setState({ picture: e.target })} />
          <input type="submit" />
        </form>
      </div>
    );
  }
});
