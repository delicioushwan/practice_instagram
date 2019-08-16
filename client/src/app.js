import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from './pages/home';
import Feed from './pages/feed';
import MyPage from './pages/mypage';
import * as actions from './actions';
import './style/style.css';

class App extends Component {
  state={
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/feed" render={props => <Feed {...props} App={this} />} />
        <Route
          path="/mypage/:id"
          render={props => <MyPage {...props} App={this} />}
        />
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
)(App);
