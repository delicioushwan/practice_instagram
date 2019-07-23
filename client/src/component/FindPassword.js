import React from 'react';
import { hot } from 'react-hot-loader';
import '../style/findpassword.css';


export default hot(module)(class extends React.Component {
  update = state => this.props.home.setState(state);

  submit = async () => {
    const { fetch, close } = this.props;
    const result = await fetch('http://localhost:4000/home/findpassword', 'post', {}, this.form);

    try {
      if (result.data === 'invalid') {
        this.update({ findPasswordEmail: '아이디와 이메일주소를 확인해 주세요' });
      }
      if (result.data === 'ok') {
        return close();
      }
    } catch (err) {
      this.update({ findPasswordEmail: '서버에 오류가 발생하였습니다.' });
    }
  }

  render = () => {
    const { inputFn, state } = this.props.home;
    const { findPassworIdInput, findPassworEmailInput } = this.props.home.state;
    const submitActive = () => findPassworIdInput && findPassworEmailInput && state.findPasswordId === '' && state.findPasswordEmail === '';
    const onSubmit = (e) => {
      e.preventDefault();
      return submitActive() && this.submit();
    };

    return (
      <div className="find_password">
        <form ref={(node) => { this.form = node; }} method="post">
          <h2>
            비밀번호 찾기
            <br />
          </h2>
          <div>
            <input type="text" placeholder=" 사용자 아이디" name="findPasswordId" onChange={e => inputFn(e, 'findPassworIdInput')} value={findPassworIdInput} />
          </div>
          <span className={state.findPasswordId ? 'error' : 'noshow'}>{state.findPasswordId}</span>

          <div>
            <input type="text" placeholder="가입시 이메일 주소" name="findPasswordEmail" onChange={e => inputFn(e, 'findPassworEmailInput')} value={findPassworEmailInput} />
          </div>
          <span className={state.findPasswordEmail ? 'error' : 'noshow'}>{state.findPasswordEmail}</span>
          <div>
            <button type="submit" onClick={onSubmit} className={submitActive() ? 'active' : ''}>
              메일 보내기
            </button>
          </div>
        </form>
        <div>
          가입시 입력하신 이메일 주소를 정확히 입력해 주시기 바랍니다.
          <br />
          <br />
          메일이 발송되는데 2~3분정도 소요됩니다.
          <br />
          <br />
          메일로 발송되는 임시비밀번호를 이용하여 로그인후 비밀번호를 변경해 주세요.
        </div>
      </div>
    );
  }
});
