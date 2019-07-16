import React, { Component } from 'react';
import { hot } from 'react-hot-loader';


export default hot(module)(class extends Component {
  state = {
    picture: '',
  }

  render = () => {
    console.log(this.state);
    this.state.picture && console.log(this.state.picture.value);
    return (
      <div>
        <form action="http://localhost:4000/upload" method="post" encType="multipart/form-data">
          <input name="uploadImage" type="file" multiple onChange={e => this.setState({ picture: e.target })} />
          <input type="submit" />
        </form>
      </div>
    );
  }
});
