import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Home from './pages/home';
import Feed from './pages/feed';
import MyPage from './pages/mypage';
import './style/style.css';

class App extends Component {
  state={
    currentPage: 'Home',
  }

  movePage = target => this.setState({ currentPage: target })

  componentDidMount = () => {
    if (document.cookie.indexOf('user=') !== -1) {
      this.setState({ currentPage: 'MyPage' });
    }
  }

  render() {
    return (
      <div className="App">
        <div className={this.state.currentPage !== 'Home' ? 'nav' : 'none'}>
          <div>
            <div onClick={() => this.movePage('Feed')} />
            <div onClick={() => this.movePage('MyPage')} />
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

export default hot(module)(App);
