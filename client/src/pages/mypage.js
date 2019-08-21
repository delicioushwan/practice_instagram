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
import Nav from './nav';


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

  componentDidMount = () => {
    this.props.test(this.props.match.params.id);
    this.props.currentpage('MyPage');
  }

  componentDidUpdate = (prev) => {
    if (prev.mypage.mypageUserId !== this.props.mypage.mypageUserId) {
      return this.props.test(this.props.mypageUserId);
    }
  }

  modalOpen = (open) => {
    this.setState({ show: open });
    this.props.clearBundle();
  }

  render = () => {
    const { show } = this.state;
    const { posts, pageUser, bundle } = this.props.mypage;
    return (
      <div className="mypage">
        <Nav history={this.props.history} />
        <div className="mypage_container">
          <div>
            {pageUser && <ProfileBig user={pageUser} MyPage={this} />}
            <Posts posts={posts} MyPage={this} />
          </div>
        </div>
        <Modal show={show} close={() => this.modalOpen(false)}>
          {this.state.onStage === 'bundle' ? show && bundle && <ModalPost post={bundle} history={this.props.history} />
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
  currentpage: page => dispatch(actions.currentpage(page)),
  clearBundle: () => dispatch(actions.clearBundle()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
