import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Home from './pages/home';
import Feed from './pages/feed';
import MyPage from './pages/mypage';
import './style/style.css';

class App extends Component {
  state={
    user: '',
    currentPage: 'Home',
  }

  componentDidMount = () => {
    if (document.cookie.indexOf('user=') !== -1) {
      this.setState({ currentPage: 'MyPage' });
    }
  }

  render() {
    return (
      <div className="App">
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
