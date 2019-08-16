import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CommentInput extends Component {
  state ={ commentInput: '' }

  updateFeed = state => this.props.Feed.setState(state)

  render = () => {
    const { post } = this.props;
    const { currentPage } = this.props;
    const createComment = () => {
      this.props.createComment({
        comment: this.state.commentInput,
        post_id: post.id,
        currentPage,
      });
      this.setState({ commentInput: '' });
    };

    return (
      <div className="feed_input_comment">
        <input
          onKeyPress={e => e.key === 'Enter' && createComment()}
          onChange={e => this.setState({ commentInput: e.target.value })}
          value={this.state.commentInput}
          placeholder="Add a comment..."
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createComment: data => dispatch(actions.createComment(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CommentInput);
