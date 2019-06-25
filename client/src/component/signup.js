import React from 'react';
import Axios from 'axios';
import { hot } from 'react-hot-loader';
import { regex } from '../inputtest';
import '../style/signup.css';

export default hot(module)(class extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const {
      idInput, passwordInput, checkpassword, emailInput, nameInput,
    } = this.props.home.state;
    const {
      userId, password, checkPw, email, userName,
    } = this.state;

    const updateHome = state => this.props.home.setState(state);

    const inputHandler = (e, input) => {
      updateHome({ [input]: e.target.value });
    };

    const submit = (e) => {
      e.preventDefault();
      console.log('runnnnnn');
      const body = {};
      Array.from(this.form.getElementsByTagName('INPUT')).forEach((input) => { body[input.name] = input.value; });
      Axios.request({
        method: 'POST',
        url: 'http://localhost:4000/api/signup',
        data: body,
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.props.close();
    };
    const vaildationCheck = (e) => {
      const input = e.target.value;
      const target = e.target.name;
      switch (target) {
        case 'userId':
          if (!regex.name.test(input)) return this.setState({ userId: '아이디는 2자이상 15자이하여야 합니다.' });
          if (!regex.no_korean.test(input)) return this.setState({ userId: '아이디에는 한글을 포함할 수 없습니다.' });
          return this.setState({ userId: '' });
        case 'password':
          if (!regex.name.test(input)) return this.setState({ password: '비밀번호는 2자이상 15자이하여야 합니다.' });
          return this.setState({ password: '' });
        case 'checkPw':
          if (passwordInput !== input) return this.setState({ checkPw: '동일한 비밀번호를 입력해야 합니다.' });
          return this.setState({ checkPw: '' });
        case 'email':
          if (!regex.email.test(input)) return this.setState({ email: '올바른형식의 이메일을 입력해야 합니다.' });
          return this.setState({ email: '' });
        case 'userName':
          if (!input) return this.setState({ userName: '이용자 이름을 입력해야 합니다.' });
          return this.setState({ userName: '' });
        default:
          console.log(target);
      }
    };

    const submitActive = (e) => {
      if (e) { e.preventDefault(); }
      return userId === '' && password === '' && checkPw === '' && email === '' && userName === '';
    };

    const inputFn = (e, input) => {
      inputHandler(e, input);
      vaildationCheck(e);
    };

    return (
      <div className="sign_up">
        <h2>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </h2>
        <form ref={(node) => { this.form = node; }} method="post">
          <div>
            <input type="text" name="userId" onChange={e => inputFn(e, 'idInput')} value={idInput} placeholder=" 사용자 아이디" />
          </div>
          <span className={this.state.userId ? 'error' : 'noshow'}>{this.state.userId}</span>

          <div>
            <input type="password" name="password" onChange={e => inputFn(e, 'passwordInput')} value={passwordInput} placeholder=" 비밀번호" />
          </div>
          <span className={this.state.password ? 'error' : 'noshow'}>{this.state.password}</span>

          <div>
            <input type="password" name="checkPw" onChange={e => inputFn(e, 'checkpassword')} value={checkpassword} placeholder=" 비밀번호 확인" />
          </div>
          <span className={this.state.checkPw ? 'error' : 'noshow'}>{this.state.checkPw}</span>

          <div>
            <input type="text" name="email" onChange={e => inputFn(e, 'emailInput')} value={emailInput} placeholder="  이메일 주소" />
          </div>
          <span className={this.state.email ? 'error' : 'noshow'}>{this.state.email}</span>

          <div>
            <input type="text" name="userName" onChange={e => inputFn(e, 'nameInput')} value={nameInput} placeholder=" 사용자 이름" />
          </div>
          <span className={this.state.userName ? 'error' : 'noshow'}>{this.state.userName}</span>

          <div>
            <button type="submit" onClick={e => submitActive(e) && submit(e)} className={submitActive() ? 'active' : ''}>
              가입
            </button>
          </div>
        </form>
        <div>
          가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
        </div>
      </div>
    );
  }
});
