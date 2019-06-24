import React, { Component } from 'react';
import '../style/style_home.css';
import { hot } from 'react-hot-loader';
import Modal from '../component/modal';
import SignUp from '../component/signup';

class Home extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const inputHandler = (e, input) => {
      this.setState({ [input]: e.target.value });
    };

    const modal = (open) => {
      this.setState({ show: open });
    };

    return (
      <div className="home">
        <div>
          <div>
            <div>
              <div>instagram</div>
              <form>
                <div>
                  <input id="user_id" type="text" maxLength="25" placeholder="  사용자 아이디" onChange={(e) => { inputHandler(e, 'userId'); }} />
                </div>
                <div>
                  <input name="password" type="password" placeholder="  비밀번호" onChange={(e) => { inputHandler(e, 'password'); }} />
                </div>
              </form>
              <div>
                <button type="button" className={this.state.userId ? 'active' : ''}>
                  로그인
                </button>
              </div>
              <div>
                <div />
                <div>또는</div>
                <div />
              </div>
              <div>
                <a href="http://www.facebook.com">
                Facebook으로 로그인
                </a>
              </div>
              <div>비밀번호를 잊으셨나요?</div>
            </div>
          </div>
          <div>
            <div>
              <p>
                계정이 없으신가요?
                <span onClick={() => modal(true)}> 가입하기</span>
              </p>
            </div>
          </div>
        </div>
        <Modal home={this.state} close={() => modal(false)}>
          <SignUp close={() => modal(false)} />
        </Modal>
      </div>
    );
  }
}

export default hot(module)(Home);
