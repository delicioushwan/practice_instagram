import React from 'react';
import { hot } from 'react-hot-loader';
import '../style/signup.css';

export default hot(module)(class extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }


  submit = async () => {
    const { fetch, close } = this.props;
    const result = await fetch('http://localhost:4000/home/signup', 'post', {}, this.form);
    try {
      if (result.data === 'ok') {
        return close();
      }
      if (result.data === 'not_unique_id') {
        return this.setState({ warn: '중복된 아이디 입니다. 다른아이디를 이용해 주세요.' });
      }
      if (result.status !== 200) {
        return this.setState({ warn: '서버에 오류가 발생하였습니다.' });
      }
    } catch (e) {
      this.setState({ warn: '서버에 오류가 발생하였습니다.' });
    }
  };

  render() {
    const { inputFn, state } = this.props.home;
    const { signupIdInput, signUpPasswordInput, checkPasswordInput, signUpEmailInput, signUpNameInput } = this.props.home.state;
    const submitActive = () => state.signUpUserId === '' && state.signUpPassword === '' && state.signUpCheckPassword === '' && state.signUpEmail === '' && state.signUpName === '';
    const onSubmit = (e) => {
      e.preventDefault();
      return submitActive() && this.submit();
    };


    return (
      <div className="sign_up">
        <h2>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </h2>
        <form ref={(node) => { this.form = node; }} method="post">
          <div>
            <input type="text" name="signUpUserId" onChange={e => inputFn(e, 'signupIdInput')} value={signupIdInput} placeholder=" 사용자 아이디" />
          </div>
          <span className={state.signUpUserId ? 'error' : 'noshow'}>{state.signUpUserId}</span>

          <div>
            <input type="password" name="signUpPassword" onChange={e => inputFn(e, 'signUpPasswordInput')} value={signUpPasswordInput} placeholder=" 비밀번호" />
          </div>
          <span className={state.signUpPassword ? 'error' : 'noshow'}>{state.signUpPassword}</span>

          <div>
            <input type="password" name="signUpCheckPassword" onChange={e => inputFn(e, 'checkPasswordInput')} value={checkPasswordInput} placeholder=" 비밀번호 확인" />
          </div>
          <span className={state.signUpCheckPassword ? 'error' : 'noshow'}>{state.signUpCheckPassword}</span>

          <div>
            <input type="text" name="signUpEmail" onChange={e => inputFn(e, 'signUpEmailInput')} value={signUpEmailInput} placeholder="  이메일 주소" />
          </div>
          <span className={state.signUpEmail ? 'error' : 'noshow'}>{state.signUpEmail}</span>

          <div>
            <input type="text" name="signUpName" onChange={e => inputFn(e, 'signUpNameInput')} value={signUpNameInput} placeholder=" 사용자 이름" />
          </div>
          <span className={state.signUpName ? 'error' : 'noshow'}>{state.signUpName}</span>

          <div>
            <button type="submit" onClick={onSubmit} className={submitActive() ? 'active' : ''}>
              가입
            </button>
          </div>
        </form>
        <div className={this.state.warn ? 'warn' : 'noshow'}>
          {this.state.warn}
        </div>
        <div>
          가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
        </div>
      </div>
    );
  }
});
