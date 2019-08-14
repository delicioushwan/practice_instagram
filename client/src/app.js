import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Home from './pages/home';
import Feed from './pages/feed';
import MyPage from './pages/mypage';
import * as actions from './actions';
import './style/style.css';

class App extends Component {
  state={
    currentPage: 'Home',
  }

  movePage = () => {
    const { loggedIn } = this.props.feed;
    this.props.goToMypage(loggedIn);
    this.setState({ currentPage: 'MyPage' });
  };

  componentDidMount = () => {
    if (document.cookie.indexOf('user=') !== -1) {
      this.setState({ currentPage: 'Feed' });
    }
  }

  render() {
    return (
      <div className="App">
        <div className={this.state.currentPage !== 'Home' ? 'nav' : 'none'}>
          <div>
            <div onClick={() => this.setState({ currentPage: 'Feed' })} />
            <div onClick={this.movePage} />
          </div>
        </div>
        {this.state.currentPage === 'Home' ? <Home App={this} />
          : this.state.currentPage === 'Feed' ? <Feed App={this} />
            : this.state.currentPage === 'MyPage' ? <MyPage App={this} />
              : <Home />
        }
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  goToMypage: loggedId => dispatch(actions.goToMypage(loggedId)),
});


export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
