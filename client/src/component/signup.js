import React from 'react';
import Axios from 'axios';
import { hot } from 'react-hot-loader';
import '../style/signin.css';

export default hot(module)(class extends React.Component {
  constructor() {
    super();
    this.state = {
      idInput: '',
      passwordInput: '',
      checkpassword: '',
      emailInput: '',
      nameInput: '',
    };
  }

  render() {
    const {
      idInput, passwordInput, checkpassword, emailInput, nameInput,
    } = this.state;

    const inputHandler = (e, input) => {
      this.setState({ [input]: e.target.value });
    };

    const submit = (e) => {
      e.preventDefault();
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
      this.setState({
        idInput: '',
        passwordInput: '',
        checkpassword: '',
        emailInput: '',
        nameInput: '',
      });
    };

    return (
      <div className="sign_in">
        <h2>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </h2>
        <form ref={(node) => { this.form = node; }}>
          <div>
            <input
              type="text"
              name="userId"
              onChange={e => inputHandler(e, 'idInput')}
              value={idInput}
              placeholder=" 사용자 아이디"
            />
          </div>
          <div>
            <input type="password" name="password" onChange={e => inputHandler(e, 'passwordInput')} value={passwordInput} placeholder=" 비밀번호" />
          </div>
          <div>
            <input type="password" onChange={e => inputHandler(e, 'checkpassword')} value={checkpassword} placeholder=" 비밀번호 확인" />
          </div>
          <div>
            <input type="text" name="email" onChange={e => inputHandler(e, 'emailInput')} value={emailInput} placeholder="  이메일 주소" />
          </div>
          <div>
            <input type="text" name="userName" onChange={e => inputHandler(e, 'nameInput')} value={nameInput} placeholder=" 사용자 이름" />
          </div>
          <div>
            <button type="submit" onClick={submit} className={idInput && passwordInput && checkpassword && emailInput && nameInput ? 'active' : ''}>
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
