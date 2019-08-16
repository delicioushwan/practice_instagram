import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../style/style.css';


class Nav extends Component {
  movePage = () => {
    const { loggedIn } = this.props.feed;
    this.props.goToMypage(loggedIn);
    this.props.history.push(`/mypage/${loggedIn}`);
  };

  render() {
    return (
      <div className="nav">
        <div>
          <div onClick={() => this.props.history.push('/feed')} />
          <div onClick={this.movePage} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  goToMypage: loggedId => dispatch(actions.goToMypage(loggedId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
