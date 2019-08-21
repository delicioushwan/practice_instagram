import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class CreatePost extends Component {
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

    this.props.createPost({ data });
    this.updateMyPage({ show: false });
    this.setState({ picture: '', imgsUrl: '' });
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
}

const mapDispatchToProps = dispatch => ({
  createPost: data => dispatch(actions.createPost(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreatePost);
