# Instagram Clone

Instagram Clone(2019.06.21 ~ 07.21) FullStack SPA Service
 
 React Node.js Express.js MySQL Sequelize.js Webpack Babel JWT NodeMail 등을 이용하여 인스타그램 웹을 구현
 
 Client hosted using AWS S3 Bucket 
 Server hosted on AWS EC2, Elastic Beanstalk
 
 데모 URL: http://cloning-instagram-app.s3.ap-northeast-2.amazonaws.com/index.html (id: test, pass: test)
 
 # 회원가입
 <img src="./Demo/회원가입!.gif" />
 회원가입 버튼을 누르면 모달창으로 회원가입양식이 나온다. 한국어입력 불가 2글자이상 그리고 이메일 형식에 맞추어야 가입가능하다. 이메일은 후에 비밀번호 찾기에 필요하기 때문에 올바른 이메일을 입력해야 한다.
 
 # 로그인
<img src="./Demo/로그인 및 프로필수정.gif" />
알맞은 아이디와 비밀번호로 로그인을 시도한다. 확인이 되면 Feed페이지로 이동이되고 네비게이션 우측을 클릭하면 마이페이지로 이동을 하여 정보를 수정 할 수 있다.

# 새로운 포스트만들기 및 반응형 모달
<img src="./Demo/새로운 포스트만들기 및 반응형모달.gif" />
마이페이지의 게시물쓰기를 클릭하면 모달창이 나오고 사진과 포스트의 내용을 입력 할수 있다. 사진은 최대 4장까지 가능하다. 마이페이지에 포스트가 생기고 창크기에 따라 크기가 변화한다. 
* 프로필의 게시글등이 있는 곳은 인스타그램을 따라서 두가지 컴포넌트를 만들어서 크기에 따라 나오는것으로 하려고 했으나 작았을때의 컴포넌트는 아직 완성을 하지못하여 조만간 추가 할 예정.
포스트를 클릭하면 모달창이 나오고 댓글과 좋아요 기능이 있다.

# Carousel Pictures
<img src="./Demo/캐러셀!.gif" />
Feed의 포스트와 모달창에 보이는 그림은 화살표를 클릭해서 여러장을 넘겨서 볼수 있다.

# Feed
<img src="./Demo/feed반응형!.gif" />
Feed는 창의 크기에 맞추어 크기를 조절한다
좋아요 댓글달기가 가능하다.

# Feed에서 다른사람 페이지로 이동 및 팔로우
<img src="./Demo/feed기능 다른사람페이지이동 및 기능 팔로우!.gif" />
feed에서 포스트의 이름을 누르면 다른유저의 페이지로 이동가능
마이페이지에서와 같이 포스트를 클릭하면 모달창이 뜨고 댓글 좋아요등의 기능을 제공
다른 유저의 페이지에서는 프로필 수정과 게시물작성이 아닌 팔로우버튼이 존재
팔로우 관련 기능은 추후에 추가할 
