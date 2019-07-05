import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { regex } from '../inputtest';
import SignIn from '../component/SignIn';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  inputHandler = (e, input) => {
    this.setState({ [input]: e.target.value });
  };

  vaildationCheck = (e) => {
    const input = e.target.value;
    const target = e.target.name;
    switch (target) {
      case 'signUpUserId':
        if (!regex.name.test(input)) return this.setState({ signUpUserId: '아이디는 2자이상 15자이하여야 합니다.' });
        if (!regex.no_korean.test(input)) return this.setState({ signUpUserId: '아이디에는 한글을 포함할 수 없습니다.' });
        return this.setState({ signUpUserId: '' });
      case 'signUpPassword':
        if (!regex.name.test(input)) return this.setState({ signUpPassword: '비밀번호는 2자이상 15자이하여야 합니다.' });
        return this.setState({ signUpPassword: '' });
      case 'signUpCheckPassword':
        if (this.state.signUpPasswordInput !== input) return this.setState({ signUpCheckPassword: '동일한 비밀번호를 입력해야 합니다.' });
        return this.setState({ signUpCheckPassword: '' });
      case 'signUpEmail':
        if (!regex.email.test(input)) return this.setState({ signUpEmail: '올바른형식의 이메일을 입력해야 합니다.' });
        return this.setState({ signUpEmail: '' });
      case 'signUpName':
        if (!input) return this.setState({ signUpName: '이용자 이름을 입력해야 합니다.' });
        return this.setState({ signUpName: '' });
      case 'signInUserId':
      case 'signInPassword':
        if (!input) return this.setState({ signIn: '아이디와 비밀번호를 입력해야 합니다.' });
        return this.setState({ signIn: '' });
      case 'findPasswordId':
        if (!input) return this.setState({ findPasswordId: '아이디를 반드시 입력해야 합니다.' });
        return this.setState({ findPasswordId: '' });
      case 'findPasswordEmail':
        if (!input) return this.setState({ findPasswordEmail: '이메일을 반드시 입력해야 합니다.' });
        return this.setState({ findPasswordEmail: '' });
      default:
        return this.setState({ [target]: '서버에서 오류가 발생하였습니다.' });
    }
  };


  inputFn = (e, input) => {
    this.inputHandler(e, input);
    this.vaildationCheck(e);
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <SignIn home={this} App={this.props.App} />
      </div>
    );
  }
}

export default hot(module)(Home);
