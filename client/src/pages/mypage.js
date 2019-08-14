import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/mypage.css';
import ProfileBig from '../component/mypage/profileBig';
import Posts from '../component/mypage/posts';
import Modal from '../component/Modal';
import ModalPost from '../component/mypage/modalPost';
import CreatePost from '../component/mypage/CreatePost';
import EditProfile from '../component/mypage/EditProfile';
import * as actions from '../actions';


class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.App.state,
      posts: [],
      user: {},
      show: false,
      onStage: '',
    };
  }

  updateApp = state => this.props.App.setState(state);

  componentDidMount = () => {
    this.props.test(this.props.mypage.mypageUserId);
    this.updateApp({ nav: null });
  }

  componentDidUpdate = (prev) => {
    if (prev.mypage.mypageUserId !== this.props.mypage.mypageUserId) {
      return this.props.test(this.props.mypageUserId);
    }
  }

  modalOpen = open => this.setState({ show: open });

  render = () => {
    const { show } = this.state;
    const { posts, pageUser, bundle } = this.props.mypage;
    return (
      <div className="mypage">
        <div className="mypage_container">
          <div>
            {pageUser && <ProfileBig user={pageUser} MyPage={this} />}
            <Posts posts={posts} MyPage={this} />
          </div>
        </div>
        <Modal show={show} close={() => this.modalOpen(false)}>
          {this.state.onStage === 'bundle' ? bundle && <ModalPost post={bundle} MyPage={this} />
            : this.state.onStage === 'createPost' ? <CreatePost MyPage={this} />
              : this.state.onStage === 'edit' ? <EditProfile MyPage={this} /> : null}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  test: userId => dispatch(actions.requestMypage(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
