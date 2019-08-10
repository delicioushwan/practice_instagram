import React, { Component } from 'react';
import '../style/signin.css';
import { hot } from 'react-hot-loader';
import Axios from 'axios';
import Modal from './Modal';
import SignUp from './SignUp';
import FindPassword from './FindPassword';

class Signin extends Component {
  state = {};

  updateApp = state => this.props.App.setState(state)

  update = state => this.props.home.setState(state)

  modal = (open) => {
    this.setState({ show: open });
    this.update({ signupIdInput: '', signupPasswordInput: '', checkpasswordInput: '', signupEmailInput: '', signupNameInput: '' });
  };

  fetch = async (url, method, body, form) => {
    if (form) Array.from(form.getElementsByTagName('INPUT')).forEach((input) => { body[input.name] = input.value; });
    return Axios.request({
      method,
      url,
      data: body,
      withCredentials: true,
    })
      .then(res => res)
      .catch(err => err.response);
  };

  submit = () => {
    this.fetch('http://cloninginstagram-env.qxdnpfc8ws.us-east-2.elasticbeanstalk.com/home/signin', 'post', {}, this.form)
      .then((result) => {
        if (result.data.data === 'ok') {
          return this.updateApp({ currentPage: 'Feed', user: result.data.user });
        }
        if (result.data === 'invalid') {
          this.update({ signIn: '아이디와 비밀번호를 확인하시고 다시 로그인 하세요.' });
        } else {
          this.update({ signIn: '서버에 오류가 발생하였습니다.' });
        }
      });
  };

  render() {
    const { inputFn, state } = this.props.home;
    const { signInUserIdInput, signInPasswordIdInput } = this.props.home.state;
    const submitActive = () => signInUserIdInput && signInPasswordIdInput && state.signIn === '';
    const onSubmit = (e) => {
      e.preventDefault();
      return submitActive() && this.submit();
    };

    return (
      <div className="sign_in">
        <div>
          <div>
            <div>
              <div>instagram</div>
              <form ref={(node) => { this.form = node; }}>
                <div>
                  <input name="signInUserId" type="text" placeholder="  사용자 아이디" onChange={e => inputFn(e, 'signInUserIdInput')} value={signInUserIdInput} />
                </div>
                <div>
                  <input name="signInPassword" type="password" placeholder="  비밀번호" onChange={e => inputFn(e, 'signInPasswordIdInput')} value={signInPasswordIdInput} />
                </div>
              </form>
              <div>
                <button type="button" onClick={onSubmit} className={submitActive() ? 'active' : ''}>
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
              <div className={state.signIn ? 'warn' : 'noshow'}>
                {state.signIn}
              </div>
              <div onClick={() => this.modal('findPassword')}>비밀번호를 잊으셨나요?</div>
            </div>
          </div>
          <div>
            <div>
              <p>
                계정이 없으신가요?
                <span onClick={() => this.modal('signUp')}> 가입하기</span>
              </p>
            </div>
          </div>
        </div>
        <Modal show={this.state.show} close={() => this.modal(false)}>
          {this.state.show === 'signUp' ? <SignUp home={this.props.home} fetch={this.fetch} close={() => this.modal(false)} />
            : this.state.show === 'findPassword' ? <FindPassword home={this.props.home} fetch={this.fetch} close={() => this.modal(false)} />
              : false}
        </Modal>
      </div>
    );
  }
}

export default hot(module)(Signin);
