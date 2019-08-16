import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CommentInput extends Component {
  state ={ commentInput: '' }

  updateMyPage = state => this.props.MyPage.setState(state);

  render = () => {
    const { post } = this.props;
    const { currentPage } = this.props;
    const createComment = () => {
      this.props.createComment({
        comment: this.state.commentInput,
        post_id: post.id,
        currentPage,
        feed: post.userId,
      });
      this.setState({ commentInput: '' });
    };
    return (
      <input
        onKeyPress={e => e.key === 'Enter' && createComment()}
        onChange={e => this.setState({ commentInput: e.target.value })}
        value={this.state.commentInput}
        placeholder="Add a comment..."
      />
    );
  }
}

const mapPropstoState = state => state;

const mapDispatchToProps = dispatch => ({
  createComment: data => dispatch(actions.createComment(data)),
});

export default connect(
  mapPropstoState,
  mapDispatchToProps,
)(CommentInput);
