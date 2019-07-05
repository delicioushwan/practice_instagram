
module.exports = ({ email, pass }) => ({
  from: 'tmdghks752@naver.com',
  to: email,
  subject: '비밀번호찾기',
  html:
`
<div>새로운 비밀번호!!${pass}<br/> 로그인 후 새로운 비밀번호로 변경하세요.</div>
`,
});
